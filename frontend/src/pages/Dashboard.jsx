// Dashboard.jsx
// TomatoGuard AI — Upgraded detect page
// Features: Camera capture, full disease cards, multilingual, buy links

import { useState, useRef } from "react"
import axios from "axios"
import { getDiseaseData } from "../diseaseData"

const BACKEND = "https://tomato-disease-detector-ii1n.onrender.com"

const severityConfig = {
  None:     { color: "bg-green-100 text-green-800 border-green-300",  icon: "✅", label: { english: "None", hindi: "कोई नहीं", kannada: "ಯಾವುದೂ ಇಲ್ಲ" } },
  Low:      { color: "bg-blue-100 text-blue-800 border-blue-300",     icon: "🟦", label: { english: "Low", hindi: "कम", kannada: "ಕಡಿಮೆ" } },
  Medium:   { color: "bg-yellow-100 text-yellow-800 border-yellow-300", icon: "⚠️", label: { english: "Medium", hindi: "मध्यम", kannada: "ಮಧ್ಯಮ" } },
  High:     { color: "bg-orange-100 text-orange-800 border-orange-300", icon: "🔴", label: { english: "High", hindi: "अधिक", kannada: "ಅಧಿಕ" } },
  Critical: { color: "bg-red-100 text-red-800 border-red-300",         icon: "🚨", label: { english: "Critical", hindi: "गंभीर", kannada: "ಗಂಭೀರ" } },
}

const productTypeConfig = {
  organic:   { bg: "bg-green-50 border-green-200", badge: "bg-green-200 text-green-800", icon: "🌿" },
  chemical:  { bg: "bg-blue-50 border-blue-200",   badge: "bg-blue-200 text-blue-800",   icon: "🧪" },
  preventive:{ bg: "bg-yellow-50 border-yellow-200", badge: "bg-yellow-200 text-yellow-800", icon: "🛡️" },
}

