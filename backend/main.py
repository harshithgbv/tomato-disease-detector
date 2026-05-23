from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
import numpy as np
import onnxruntime as ort
import io, json, os, requests
from supabase import create_client
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://tomato-disease-detector-kappa.vercel.app"
    ],
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Supabase ──
supabase = create_client(os.getenv("SUPABASE_URL"), os.getenv("SUPABASE_KEY"))

# ── Hugging Face URLs ──
HF_BASE = "https://huggingface.co/harshithgbv/tomatoguard/resolve/main"
FILES = {
    "tomatoguard.onnx"      : f"{HF_BASE}/tomatoguard.onnx",
    "tomato_validator.onnx" : f"{HF_BASE}/tomato_validator.onnx",
    "class_names.json"      : f"{HF_BASE}/class_names.json",
}

def download_if_missing(filename, url):
    if not os.path.exists(filename) or os.path.getsize(filename) < 1000:
        print(f"Downloading {filename}...")
        r = requests.get(url, stream=True)
        r.raise_for_status()
        with open(filename, "wb") as f:
            for chunk in r.iter_content(chunk_size=8192):
                f.write(chunk)
        print(f"✅ {filename} ({os.path.getsize(filename)/1024/1024:.1f} MB)")
    else:
        print(f"✅ {filename} already exists ({os.path.getsize(filename)/1024/1024:.1f} MB)")

print("=" * 50)
print("Loading TomatoGuard ONNX models...")
print("=" * 50)

for filename, url in FILES.items():
    download_if_missing(filename, url)

disease_session   = ort.InferenceSession("tomatoguard.onnx")
validator_session = ort.InferenceSession("tomato_validator.onnx")

with open("class_names.json") as f:
    class_names = json.load(f)

print(f"✅ ONNX models loaded! {len(class_names)} disease classes ready.")

# ── Config ──
IMG_SIZE             = 224
TOMATO_THRESHOLD = 0.35
CONFIDENCE_THRESHOLD = 0.50

def preprocess(image_bytes):
    img = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    img = img.resize((IMG_SIZE, IMG_SIZE))
    arr = np.array(img, dtype=np.float32) / 255.0
    return np.expand_dims(arr, axis=0)

def confidence_label(score: float) -> str:
    if score >= 0.85: return "High"
    if score >= 0.60: return "Medium"
    return "Low"

def run_model(session, arr):
    input_name = session.get_inputs()[0].name
    return session.run(None, {input_name: arr})[0]

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    contents = await file.read()
    arr      = preprocess(contents)

    # ── Layer 1: Tomato leaf validation ──
    tomato_score = float(run_model(validator_session, arr)[0][0])

    if tomato_score < TOMATO_THRESHOLD:
        return {
            "status"      : "rejected",
            "disease"     : None,
            "confidence"  : None,
            "treatment"   : None,
            "message"     : "❌ Not a tomato leaf! Please upload a clear tomato leaf image.",
            "tomato_score": round(tomato_score * 100, 1)
        }

    # ── Layer 2: Disease classification ──
    preds        = run_model(disease_session, arr)[0]
    top_idx      = int(np.argmax(preds))
    top_conf     = float(preds[top_idx])
    disease_name = class_names[str(top_idx)]

    clean_name = disease_name.replace("Tomato_", "").replace("Tomato__", "").replace("_", " ").strip()

    if top_conf < CONFIDENCE_THRESHOLD:
        return {
            "status"      : "uncertain",
            "disease"     : clean_name,
            "confidence"  : confidence_label(top_conf),
            "treatment"   : None,
            "message"     : "⚠️ Image unclear. Please retake with better lighting.",
            "tomato_score": round(tomato_score * 100, 1)
        }

    top3_idx = np.argsort(preds)[-3:][::-1]
    top3 = [
        {
            "disease"   : class_names[str(i)].replace("Tomato_", "").replace("Tomato__", "").replace("_", " "),
            "confidence": round(float(preds[i]) * 100, 1)
        }
        for i in top3_idx
    ]

    treatment = get_treatment(clean_name)

    try:
        supabase.table("detections").insert({
            "disease"   : clean_name,
            "confidence": confidence_label(top_conf),
            "treatment" : treatment
        }).execute()
    except Exception as e:
        print("Supabase error:", e)

    return {
        "status"          : "success",
        "disease"         : clean_name,
        "confidence"      : confidence_label(top_conf),
        "confidence_score": round(top_conf * 100, 1),
        "treatment"       : treatment,
        "top3"            : top3,
        "tomato_score"    : round(tomato_score * 100, 1),
        "message"         : "✅ Analysis complete"
    }

@app.get("/history")
async def history():
    try:
        res = supabase.table("detections").select("*").order("detected_at", desc=True).limit(10).execute()
        return res.data
    except:
        return []

@app.post("/sensor-data")
async def receive_sensor_data(data: dict):
    try:
        supabase.table("sensor_data").insert(data).execute()
        return {"status": "ok"}
    except Exception as e:
        return {"status": "error", "message": str(e)}

@app.get("/sensor-latest")
async def sensor_latest():
    try:
        res = supabase.table("sensor_data").select("*").order("created_at", desc=True).limit(1).execute()
        return res.data[0] if res.data else {}
    except:
        return {}

def get_treatment(disease: str) -> str:
    treatments = {
        "Bacterial Spot"        : "Use Copper-based bactericide. Avoid working when wet.",
        "Early Blight"          : "Apply Mancozeb or Neem oil spray. Remove infected leaves.",
        "Late Blight"           : "Use Metalaxyl + Mancozeb. Avoid overhead irrigation.",
        "Leaf Mold"             : "Improve ventilation. Apply Chlorothalonil fungicide.",
        "Septoria Leaf Spot"    : "Apply Chlorothalonil. Remove lower infected leaves.",
        "Spider Mites"          : "Apply Abamectin or neem oil. Increase humidity.",
        "Target Spot"           : "Apply Azoxystrobin fungicide. Practice crop rotation.",
        "Yellow Leaf Curl Virus": "Remove infected plants. Control whitefly population.",
        "Mosaic Virus"          : "Remove infected plants. Control aphid population.",
        "Healthy"               : "Plant is healthy! Maintain regular watering and nutrition.",
    }
    for key in treatments:
        if key.lower() in disease.lower():
            return treatments[key]
    return "Consult a local agricultural expert for treatment advice."
