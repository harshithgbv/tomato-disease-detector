import { supabase } from "../supabase"
import { useNavigate } from "react-router-dom"
import translations from "../translations"

export default function Navbar({ user, language, setLanguage }) {
  const navigate = useNavigate()
  const t = translations[language]

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate("/login")
  }

  return (
    <nav className="w-full bg-white shadow-sm px-6 py-3 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center gap-2">
        <span className="text-2xl">🍅</span>
        <span className="font-bold text-green-800 text-lg">{t.nav.brand}</span>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex gap-1">
          {["english", "hindi", "kannada"].map(lang => (
            <button
              key={lang}
              onClick={() => setLanguage(lang)}
              className={`px-3 py-1 rounded-full text-xs font-semibold border transition ${
                language === lang
                  ? "bg-green-600 text-white border-green-600"
                  : "bg-white text-green-700 border-green-300 hover:bg-green-50"
              }`}
            >
              {lang === "english" ? "EN" : lang === "hindi" ? "हिं" : "ಕನ್ನ"}
            </button>
          ))}
        </div>

        {user && (
          <div className="flex items-center gap-2">
            <img
              src={user.user_metadata?.avatar_url || `https://ui-avatars.com/api/?name=${user.email}&background=16a34a&color=fff`}
              alt="avatar"
              className="w-8 h-8 rounded-full object-cover border-2 border-green-200"
            />
            <span className="text-sm text-gray-600 hidden sm:block">
              {user.user_metadata?.full_name || user.email?.split("@")[0]}
            </span>
          </div>
        )}

        <button
          onClick={handleLogout}
          className="px-3 py-1.5 bg-red-50 text-red-600 border border-red-200 rounded-lg text-sm font-semibold hover:bg-red-100 transition"
        >
          {t.nav.logout}
        </button>
      </div>
    </nav>
  )
}
