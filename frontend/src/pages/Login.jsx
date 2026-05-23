import { useState } from "react"
import { supabase } from "../supabase"
import { useNavigate } from "react-router-dom"

export default function Login() {
  const [mode, setMode] = useState("login")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const navigate = useNavigate()

  const handleEmailAuth = async () => {
    setLoading(true)
    setError("")
    setSuccess("")

    if (mode === "signup") {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: name } }
      })
      if (error) setError(error.message)
      else setSuccess("Check your email to confirm your account!")
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) setError(error.message)
      else navigate("/dashboard")
    }
    setLoading(false)
  }

  const handleGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/dashboard` }
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">

        <div className="text-center mb-8">
          <div className="text-6xl mb-3">🍅</div>
          <h1 className="text-3xl font-bold text-green-800">TomatoGuard AI</h1>
          <p className="text-green-600 mt-1">Smart crop disease detection</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">

          <div className="flex rounded-xl overflow-hidden border border-green-200 mb-6">
            <button
              onClick={() => { setMode("login"); setError(""); setSuccess("") }}
              className={`flex-1 py-2.5 text-sm font-semibold transition ${
                mode === "login" ? "bg-green-600 text-white" : "bg-white text-green-700 hover:bg-green-50"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => { setMode("signup"); setError(""); setSuccess("") }}
              className={`flex-1 py-2.5 text-sm font-semibold transition ${
                mode === "signup" ? "bg-green-600 text-white" : "bg-white text-green-700 hover:bg-green-50"
              }`}
            >
              Sign Up
            </button>
          </div>

          <button
            onClick={handleGoogle}
            className="w-full flex items-center justify-center gap-3 border border-gray-200 rounded-xl py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition mb-4"
          >
            <img src="https://www.google.com/favicon.ico" className="w-4 h-4" alt="google"/>
            Continue with Google
          </button>

          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 h-px bg-gray-200"/>
            <span className="text-xs text-gray-400">or</span>
            <div className="flex-1 h-px bg-gray-200"/>
          </div>

          <div className="flex flex-col gap-3">
            {mode === "signup" && (
              <input
                type="text"
                placeholder="Full name"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400"
              />
            )}
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleEmailAuth()}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400"
            />
          </div>

          {error && <p className="text-red-500 text-sm mt-3 bg-red-50 p-3 rounded-lg">{error}</p>}
          {success && <p className="text-green-600 text-sm mt-3 bg-green-50 p-3 rounded-lg">{success}</p>}

          <button
            onClick={handleEmailAuth}
            disabled={loading}
            className="w-full mt-4 bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 disabled:opacity-50 transition"
          >
            {loading ? "Please wait..." : mode === "login" ? "Login" : "Create Account"}
          </button>
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          TomatoGuard AI v2.0
        </p>
      </div>
    </div>
  )
}
