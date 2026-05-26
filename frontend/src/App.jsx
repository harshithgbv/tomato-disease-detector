import { useEffect, useState } from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { supabase } from "./supabase"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import SensorDashboard from "./pages/SensorDashboard"
import Navbar from "./components/Navbar"
import translations from "./translations"
const t = translations[language]
function HistoryTab() {
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("https://tomato-disease-detector-ii1n.onrender.com/history")
      .then(r => r.json())
      .then(d => { setHistory(d); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-green-800 mb-4">📋 Detection History</h2>
      {loading ? (
        <div className="flex flex-col gap-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-gray-100 rounded-2xl h-20 animate-pulse"/>
          ))}
        </div>
      ) : history.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          <p className="text-4xl mb-3">📋</p>
          <p>No detections yet. Scan your first tomato leaf!</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {history.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl shadow p-4 border-l-4 border-green-400">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-bold text-green-800">🔍 {item.disease}</p>
                  <p className="text-sm text-gray-600 mt-1">💊 {item.treatment}</p>
                </div>
                <div className="text-right">
                  <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                    item.confidence === "High" ? "bg-green-100 text-green-700" :
                    item.confidence === "Medium" ? "bg-yellow-100 text-yellow-700" :
                    "bg-red-100 text-red-700"
                  }`}>
                    {item.confidence}
                  </span>
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(item.detected_at).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function ShopsTab() {
  const handleFindShops = () => {
    const query = encodeURIComponent("agricultural pesticide shop near me")
    window.open(`https://www.google.com/maps/search/${query}`, "_blank")
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-green-800 mb-4">🗺️ Nearby Shops</h2>
      <div className="bg-white rounded-2xl shadow p-6 text-center">
        <p className="text-4xl mb-3">🏪</p>
        <p className="text-gray-600 mb-6">Find agricultural and pesticide shops near your location</p>
        <button
          onClick={handleFindShops}
          className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
        >
          🗺️ Open Google Maps — Find Shops Near Me
        </button>
      </div>
    </div>
  )
}

function ProtectedLayout({ user, language, setLanguage }) {
  const [activeTab, setActiveTab] = useState("detect")

  return (
    <div className="min-h-screen bg-green-50">
      <Navbar user={user} language={language} setLanguage={setLanguage} />
      <div className="bg-white border-b border-gray-100 sticky top-14 z-40">
        <div className="max-w-4xl mx-auto flex overflow-x-auto">
          {[
            { id: "detect",  label: "🔍 Detect"  },
            { id: "sensors", label: "📡 Sensors" },
            { id: "history", label: "📋 History" },
            { id: "shops",   label: "🗺️ Shops"   },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-3.5 text-sm font-semibold whitespace-nowrap border-b-2 transition ${
                activeTab === tab.id
                  ? "border-green-600 text-green-700"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      <div className="max-w-4xl mx-auto">
        {activeTab === "detect"  && <Dashboard language={language} user={user} />}
        {activeTab === "sensors" && <SensorDashboard />}
        {activeTab === "history" && <HistoryTab />}
        {activeTab === "shops"   && <ShopsTab />}
      </div>
    </div>
  )
}

function AuthGuard({ children, user }) {
  if (user === undefined) return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="text-center">
        <div className="text-5xl mb-4">🍅</div>
        <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto"/>
      </div>
    </div>
  )
  if (!user) return <Navigate to="/login" replace />
  return children
}

export default function App() {
  const [user, setUser] = useState(undefined)
  const [language, setLanguage] = useState("english")

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null)
    })
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })
    return () => listener.subscription.unsubscribe()
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={
          user ? <Navigate to="/dashboard" replace /> : <Login />
        }/>
        <Route path="/dashboard" element={
          <AuthGuard user={user}>
            <ProtectedLayout user={user} language={language} setLanguage={setLanguage} />
          </AuthGuard>
        }/>
        <Route path="*" element={<Navigate to={user ? "/dashboard" : "/login"} replace />}/>
      </Routes>
    </BrowserRouter>
  )
}
