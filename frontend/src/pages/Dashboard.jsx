import { useState, useRef } from "react"
import axios from "axios"

const BACKEND = "https://tomato-disease-detector-ii1n.onrender.com"

const translations = {
  english: {
    subtitle: "Upload or capture a tomato leaf image",
    detect: "Detect Disease",
    detecting: "Analyzing...",
    disease: "🔍 Disease",
    confidence: "📊 Confidence",
    treatment: "💊 Treatment",
    products: "🧴 Recommended Products",
    organic: "🌿 Organic",
    chemical: "🧪 Chemical",
    preventive: "🛡️ Preventive",
    error: "Could not connect to backend.",
    notTomato: "Please upload a tomato leaf image only!",
    buyOnline: "🛒 Buy Online",
  },
  hindi: {
    subtitle: "टमाटर के पत्ते की छवि अपलोड करें",
    detect: "रोग पहचानें",
    detecting: "विश्लेषण हो रहा है...",
    disease: "🔍 रोग",
    confidence: "📊 विश्वास",
    treatment: "💊 उपचार",
    products: "🧴 अनुशंसित उत्पाद",
    organic: "🌿 जैविक",
    chemical: "🧪 रासायनिक",
    preventive: "🛡️ निवारक",
    error: "बैकएंड से कनेक्ट नहीं हो सका।",
    notTomato: "कृपया केवल टमाटर के पत्ते की छवि अपलोड करें!",
    buyOnline: "🛒 ऑनलाइन खरीदें",
  },
  kannada: {
    subtitle: "ಟೊಮೇಟೊ ಎಲೆಯ ಚಿತ್ರವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ",
    detect: "ರೋಗ ಪತ್ತೆಹಚ್ಚಿ",
    detecting: "ವಿಶ್ಲೇಷಿಸಲಾಗುತ್ತಿದೆ...",
    disease: "🔍 ರೋಗ",
    confidence: "📊 ವಿಶ್ವಾಸ",
    treatment: "💊 ಚಿಕಿತ್ಸೆ",
    products: "🧴 ಶಿಫಾರಸು ಉತ್ಪನ್ನಗಳು",
    organic: "🌿 ಸಾವಯವ",
    chemical: "🧪 ರಾಸಾಯನಿಕ",
    preventive: "🛡️ ತಡೆಗಟ್ಟುವ",
    error: "ಬ್ಯಾಕೆಂಡ್‌ಗೆ ಸಂಪರ್ಕಿಸಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ.",
    notTomato: "ದಯವಿಟ್ಟು ಟೊಮೇಟೊ ಎಲೆಯ ಚಿತ್ರವನ್ನು ಮಾತ್ರ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ!",
    buyOnline: "🛒 ಆನ್‌ಲೈನ್ ಖರೀದಿಸಿ",
  }
}

const diseaseProducts = {
  "Early Blight": {
    organic: [
      { name: "Neem Oil Spray", use: "Spray on leaves every 7 days", search: "neem oil spray for plants" },
      { name: "Copper Fungicide Organic", use: "Apply at early signs", search: "copper fungicide organic" },
    ],
    chemical: [
      { name: "Mancozeb 75% WP", use: "Mix 2g/L water, spray weekly", search: "mancozeb 75 wp fungicide" },
      { name: "Chlorothalonil", use: "Apply every 10 days", search: "chlorothalonil fungicide" },
    ],
    preventive: [
      { name: "Trichoderma viride", use: "Soil application", search: "trichoderma viride fungicide" },
    ]
  },
  "Late Blight": {
    organic: [
      { name: "Copper Hydroxide", use: "Spray every 5-7 days", search: "copper hydroxide fungicide" },
      { name: "Bacillus subtilis", use: "Spray weekly", search: "bacillus subtilis biofungicide" },
    ],
    chemical: [
      { name: "Metalaxyl + Mancozeb", use: "Mix 2.5g/L, spray every 7 days", search: "metalaxyl mancozeb fungicide" },
      { name: "Cymoxanil 8% + Mancozeb 64%", use: "Apply at first symptoms", search: "cymoxanil mancozeb fungicide" },
    ],
    preventive: [
      { name: "Potassium Bicarbonate", use: "Preventive spray weekly", search: "potassium bicarbonate fungicide" },
    ]
  },
  "Septoria Leaf Spot": {
    organic: [
      { name: "Neem Oil Spray", use: "Spray every 7 days", search: "neem oil spray" },
      { name: "Copper Soap Fungicide", use: "Apply weekly", search: "copper soap fungicide" },
    ],
    chemical: [
      { name: "Chlorothalonil 75% WP", use: "Mix 2g/L, every 10 days", search: "chlorothalonil 75wp" },
      { name: "Mancozeb + Carbendazim", use: "Apply at first spots", search: "mancozeb carbendazim fungicide" },
    ],
    preventive: [
      { name: "Trichoderma harzianum", use: "Soil drench", search: "trichoderma harzianum" },
    ]
  },
  "Bacterial Spot": {
    organic: [
      { name: "Copper Hydroxide Spray", use: "Spray every 5 days", search: "copper hydroxide spray" },
      { name: "Bacillus amyloliquefaciens", use: "Spray weekly", search: "bacillus amyloliquefaciens spray" },
    ],
    chemical: [
      { name: "Streptomycin Sulfate", use: "Mix 1g/L, early infection", search: "streptomycin sulfate bactericide" },
      { name: "Copper Oxychloride 50% WP", use: "Apply every 7 days", search: "copper oxychloride fungicide" },
    ],
    preventive: [
      { name: "Acibenzolar-S-methyl", use: "Apply before rainy season", search: "acibenzolar plant activator" },
    ]
  },
  "Leaf Mold": {
    organic: [
      { name: "Neem Oil + Soap Spray", use: "Spray underside weekly", search: "neem oil soap spray" },
      { name: "Bacillus subtilis", use: "Foliar spray every 7 days", search: "bacillus subtilis spray" },
    ],
    chemical: [
      { name: "Chlorothalonil", use: "Spray every 10 days", search: "chlorothalonil spray" },
      { name: "Mancozeb 75% WP", use: "Mix 2g/L, apply weekly", search: "mancozeb fungicide" },
    ],
    preventive: [
      { name: "Potassium Silicate", use: "Spray monthly", search: "potassium silicate plant" },
    ]
  },
  "Healthy": {
    organic: [
      { name: "Neem Oil Preventive", use: "Spray monthly", search: "neem oil preventive spray" },
    ],
    chemical: [],
    preventive: [
      { name: "Trichoderma viride", use: "Soil application", search: "trichoderma viride" },
    ]
  }
}

