import { useState } from "react"
import axios from "axios"

const diseaseProducts = {
  "Early Blight": {
    organic: [
      { name: "Neem Oil Spray", label: "green", use: "Spray on leaves every 7 days" },
      { name: "Copper Fungicide (Organic)", label: "green", use: "Apply at early signs of infection" },
    ],
    chemical: [
      { name: "Mancozeb 75% WP", label: "blue", use: "Mix 2g/L water, spray weekly" },
      { name: "Chlorothalonil", label: "blue", use: "Apply every 10 days" },
    ],
    preventive: [
      { name: "Trichoderma viride", label: "yellow", use: "Soil application to prevent fungal growth" },
    ]
  },
  "Late Blight": {
    organic: [
      { name: "Copper Hydroxide", label: "green", use: "Spray every 5-7 days" },
      { name: "Bacillus subtilis", label: "green", use: "Biological fungicide, spray weekly" },
    ],
    chemical: [
      { name: "Metalaxyl + Mancozeb", label: "blue", use: "Mix 2.5g/L, spray every 7 days" },
      { name: "Cymoxanil 8% + Mancozeb 64%", label: "blue", use: "Apply at first symptoms" },
    ],
    preventive: [
      { name: "Potassium Bicarbonate", label: "yellow", use: "Preventive spray weekly" },
    ]
  },
  "Septoria Leaf Spot": {
    organic: [
      { name: "Neem Oil Spray", label: "green", use: "Spray every 7 days on infected leaves" },
      { name: "Copper Soap Fungicide", label: "green", use: "Apply weekly as preventive measure" },
    ],
    chemical: [
      { name: "Chlorothalonil 75% WP", label: "blue", use: "Mix 2g/L water, spray every 10 days" },
      { name: "Mancozeb + Carbendazim", label: "blue", use: "Apply at first sign of spots" },
    ],
    preventive: [
      { name: "Trichoderma harzianum", label: "yellow", use: "Soil drench to suppress fungal spread" },
    ]
  },
  "Bacterial Spot": {
    organic: [
      { name: "Copper Hydroxide Spray", label: "green", use: "Spray every 5 days during wet weather" },
      { name: "Bacillus amyloliquefaciens", label: "green", use: "Biological spray, apply weekly" },
    ],
    chemical: [
      { name: "Streptomycin Sulfate", label: "blue", use: "Mix 1g/L, spray at early infection" },
      { name: "Copper Oxychloride 50% WP", label: "blue", use: "Apply every 7 days" },
    ],
    preventive: [
      { name: "Acibenzolar-S-methyl", label: "yellow", use: "Apply before rainy season as preventive" },
    ]
  },
  "Leaf Mold": {
    organic: [
      { name: "Neem Oil + Soap Spray", label: "green", use: "Spray on underside of leaves weekly" },
      { name: "Bacillus subtilis", label: "green", use: "Apply as foliar spray every 7 days" },
    ],
    chemical: [
      { name: "Chlorothalonil", label: "blue", use: "Spray every 10 days in humid conditions" },
      { name: "Mancozeb 75% WP", label: "blue", use: "Mix 2g/L, apply weekly" },
    ],
    preventive: [
      { name: "Potassium Silicate", label: "yellow", use: "Strengthens plant cell walls, spray monthly" },
    ]
  },
  "Healthy": {
    organic: [
      { name: "Neem Oil (Preventive)", label: "green", use: "Spray monthly to prevent disease" },
    ],
    chemical: [],
    preventive: [
      { name: "Trichoderma viride", label: "yellow", use: "Soil application for prevention" },
    ]
  }
}
const labelColors = {
  green: "bg-green-100 text-green-800 border-green-300",
  blue: "bg-blue-100 text-blue-800 border-blue-300",
  yellow: "bg-yellow-100 text-yellow-800 border-yellow-300",
}

const labelIcons = {
  green: "🌿 Organic",
  blue: "🧪 Chemical",
  yellow: "🛡️ Preventive",
}

