from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import httpx
import base64
import json, re
from PIL import Image
import io
from supabase import create_client

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

OPENROUTER_API_KEY = "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"

SUPABASE_URL = "https://rvydxgfsupwgnrxgumds.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ2eWR4Z2ZzdXB3Z25yeGd1bWRzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NzIxNjE4NSwiZXhwIjoyMDkyNzkyMTg1fQ.f8oepf_DcuWiH2VSGobI3_u2m_taa9x3l-w6lW2Oqcg"
supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    contents = await file.read()

    image = Image.open(io.BytesIO(contents)).convert("RGB")
    buffer = io.BytesIO()
    image.save(buffer, format="JPEG")
    img_base64 = base64.b64encode(buffer.getvalue()).decode()

    prompt = """You are a plant disease expert. Analyze this tomato leaf image.
    Respond in this exact JSON format with no extra text:
    {
        "disease": "disease name or Healthy",
        "confidence": "High / Medium / Low",
        "treatment": "brief treatment advice in one sentence"
    }"""

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
                            {"type": "text", "text": prompt},
                            {"type": "image_url", "image_url": {"url": f"data:image/jpeg;base64,{img_base64}"}}
                        ]
                    }
                ]
            },
            timeout=30.0
        )

    result = response.json()
    print("OpenRouter response:", result)

    if "choices" not in result:
        error_msg = result.get("error", {}).get("message", "Unknown error")
        return {"disease": "API Error", "confidence": "Low", "treatment": error_msg}

    text = result["choices"][0]["message"]["content"].strip()
    match = re.search(r'\{.*\}', text, re.DOTALL)

    if match:
        data = json.loads(match.group())
        try:
            supabase.table("detections").insert({
                "disease": data["disease"],
                "confidence": data["confidence"],
                "treatment": data["treatment"]
            }).execute()
        except Exception as e:
            print("Supabase error:", e)
        return data
    else:
        return {"disease": "Unknown", "confidence": "Low", "treatment": "Could not analyze image."}

@app.get("/history")
async def history():
    try:
        response = supabase.table("detections").select("*").order("detected_at", desc=True).limit(10).execute()
        return response.data
    except Exception as e:
        return []
   