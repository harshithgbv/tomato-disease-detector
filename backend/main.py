from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
import numpy as np
import tensorflow as tf
import io, json, os, gdown
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

# ── Google Drive File IDs ──
DISEASE_MODEL_ID   = "1wNWvykCN3SiUzDYIuI_ACP8kr14XnyWi"
VALIDATOR_MODEL_ID = "1okK1KGzjRyRpVtAOKFd5u7UO1EO9u4RD"
CLASS_NAMES_ID     = "1oDAVReSivkkaRhH3tbJq_8lAqdRFDo4Q"

# ── Download models from Google Drive at startup ──
def download_if_missing(file_id, filename):
    if not os.path.exists(filename):
        print(f"Downloading {filename} from Google Drive...")
        url = f"https://drive.google.com/uc?id={file_id}"
        gdown.download(url, filename, quiet=False)
        print(f"✅ {filename} downloaded!")
    else:
        print(f"✅ {filename} already exists, skipping download.")

print("=" * 50)
print("Loading TomatoGuard AI models...")
print("=" * 50)

download_if_missing(DISEASE_MODEL_ID,   "tomatoguard_FINAL.keras")
download_if_missing(VALIDATOR_MODEL_ID, "tomato_validator.keras")
download_if_missing(CLASS_NAMES_ID,     "class_names.json")

disease_model   = tf.keras.models.load_model("tomatoguard_FINAL.keras")
validator_model = tf.keras.models.load_model("tomato_validator.keras")

with open("class_names.json") as f:
    class_names = json.load(f)

print(f"✅ Models loaded! {len(class_names)} disease classes ready.")

# ── Config ──
IMG_SIZE             = 224
TOMATO_THRESHOLD     = 0.70   # 70% sure it's a tomato leaf
CONFIDENCE_THRESHOLD = 0.50   # 50% sure about disease

def preprocess(image_bytes):
    img = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    img = img.resize((IMG_SIZE, IMG_SIZE))
    arr = np.array(img) / 255.0
    return np.expand_dims(arr, axis=0)

def confidence_label(score: float) -> str:
    if score >= 0.85: return "High"
    if score >= 0.60: return "Medium"
    return "Low"

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    contents = await file.read()
    arr      = preprocess(contents)

    # ── Layer 1: Tomato leaf validation ──
    tomato_score = float(validator_model.predict(arr, verbose=0)[0][0])

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
    preds        = disease_model.predict(arr, verbose=0)[0]
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

    # Top 3 predictions
    top3_idx = np.argsort(preds)[-3:][::-1]
    top3 = [
        {
            "disease"   : class_names[str(i)].replace("Tomato_", "").replace("Tomato__", "").replace("_", " "),
            "confidence": round(float(preds[i]) * 100, 1)
        }
        for i in top3_idx
    ]

    treatment = get_treatment(clean_name)

    # Save to Supabase
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
        "Bacterial Spot"      : "Use Copper-based bactericide. Avoid working when wet.",
        "Early Blight"        : "Apply Mancozeb or Neem oil spray. Remove infected leaves.",
        "Late Blight"         : "Use Metalaxyl + Mancozeb. Avoid overhead irrigation.",
        "Leaf Mold"           : "Improve ventilation. Apply Chlorothalonil fungicide.",
        "Septoria Leaf Spot"  : "Apply Chlorothalonil. Remove lower infected leaves.",
        "Spider Mites"        : "Apply Abamectin or neem oil. Increase humidity.",
        "Target Spot"         : "Apply Azoxystrobin fungicide. Practice crop rotation.",
        "Yellow Leaf Curl Virus": "Remove infected plants. Control whitefly population.",
        "Mosaic Virus"        : "Remove infected plants. Control aphid population.",
        "Healthy"             : "Plant is healthy! Maintain regular watering and nutrition.",
    }
    for key in treatments:
        if key.lower() in disease.lower():
            return treatments[key]
    return "Consult a local agricultural expert for treatment advice."