export default function App() {
  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState(null)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [history, setHistory] = useState([])
const [showHistory, setShowHistory] = useState(false)

const fetchHistory = async () => {
  const res = await axios.get("http://localhost:8000/history")
  setHistory(res.data)
  setShowHistory(true)
}

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    setImage(file)
    setPreview(URL.createObjectURL(file))
    setResult(null)
  }

  const handleDetect = async () => {
    if (!image) return
    setLoading(true)
    const formData = new FormData()
    formData.append("file", image)
    try {
      const res = await axios.post("http://localhost:8000/predict", formData)
      setResult(res.data)
    } catch (err) {
      setResult({ error: "Could not connect to backend. Make sure it is running." })
    }
    setLoading(false)
  }

  const handleFindShops = () => {
    const query = encodeURIComponent("agricultural pesticide shop near me")
    window.open(`https://www.google.com/maps/search/${query}`, "_blank")
  }

  const getProducts = () => {
    if (!result || !result.disease) return null
    const key = Object.keys(diseaseProducts).find(k =>
      result.disease.toLowerCase().includes(k.toLowerCase())
    )
    return key ? diseaseProducts[key] : null
  }

  const products = getProducts()

  return (
    <div className="min-h-screen bg-green-50 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold text-green-800 mb-2 mt-6">🍅 Tomato Disease Detector</h1>
      <p className="text-green-600 mb-8">Upload a tomato leaf image to detect disease</p>

      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md mb-6">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-green-100 file:text-green-700 hover:file:bg-green-200 mb-4"
        />

        {preview && (
          <img src={preview} alt="Leaf preview" className="w-full h-64 object-cover rounded-xl mb-4" />
        )}

        <button
          onClick={handleDetect}
          disabled={!image || loading}
          className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 disabled:opacity-50 transition"
        >
          {loading ? "Detecting..." : "Detect Disease"}
        </button>

        {result && (
          <div className={`mt-6 p-4 rounded-xl ${result.error ? "bg-red-50 text-red-700" : "bg-green-50 text-green-800"}`}>
            {result.error ? (
              <p>{result.error}</p>
            ) : (
              <>
                <p className="text-lg font-bold">🔍 Disease: {result.disease}</p>
                <p className="text-sm mt-1">📊 Confidence: {result.confidence}</p>
                <p className="text-sm mt-2">💊 {result.treatment}</p>
              </>
            )}
          </div>
        )}
      </div>

      {result && !result.error && (
        <>
          {products && (
            <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-2xl mb-6">
              <h2 className="text-xl font-bold text-green-800 mb-4">🧴 Recommended Products</h2>

              {products.organic.length > 0 && (
                <div className="mb-4">
                  <h3 className="font-semibold text-green-700 mb-2">🌿 Organic Products</h3>
                  <div className="flex flex-col gap-2">
                    {products.organic.map((p, i) => (
                      <div key={i} className={`border rounded-xl p-3 ${labelColors.green}`}>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-bold px-2 py-0.5 bg-green-200 rounded-full">{labelIcons.green}</span>
                          <span className="font-semibold">{p.name}</span>
                        </div>
                        <p className="text-xs">{p.use}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {products.chemical.length > 0 && (
                <div className="mb-4">
                  <h3 className="font-semibold text-blue-700 mb-2">🧪 Chemical Products</h3>
                  <div className="flex flex-col gap-2">
                    {products.chemical.map((p, i) => (
                      <div key={i} className={`border rounded-xl p-3 ${labelColors.blue}`}>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-bold px-2 py-0.5 bg-blue-200 rounded-full">{labelIcons.blue}</span>
                          <span className="font-semibold">{p.name}</span>
                        </div>
                        <p className="text-xs">{p.use}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {products.preventive.length > 0 && (
                <div className="mb-4">
                  <h3 className="font-semibold text-yellow-700 mb-2">🛡️ Preventive Products</h3>
                  <div className="flex flex-col gap-2">
                    {products.preventive.map((p, i) => (
                      <div key={i} className={`border rounded-xl p-3 ${labelColors.yellow}`}>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-bold px-2 py-0.5 bg-yellow-200 rounded-full">{labelIcons.yellow}</span>
                          <span className="font-semibold">{p.name}</span>
                        </div>
                        <p className="text-xs">{p.use}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-2xl mb-6">
            <h2 className="text-xl font-bold text-green-800 mb-2">🗺️ Find Nearby Shops</h2>
            <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-2xl mb-6">
  <h2 className="text-xl font-bold text-green-800 mb-2">📋 Detection History</h2>
  <button
    onClick={fetchHistory}
    className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition mb-4"
  >
    View Past Detections
  </button>
  {showHistory && (
    <div className="flex flex-col gap-3">
      {history.map((item) => (
        <div key={item.id} className="border rounded-xl p-3 bg-green-50">
          <p className="font-bold text-green-800">🔍 {item.disease}</p>
          <p className="text-sm text-gray-600">📊 {item.confidence} confidence</p>
          <p className="text-sm text-gray-500">💊 {item.treatment}</p>
          <p className="text-xs text-gray-400 mt-1">🕐 {new Date(item.detected_at).toLocaleString()}</p>
        </div>
      ))}
    </div>
  )}
</div>
            <p className="text-gray-500 text-sm mb-4">Find agricultural and pesticide shops near your location</p>
            <button
              onClick={handleFindShops}
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
            >
              🗺️ Open Google Maps — Find Shops Near Me
            </button>
          </div>
        </>
      )}
    </div>
  )
}