export default function Dashboard({ language, user }) {
  const [image, setImage]     = useState(null)
  const [preview, setPreview] = useState(null)
  const [result, setResult]   = useState(null)
  const [loading, setLoading] = useState(false)
  const [mode, setMode]       = useState("upload")
  const videoRef  = useRef(null)
  const streamRef = useRef(null)

  const t = {
    subtitle:    { english: "Upload or capture a tomato leaf image", hindi: "टमाटर की पत्ती की तस्वीर अपलोड करें या कैमरे से लें", kannada: "ಟೊಮೇಟೊ ಎಲೆಯ ಚಿತ್ರ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ ಅಥವಾ ಕ್ಯಾಮೆರಾದಿಂದ ತೆಗೆಯಿರಿ" }[language],
    uploadTab:   { english: "📁 Upload", hindi: "📁 अपलोड", kannada: "📁 ಅಪ್‌ಲೋಡ್" }[language],
    cameraTab:   { english: "📷 Camera", hindi: "📷 कैमरा", kannada: "📷 ಕ್ಯಾಮೆರಾ" }[language],
    capture:     { english: "📸 Capture Photo", hindi: "📸 फोटो लें", kannada: "📸 ಫೋಟೋ ತೆಗೆಯಿರಿ" }[language],
    detectBtn:   { english: "Detect Disease", hindi: "रोग पहचानें", kannada: "ರೋಗ ಪತ್ತೆಹಚ್ಚಿ" }[language],
    detecting:   { english: "Analyzing...", hindi: "विश्लेषण हो रहा है...", kannada: "ವಿಶ್ಲೇಷಿಸಲಾಗುತ್ತಿದೆ..." }[language],
    diseaseDetected: { english: "Disease Detected", hindi: "रोग पहचाना गया", kannada: "ರೋಗ ಪತ್ತೆಯಾಗಿದೆ" }[language],
    healthy:     { english: "Healthy Plant", hindi: "स्वस्थ पौधा", kannada: "ಆರೋಗ್ಯಕರ ಸಸ್ಯ" }[language],
    confidence:  { english: "Confidence", hindi: "विश्वसनीयता", kannada: "ವಿಶ್ವಾಸಾರ್ಹತೆ" }[language],
    about:       { english: "About this Disease", hindi: "इस रोग के बारे में", kannada: "ಈ ರೋಗದ ಬಗ್ಗೆ" }[language],
    causes:      { english: "Causes", hindi: "कारण", kannada: "ಕಾರಣಗಳು" }[language],
    symptoms:    { english: "Symptoms", hindi: "लक्षण", kannada: "ಲಕ್ಷಣಗಳು" }[language],
    severity:    { english: "Severity Level", hindi: "गंभीरता का स्तर", kannada: "ತೀವ್ರತೆಯ ಮಟ್ಟ" }[language],
    treatment:   { english: "Treatment Steps", hindi: "उपचार के चरण", kannada: "ಚಿಕಿತ್ಸೆಯ ಹಂತಗಳು" }[language],
    prevention:  { english: "Prevention Tips", hindi: "रोकथाम के उपाय", kannada: "ತಡೆಗಟ್ಟುವ ಸಲಹೆಗಳು" }[language],
    farmerAction:{ english: "Recommended Actions", hindi: "किसान के लिए सुझाव", kannada: "ಶಿಫಾರಸು ಕ್ರಮಗಳು" }[language],
    products:    { english: "Recommended Products", hindi: "अनुशंसित उत्पाद", kannada: "ಶಿಫಾರಸು ಮಾಡಿದ ಉತ್ಪನ್ನಗಳು" }[language],
    organic:     { english: "Organic", hindi: "जैविक", kannada: "ಸಾವಯವ" }[language],
    chemical:    { english: "Chemical", hindi: "रासायनिक", kannada: "ರಾಸಾಯನಿಕ" }[language],
    preventive:  { english: "Preventive", hindi: "निवारक", kannada: "ತಡೆಗಟ್ಟುವ" }[language],
    buyOnline:   { english: "🛒 Buy Online", hindi: "🛒 ऑनलाइन खरीदें", kannada: "🛒 ಆನ್‌ಲೈನ್ ಖರೀದಿಸಿ" }[language],
    notTomato:   { english: "Not a tomato leaf! Please upload a clear tomato leaf image.", hindi: "यह टमाटर की पत्ती नहीं है! कृपया स्पष्ट छवि अपलोड करें।", kannada: "ಇದು ಟೊಮೇಟೊ ಎಲೆ ಅಲ್ಲ! ದಯವಿಟ್ಟು ಸ್ಪಷ್ಟ ಚಿತ್ರ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ." }[language],
    unclear:     { english: "Image unclear. Please retake with better lighting.", hindi: "छवि अस्पष्ट है। बेहतर रोशनी में दोबारा लें।", kannada: "ಚಿತ್ರ ಅಸ್ಪಷ್ಟ. ಉತ್ತಮ ಬೆಳಕಿನಲ್ಲಿ ಮತ್ತೆ ತೆಗೆಯಿರಿ." }[language],
    error:       { english: "Could not connect to server.", hindi: "सर्वर से कनेक्ट नहीं हो सका।", kannada: "ಸರ್ವರ್‌ಗೆ ಸಂಪರ್ಕಿಸಲಾಗಲಿಲ್ಲ." }[language],
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    setImage(file)
    setPreview(URL.createObjectURL(file))
    setResult(null)
  }

  const startCamera = async () => {
    setMode("camera")
    setResult(null)
    setPreview(null)
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
      streamRef.current = stream
      if (videoRef.current) videoRef.current.srcObject = stream
    } catch {
      alert("Camera not accessible")
      setMode("upload")
    }
  }

  const stopCamera = () => {
    streamRef.current?.getTracks().forEach(t => t.stop())
  }

  const capturePhoto = () => {
    const canvas = document.createElement("canvas")
    canvas.width  = videoRef.current.videoWidth
    canvas.height = videoRef.current.videoHeight
    canvas.getContext("2d").drawImage(videoRef.current, 0, 0)
    canvas.toBlob(blob => {
      const file = new File([blob], "capture.jpg", { type: "image/jpeg" })
      setImage(file)
      setPreview(URL.createObjectURL(blob))
      setMode("upload")
      stopCamera()
    }, "image/jpeg")
  }

  const handleDetect = async () => {
    if (!image) return
    setLoading(true)
    const formData = new FormData()
    formData.append("file", image)
    try {
      const res = await axios.post(`${BACKEND}/predict`, formData)
      setResult(res.data)
    } catch {
      setResult({ error: t.error })
    }
    setLoading(false)
  }

  const diseaseInfo = result?.disease ? getDiseaseData(result.disease, language) : null
  const severity    = diseaseInfo?.severity || "None"
  const sevConfig   = severityConfig[severity] || severityConfig["None"]

  const openShop = (search) => {
    window.open(`https://www.amazon.in/s?k=${encodeURIComponent(search)}`, "_blank")
  }

  return (
    <div className="p-4 md:p-6 flex flex-col items-center max-w-2xl mx-auto">
      <p className="text-green-600 mb-6 text-center text-sm md:text-base">{t.subtitle}</p>

      {/* ── Upload Card ── */}
      <div className="bg-white rounded-2xl shadow-lg p-5 w-full mb-6">

        {/* Tab toggle */}
        <div className="flex rounded-xl overflow-hidden border border-gray-200 mb-4">
          <button
            onClick={() => { setMode("upload"); stopCamera() }}
            className={`flex-1 py-2.5 text-sm font-semibold transition ${mode === "upload" ? "bg-green-600 text-white" : "bg-white text-gray-600 hover:bg-gray-50"}`}
          >
            {t.uploadTab}
          </button>
          <button
            onClick={startCamera}
            className={`flex-1 py-2.5 text-sm font-semibold transition ${mode === "camera" ? "bg-green-600 text-white" : "bg-white text-gray-600 hover:bg-gray-50"}`}
          >
            {t.cameraTab}
          </button>
        </div>

        {/* Camera */}
        {mode === "camera" && (
          <div className="mb-4">
            <video ref={videoRef} autoPlay playsInline className="w-full h-64 object-cover rounded-xl bg-black"/>
            <button onClick={capturePhoto} className="w-full mt-3 bg-green-600 text-white py-2.5 rounded-xl font-semibold hover:bg-green-700 transition">
              {t.capture}
            </button>
          </div>
        )}

        {/* File upload */}
        {mode === "upload" && (
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-green-100 file:text-green-700 hover:file:bg-green-200 mb-4"
          />
        )}

        {preview && (
          <img src={preview} alt="Leaf preview" className="w-full h-64 object-cover rounded-xl mb-4"/>
        )}

        <button
          onClick={handleDetect}
          disabled={!image || loading}
          className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 disabled:opacity-50 transition"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"/>
              {t.detecting}
            </span>
          ) : t.detectBtn}
        </button>

        {/* Quick result status */}
        {result && (
          <div className={`mt-4 p-3 rounded-xl text-sm ${
            result.error || result.status === "rejected" || result.status === "uncertain"
              ? "bg-red-50 text-red-700"
              : result.disease?.toLowerCase().includes("healthy")
                ? "bg-green-50 text-green-800"
                : "bg-orange-50 text-orange-800"
          }`}>
            {result.error
              ? result.error
              : result.status === "rejected"
                ? t.notTomato
                : result.status === "uncertain"
                  ? t.unclear
                  : (
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <span className="font-bold text-base">
                        {result.disease?.toLowerCase().includes("healthy") ? `✅ ${t.healthy}` : `🔍 ${result.disease}`}
                      </span>
                      <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                        result.confidence === "High"   ? "bg-green-200 text-green-800" :
                        result.confidence === "Medium" ? "bg-yellow-200 text-yellow-800" :
                                                         "bg-red-200 text-red-800"
                      }`}>
                        {t.confidence}: {result.confidence}
                      </span>
                    </div>
                  )
            }
          </div>
        )}
      </div>

      {/* ── Full Disease Info Card ── */}
      {result && result.status === "success" && diseaseInfo && (
        <div className="w-full space-y-4">

          {/* Header card */}
          <div className="bg-white rounded-2xl shadow-lg p-5 border-l-4 border-green-500">
            <div className="flex items-start justify-between flex-wrap gap-3">
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">
                  {result.disease?.toLowerCase().includes("healthy") ? "" : t.diseaseDetected}
                </p>
                <h2 className="text-2xl font-bold text-gray-800">{result.disease}</h2>
              </div>
              {/* Severity badge */}
              <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-sm font-bold ${sevConfig.color}`}>
                <span>{sevConfig.icon}</span>
                <span>{t.severity}: {sevConfig.label[language]}</span>
              </div>
            </div>

            {/* Description */}
            <div className="mt-4 p-4 bg-gray-50 rounded-xl">
              <p className="text-sm font-semibold text-gray-700 mb-1">📋 {t.about}</p>
              <p className="text-sm text-gray-600 leading-relaxed">{diseaseInfo.description}</p>
            </div>
          </div>

          {/* Causes */}
          {diseaseInfo.causes?.length > 0 && (
            <div className="bg-white rounded-2xl shadow p-5">
              <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                <span className="w-7 h-7 bg-orange-100 rounded-lg flex items-center justify-center text-sm">⚡</span>
                {t.causes}
              </h3>
              <ul className="space-y-2">
                {diseaseInfo.causes.map((c, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="text-orange-400 mt-0.5 shrink-0">•</span>
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Symptoms */}
          {diseaseInfo.symptoms?.length > 0 && (
            <div className="bg-white rounded-2xl shadow p-5">
              <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                <span className="w-7 h-7 bg-yellow-100 rounded-lg flex items-center justify-center text-sm">👁️</span>
                {t.symptoms}
              </h3>
              <ul className="space-y-2">
                {diseaseInfo.symptoms.map((s, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="text-yellow-500 mt-0.5 shrink-0">→</span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Treatment */}
          {diseaseInfo.treatment?.length > 0 && (
            <div className="bg-white rounded-2xl shadow p-5 border-l-4 border-blue-400">
              <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                <span className="w-7 h-7 bg-blue-100 rounded-lg flex items-center justify-center text-sm">💊</span>
                {t.treatment}
              </h3>
              <ol className="space-y-2">
                {diseaseInfo.treatment.map((step, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                    <span className="shrink-0 w-5 h-5 bg-blue-600 text-white rounded-full text-xs flex items-center justify-center font-bold mt-0.5">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          )}

          {/* Prevention */}
          {diseaseInfo.prevention?.length > 0 && (
            <div className="bg-white rounded-2xl shadow p-5 border-l-4 border-green-400">
              <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                <span className="w-7 h-7 bg-green-100 rounded-lg flex items-center justify-center text-sm">🛡️</span>
                {t.prevention}
              </h3>
              <ul className="space-y-2">
                {diseaseInfo.prevention.map((p, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="text-green-500 mt-0.5 shrink-0">✓</span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Farmer Actions */}
          {diseaseInfo.farmerActions?.length > 0 && (
            <div className="bg-amber-50 rounded-2xl shadow p-5 border border-amber-200">
              <h3 className="font-bold text-amber-800 mb-3 flex items-center gap-2">
                <span className="w-7 h-7 bg-amber-200 rounded-lg flex items-center justify-center text-sm">👨‍🌾</span>
                {t.farmerAction}
              </h3>
              <ul className="space-y-2">
                {diseaseInfo.farmerActions.map((a, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-amber-800">
                    <span className="shrink-0 mt-0.5">⚡</span>
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Products */}
          {diseaseInfo.products && (
            <div className="bg-white rounded-2xl shadow p-5">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="w-7 h-7 bg-purple-100 rounded-lg flex items-center justify-center text-sm">🧴</span>
                {t.products}
              </h3>

              {["organic", "chemical", "preventive"].map(type => (
                diseaseInfo.products[type]?.length > 0 && (
                  <div key={type} className="mb-4">
                    <p className={`text-xs font-bold mb-2 uppercase tracking-wider ${
                      type === "organic" ? "text-green-700" : type === "chemical" ? "text-blue-700" : "text-yellow-700"
                    }`}>
                      {productTypeConfig[type].icon} {t[type]}
                    </p>
                    <div className="space-y-2">
                      {diseaseInfo.products[type].map((p, i) => (
                        <div key={i} className={`border rounded-xl p-3 ${productTypeConfig[type].bg}`}>
                          <div className="flex items-center justify-between gap-2 flex-wrap">
                            <div className="flex-1 min-w-0">
                              <p className="font-semibold text-sm text-gray-800">{p.name}</p>
                              <p className="text-xs text-gray-500 mt-0.5">{p.use}</p>
                            </div>
                            <button
                              onClick={() => openShop(p.search)}
                              className="shrink-0 text-xs px-3 py-1.5 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition"
                            >
                              {t.buyOnline}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

     
              
                      
