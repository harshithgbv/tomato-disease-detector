# 🍅 Tomato Disease Detector

An AI-powered web application that detects tomato crop diseases from leaf images and provides treatment recommendations to farmers.

## 🌟 Features

- 🔍 AI-based tomato leaf disease detection using image analysis
- 💊 Treatment recommendations for each detected disease
- 🌿 Organic, Chemical and Preventive product suggestions with color labels
- 🗺️ Nearby agricultural shop finder via Google Maps
- 📋 Detection history stored in Supabase database
- 🌐 Multi-language support — English, Hindi, Kannada

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React + Vite + Tailwind CSS |
| Backend | Python + FastAPI |
| AI Model | OpenRouter API (Vision Model) |
| Database | Supabase (PostgreSQL) |
| Version Control | GitHub |

## 📁 Project Structure
## 🚀 Getting Started

### Backend Setup
```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install fastapi uvicorn python-multipart httpx pillow supabase
uvicorn main:app --reload
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## 🔌 API Endpoints

| Endpoint | Method | Description |
|---|---|---|
| /predict | POST | Detect disease from uploaded leaf image |
| /history | GET | Fetch past detection history from database |

## 🌿 Supported Diseases

- Early Blight
- Late Blight
- Septoria Leaf Spot
- Bacterial Spot
- Leaf Mold
- Healthy Plant

## 🗄️ Database

Uses **Supabase** (PostgreSQL) to store every detection with:
- Disease name
- Confidence level
- Treatment advice
- Timestamp

## 🌐 Multi-language Support

The app supports three languages:
- English
- Hindi (हिंदी)
- Kannada (ಕನ್ನಡ)

## 👨‍💻 Developer

Built by **Harshith** as part of an AI-driven agricultural solutions project at VVCE.