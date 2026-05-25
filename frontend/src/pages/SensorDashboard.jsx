import { useEffect, useState } from "react"
import axios from "axios"

const BACKEND = "https://tomato-disease-detector-ii1n.onrender.com"

const SensorCard = ({ icon, label, value, unit, status, color }) => (
  <div className={`bg-white rounded-2xl shadow p-5 border-l-4 ${color}`}>
    <div className="flex items-center justify-between mb-2">
      <span className="text-2xl">{icon}</span>

      <span
        className={`text-xs font-bold px-2 py-1 rounded-full ${
          status === "optimal"
            ? "bg-green-100 text-green-700"
            : status === "warning"
            ? "bg-yellow-100 text-yellow-700"
            : status === "critical"
            ? "bg-red-100 text-red-700"
            : "bg-gray-100 text-gray-500"
        }`}
      >
        {status}
      </span>
    </div>

    <p className="text-gray-500 text-sm">{label}</p>

    <p className="text-2xl font-bold text-gray-800 mt-1">
      {value ?? "--"}{" "}
      <span className="text-sm font-normal text-gray-400">
        {unit}
      </span>
    </p>
  </div>
)

const getSensorStatus = (key, value) => {
  if (value === null || value === undefined) return "unknown"

  const ranges = {
    temperature: { min: 18, max: 29 },
    humidity: { min: 60, max: 80 },
    soil_moisture: { min: 40, max: 70 },
  }

  const r = ranges[key]

  if (!r) return "unknown"

  if (value >= r.min && value <= r.max) return "optimal"

  if (value < r.min * 0.8 || value > r.max * 1.2)
    return "critical"

  return "warning"
}

export default function SensorDashboard() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState(null)

  const fetchSensorData = async () => {
    try {

      // FIXED API ENDPOINT
      const res = await axios.get(`${BACKEND}/sensor-latest`)

      console.log("Sensor API Response:", res.data)

      setData(res.data)
      setLastUpdated(new Date())

    } catch (e) {
      console.error("Sensor fetch failed", e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSensorData()

    const interval = setInterval(fetchSensorData, 30000)

    return () => clearInterval(interval)
  }, [])

  // FIXED SENSOR KEY MAPPING
  const sensors = data
    ? [
        {
          icon: "🌡️",
          label: "Temperature",
          value: data.temperature,
          unit: "°C",
          key: "temperature",
          color: "border-orange-400",
        },

        {
          icon: "💧",
          label: "Humidity",
          value: data.humidity,
          unit: "%",
          key: "humidity",
          color: "border-blue-400",
        },

        {
          icon: "🌱",
          label: "Soil Moisture",
          value: data.soil || data.soil_moisture,
          unit: "%",
          key: "soil_moisture",
          color: "border-green-400",
        },
      ]
    : []

  return (
    <div className="p-6 max-w-4xl mx-auto">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">

        <div>
          <h2 className="text-2xl font-bold text-green-800">
            📡 Sensor Dashboard
          </h2>

          <p className="text-gray-500 text-sm mt-1">
            {lastUpdated
              ? `Last updated: ${lastUpdated.toLocaleTimeString()}`
              : "Loading..."}
          </p>
        </div>

        <button
          onClick={fetchSensorData}
          className="px-4 py-2 bg-green-600 text-white rounded-xl text-sm font-semibold hover:bg-green-700 transition"
        >
          🔄 Refresh
        </button>
      </div>

      {/* LOADING */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="bg-gray-100 rounded-2xl h-28 animate-pulse"
            />
          ))}
        </div>

      ) : data && Object.keys(data).length > 0 ? (

        <>
          {/* SENSOR CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

            {sensors.map((s, i) => (
              <SensorCard
                key={i}
                {...s}
                status={getSensorStatus(s.key, s.value)}
              />
            ))}

          </div>

          {/* IDEAL RANGES */}
          <div className="bg-white rounded-2xl shadow p-5">

            <h3 className="font-bold text-green-800 mb-3">
              🍅 Ideal Ranges for Tomato
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">

              {[
                {
                  icon: "🌡️",
                  label: "Temperature",
                  ideal: "18 – 29°C",
                },

                {
                  icon: "💧",
                  label: "Humidity",
                  ideal: "60 – 80%",
                },

                {
                  icon: "🌱",
                  label: "Soil Moisture",
                  ideal: "40 – 70%",
                },
              ].map((r, i) => (
                <div
                  key={i}
                  className="bg-green-50 rounded-xl p-3 text-center"
                >
                  <p className="text-xl mb-1">{r.icon}</p>

                  <p className="text-xs text-gray-500">
                    {r.label}
                  </p>

                  <p className="font-bold text-green-700 text-sm">
                    {r.ideal}
                  </p>
                </div>
              ))}

            </div>
          </div>
        </>

      ) : (

        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-8 text-center">

          <p className="text-4xl mb-3">📡</p>

          <p className="font-semibold text-yellow-800 text-lg">
            No sensor data yet
          </p>

          <p className="text-sm text-yellow-600 mt-2">
            Make sure your ESP32 is powered on and connected to WiFi
          </p>

          <div className="mt-4 bg-white rounded-xl p-4 text-left text-sm text-gray-600">

            <p className="font-semibold mb-2">
              Connected sensors:
            </p>

            <p>🌡️ DHT11 — Temperature & Humidity</p>

            <p>🌱 Soil Moisture Sensor</p>

          </div>
        </div>
      )}
    </div>
  )
}
