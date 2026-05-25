from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import httpx
import base64
import json
import re
from PIL import Image
import io
from supabase import create_client
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

# =========================
# CORS
# =========================
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://tomato-disease-detector-kappa.vercel.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# =========================
# ENV VARIABLES
# =========================
OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

# =========================
# ROOT
# =========================
@app.get("/")
async def root():
    return {"message": "Tomato Disease Detector API Running"}

# =========================
# PREDICT DISEASE
# =========================
@app.post("/predict")
async def predict(file: UploadFile = File(...)):

    contents = await file.read()

    image = Image.open(io.BytesIO(contents)).convert("RGB")

    buffer = io.BytesIO()
    image.save(buffer, format="JPEG")

    img_base64 = base64.b64encode(buffer.getvalue()).decode()

    prompt = """
You are an expert plant pathologist specializing in tomato diseases.

Analyze this tomato leaf image carefully.

Respond ONLY in this exact JSON format with no extra text:

{
    "status": "success",
    "disease": "disease name or Healthy",
    "confidence": "High / Medium / Low",
    "confidence_score": 95,
    "treatment": "brief treatment advice in one sentence",
    "tomato_score": 90
}

Rules:
- disease must be one of:
  Early Blight,
  Late Blight,
  Septoria Leaf Spot,
  Bacterial Spot,
  Leaf Mold,
  Spider Mites,
  Target Spot,
  Yellow Leaf Curl Virus,
  Mosaic Virus,
  Healthy

- confidence_score is a number 0-100
- tomato_score is how sure you are this is a tomato leaf (0-100)

- If not a tomato leaf:
  set status to "rejected"
  and tomato_score below 50
"""

    async with httpx.AsyncClient() as client:

        response = await client.post(
            "https://openrouter.ai/api/v1/chat/completions",

            headers={
                "Authorization": f"Bearer {OPENROUTER_API_KEY}",
                "Content-Type": "application/json"
            },

            json={
                "model": "openrouter/auto",

                "messages": [
                    {
                        "role": "user",

                        "content": [
                            {
                                "type": "text",
                                "text": prompt
                            },

                            {
                                "type": "image_url",

                                "image_url": {
                                    "url": f"data:image/jpeg;base64,{img_base64}"
                                }
                            }
                        ]
                    }
                ]
            },

            timeout=30.0
        )

    result = response.json()

    print("OpenRouter response:", result)

    if "choices" not in result:

        error_msg = result.get(
            "error",
            {}
        ).get(
            "message",
            "Unknown error"
        )

        return {
            "status": "error",
            "disease": "API Error",
            "confidence": "Low",
            "treatment": error_msg
        }

    text = result["choices"][0]["message"]["content"].strip()

    match = re.search(r"\{.*\}", text, re.DOTALL)

    if match:

        data = json.loads(match.group())

        try:

            supabase.table("detections").insert({
                "disease": data.get("disease"),
                "confidence": data.get("confidence"),
                "treatment": data.get("treatment")
            }).execute()

        except Exception as e:
            print("Supabase error:", e)

        return data

    else:

        return {
            "status": "error",
            "disease": "Unknown",
            "confidence": "Low",
            "treatment": "Could not analyze image."
        }

# =========================
# HISTORY
# =========================
@app.get("/history")
async def history():

    try:

        response = (
            supabase
            .table("detections")
            .select("*")
            .order("detected_at", desc=True)
            .limit(10)
            .execute()
        )

        return response.data

    except Exception as e:

        print("History error:", e)

        return []

# =========================
# RECEIVE SENSOR DATA
# =========================
@app.post("/sensor-data")
async def receive_sensor_data(data: dict):

    try:

        sensor_row = {
            "temperature": data.get("temperature"),
            "humidity": data.get("humidity"),
            "soil": data.get("soil") or data.get("soil_moisture")
        }

        print("Saving sensor data:", sensor_row)

        supabase.table("sensor_data").insert(sensor_row).execute()

        return {
            "status": "ok",
            "saved": sensor_row
        }

    except Exception as e:

        print("Insert error:", e)

        return {
            "status": "error",
            "message": str(e)
        }

# =========================
# GET LATEST SENSOR DATA
# =========================
@app.get("/sensor-latest")
async def sensor_latest():

    try:

        res = (
            supabase
            .table("sensor_data")
            .select("*")
            .order("id", desc=True)
            .limit(1)
            .execute()
        )

        print("Latest sensor data:", res.data)

        return res.data[0] if res.data else {}

    except Exception as e:

        print("Fetch error:", e)

        return {}