const labelColors = {
  organic: "bg-green-50 border-green-200 text-green-800",
  chemical: "bg-blue-50 border-blue-200 text-blue-800",
  preventive: "bg-yellow-50 border-yellow-200 text-yellow-800",
}

export default function Dashboard({ language, user }) {
  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState(null)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [mode, setMode] = useState("upload") // upload | camera
  const videoRef = useRef(null)
  const streamRef = useRef(null)
  const t = translations[language]

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
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" }
      })
      streamRef.current = stream
      if (videoRef.current) videoRef.current.srcObject = stream
    } catch (e) {
      alert("Camera not accessible")
      setMode("upload")
    }
  }

  const capturePhoto = () => {
    const canvas = document.createElement("canvas")
    canvas.width = videoRef.current.videoWidth
    canvas.height = videoRef.current.videoHeight
    canvas.getContext("2d").drawImage(videoRef.current, 0, 0)
    canvas.toBlob(blob => {
      const file = new File([blob], "capture.jpg", { type: "image/jpeg" })
      setImage(file)
      setPreview(URL.createObjectURL(blob))
      setMode("upload")
      streamRef.current?.getTracks().forEach(t => t.stop())
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

  const getProducts = () => {
    if (!result?.disease) return null
    const key = Object.keys(diseaseProducts).find(k =>
      result.disease.toLowerCase().includes(k.toLowerCase())
    )
    return key ? diseaseProducts[key] : null
  }

  const openShop = (search) => {
    window.open(`https://www.amazon.in/s?k=${encodeURIComponent(search)}`, "_blank")
  }

  const products = getProducts()

  return (
    <div className="p-6 flex flex-col items-center">
      <p className="text-green-600 mb-6 text-center">{t.subtitle}</p>

      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md mb-6">

        {/* Upload / Camera toggle */}
        <div className="flex rounded-xl overflow-hidden border border-gray-200 mb-4">
          <button
            onClick={() => { setMode("upload"); streamRef.current?.getTracks().forEach(t => t.stop()) }}
            className={`flex-1 py-2 text-sm font-semibold transition ${mode === "upload" ? "bg-green-600 text-white" : "bg-white text-gray-600"}`}
          >
            📁 Upload
          </button>
          <button
            onClick={startCamera}
            className={`flex-1 py-2 text-sm font-semibold transition ${mode === "camera" ? "bg-green-600 text-white" : "bg-white text-gray-600"}`}
          >
            📷 Camera
          </button>
        </div>

        {/* Camera view */}
        {mode === "camera" && (
          <div className="mb-4">
            <video ref={videoRef} autoPlay playsInline className="w-full h-64 object-cover rounded-xl bg-black"/>
            <button
              onClick={capturePhoto}
              className="w-full mt-3 bg-green-600 text-white py-2.5 rounded-xl font-semibold hover:bg-green-700 transition"
            >
              📸 Capture
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
          <img src={preview} alt="Leaf" className="w-full h-64 object-cover rounded-xl mb-4"/>
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
          ) : t.detect}
        </button>

        {result && (
          <div className={`mt-5 p-4 rounded-xl ${result.error ? "bg-red-50 text-red-700" : "bg-green-50 text-green-800"}`}>
            {result.error ? <p>{result.error}</p> : (
              <>
                <p className="text-lg font-bold">{t.disease}: {result.disease}</p>
                <p className="text-sm mt-1">{t.confidence}: <span className={`font-semibold ${result.confidence === "High" ? "text-green-600" : result.confidence === "Medium" ? "text-yellow-600" : "text-red-600"}`}>{result.confidence}</span></p>
                <p className="text-sm mt-2">{t.treatment}: {result.treatment}</p>
              </>
            )}
          </div>
        )}
      </div>

      {/* Products */}
      {result && !result.error && products && (
        <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-2xl mb-6">
          <h2 className="text-xl font-bold text-green-800 mb-4">{t.products}</h2>

          {["organic", "chemical", "preventive"].map(type => (
            products[type]?.length > 0 && (
              <div key={type} className="mb-4">
                <h3 className={`font-semibold mb-2 ${type === "organic" ? "text-green-700" : type === "chemical" ? "text-blue-700" : "text-yellow-700"}`}>
                  {t[type]}
                </h3>
                <div className="flex flex-col gap-2">
                  {products[type].map((p, i) => (
                    <div key={i} className={`border rounded-xl p-3 ${labelColors[type]}`}>
                      <div className="flex items-center justify-between gap-2">
                        <div>
                          <p className="font-semibold text-sm">{p.name}</p>
                          <p className="text-xs mt-0.5 opacity-70">{p.use}</p>
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
  )
}
