// translations.js
// TomatoGuard AI — Complete i18n translation file
// Supports: English, Hindi, Kannada
// Add new languages by adding a new key at the top level

const translations = {

  // ─────────────────────────────────────────
  // ENGLISH
  // ─────────────────────────────────────────
  english: {
    // Navbar
    nav: {
      brand: "TomatoGuard AI",
      detect: "Detect",
      sensors: "Sensors",
      history: "History",
      shops: "Shops",
      logout: "Logout",
    },

    // Auth
    auth: {
      login: "Login",
      signup: "Sign Up",
      email: "Email address",
      password: "Password",
      fullName: "Full name",
      continueGoogle: "Continue with Google",
      createAccount: "Create Account",
      pleaseWait: "Please wait...",
      or: "or",
      built: "Built at VVCE · TomatoGuard AI v2.0",
    },

    // Dashboard / Detect page
    detect: {
      subtitle: "Upload or capture a tomato leaf image",
      uploadTab: "Upload",
      cameraTab: "Camera",
      capture: "Capture Photo",
      detectBtn: "Detect Disease",
      detecting: "Analyzing...",
      noImage: "Please select or capture an image first.",
    },

    // Results
    result: {
      diseaseDetected: "Disease Detected",
      healthy: "Healthy Plant",
      confidence: "Confidence",
      high: "High",
      medium: "Medium",
      low: "Low",
      description: "About this Disease",
      causes: "Causes",
      symptoms: "Symptoms",
      severity: "Severity Level",
      severityLow: "Low",
      severityMedium: "Medium",
      severityHigh: "High",
      severityCritical: "Critical",
      treatment: "Treatment Steps",
      prevention: "Prevention Tips",
      farmerAction: "Recommended Actions",
      products: "Recommended Products",
      organic: "Organic",
      chemical: "Chemical",
      preventive: "Preventive",
      buyOnline: "Buy Online",
      notTomato: "Not a tomato leaf! Please upload a clear tomato leaf image.",
      unclear: "Image unclear. Please retake with better lighting.",
      error: "Could not connect to server. Please try again.",
    },

    // Sensor dashboard
    sensors: {
      title: "Sensor Dashboard",
      lastUpdated: "Last updated",
      refresh: "Refresh",
      noData: "No sensor data yet",
      noDataDesc: "Make sure your ESP32 is powered on and connected to WiFi",
      temperature: "Temperature",
      humidity: "Humidity",
      soilMoisture: "Soil Moisture",
      idealRanges: "Ideal Ranges for Tomato",
      status: {
        optimal: "Optimal",
        warning: "Warning",
        critical: "Critical",
        unknown: "Unknown",
      },
      alerts: {
        title: "Active Alerts",
        tempHigh: "Temperature too high — Provide shade or increase irrigation",
        tempLow: "Temperature too low — Protect plants from cold",
        humidityLow: "Humidity too low — Increase irrigation frequency",
        humidityHigh: "Humidity too high — Improve ventilation",
        moistureLow: "Soil too dry — Water plants immediately",
        moistureHigh: "Soil too wet — Reduce irrigation",
      },
    },

    // History
    history: {
      title: "Detection History",
      loading: "Loading history...",
      empty: "No detections yet. Scan your first tomato leaf!",
      detectedAt: "Detected at",
    },

    // Shops
    shops: {
      title: "Nearby Shops",
      description: "Find agricultural and pesticide shops near your location",
      openMaps: "Open Google Maps — Find Shops Near Me",
    },

    // Footer
    footer: {
      rights: "All rights reserved",
      built: "Built with ❤️ for farmers",
    },

    // Common
    common: {
      loading: "Loading...",
      error: "Something went wrong",
      retry: "Try Again",
      close: "Close",
      save: "Save",
      cancel: "Cancel",
    },
  },

  // ─────────────────────────────────────────
  // HINDI
  // ─────────────────────────────────────────
  hindi: {
    nav: {
      brand: "टमाटरगार्ड AI",
      detect: "पहचानें",
      sensors: "सेंसर",
      history: "इतिहास",
      shops: "दुकानें",
      logout: "लॉगआउट",
    },

    auth: {
      login: "लॉगिन",
      signup: "साइन अप",
      email: "ईमेल पता",
      password: "पासवर्ड",
      fullName: "पूरा नाम",
      continueGoogle: "Google से जारी रखें",
      createAccount: "खाता बनाएं",
      pleaseWait: "कृपया प्रतीक्षा करें...",
      or: "या",
      built: "VVCE में बनाया गया · TomatoGuard AI v2.0",
    },

    detect: {
      subtitle: "टमाटर की पत्ती की तस्वीर अपलोड करें या कैमरे से लें",
      uploadTab: "अपलोड",
      cameraTab: "कैमरा",
      capture: "फोटो लें",
      detectBtn: "रोग पहचानें",
      detecting: "विश्लेषण हो रहा है...",
      noImage: "कृपया पहले एक छवि चुनें या कैप्चर करें।",
    },

    result: {
      diseaseDetected: "रोग का पता चला",
      healthy: "स्वस्थ पौधा",
      confidence: "विश्वसनीयता",
      high: "उच्च",
      medium: "मध्यम",
      low: "कम",
      description: "इस रोग के बारे में",
      causes: "कारण",
      symptoms: "लक्षण",
      severity: "गंभीरता का स्तर",
      severityLow: "कम",
      severityMedium: "मध्यम",
      severityHigh: "अधिक",
      severityCritical: "गंभीर",
      treatment: "उपचार के चरण",
      prevention: "रोकथाम के उपाय",
      farmerAction: "किसान के लिए सुझाव",
      products: "अनुशंसित उत्पाद",
      organic: "जैविक",
      chemical: "रासायनिक",
      preventive: "निवारक",
      buyOnline: "ऑनलाइन खरीदें",
      notTomato: "यह टमाटर की पत्ती नहीं है! कृपया स्पष्ट टमाटर की पत्ती की छवि अपलोड करें।",
      unclear: "छवि अस्पष्ट है। बेहतर रोशनी में दोबारा लें।",
      error: "सर्वर से कनेक्ट नहीं हो सका। कृपया पुनः प्रयास करें।",
    },

    sensors: {
      title: "सेंसर डैशबोर्ड",
      lastUpdated: "अंतिम अपडेट",
      refresh: "ताज़ा करें",
      noData: "अभी कोई सेंसर डेटा नहीं",
      noDataDesc: "सुनिश्चित करें कि आपका ESP32 चालू है और WiFi से जुड़ा है",
      temperature: "तापमान",
      humidity: "आर्द्रता",
      soilMoisture: "मिट्टी की नमी",
      idealRanges: "टमाटर के लिए आदर्श सीमा",
      status: {
        optimal: "उचित",
        warning: "सावधानी",
        critical: "गंभीर",
        unknown: "अज्ञात",
      },
      alerts: {
        title: "सक्रिय चेतावनियाँ",
        tempHigh: "तापमान बहुत अधिक है — छाया दें या सिंचाई बढ़ाएं",
        tempLow: "तापमान बहुत कम है — पौधों को ठंड से बचाएं",
        humidityLow: "आर्द्रता बहुत कम है — सिंचाई की आवृत्ति बढ़ाएं",
        humidityHigh: "आर्द्रता बहुत अधिक है — वेंटिलेशन सुधारें",
        moistureLow: "मिट्टी बहुत सूखी है — तुरंत पानी दें",
        moistureHigh: "मिट्टी बहुत गीली है — सिंचाई कम करें",
      },
    },

    history: {
      title: "पहचान इतिहास",
      loading: "इतिहास लोड हो रहा है...",
      empty: "अभी तक कोई पहचान नहीं। अपनी पहली टमाटर की पत्ती स्कैन करें!",
      detectedAt: "पहचाना गया",
    },

    shops: {
      title: "नजदीकी दुकानें",
      description: "अपने स्थान के पास कृषि और कीटनाशक दुकानें खोजें",
      openMaps: "Google Maps खोलें — पास की दुकानें खोजें",
    },

    footer: {
      rights: "सर्वाधिकार सुरक्षित",
      built: "किसानों के लिए ❤️ से बनाया गया",
    },

    common: {
      loading: "लोड हो रहा है...",
      error: "कुछ गलत हो गया",
      retry: "पुनः प्रयास करें",
      close: "बंद करें",
      save: "सहेजें",
      cancel: "रद्द करें",
    },
  },

  // ─────────────────────────────────────────
  // KANNADA
  // ─────────────────────────────────────────
  kannada: {
    nav: {
      brand: "ಟೊಮೇಟೊಗಾರ್ಡ್ AI",
      detect: "ಪತ್ತೆಹಚ್ಚಿ",
      sensors: "ಸಂವೇದಕಗಳು",
      history: "ಇತಿಹಾಸ",
      shops: "ಅಂಗಡಿಗಳು",
      logout: "ಲಾಗ್‌ಔಟ್",
    },

    auth: {
      login: "ಲಾಗಿನ್",
      signup: "ಸೈನ್ ಅಪ್",
      email: "ಇಮೇಲ್ ವಿಳಾಸ",
      password: "ಪಾಸ್‌ವರ್ಡ್",
      fullName: "ಪೂರ್ಣ ಹೆಸರು",
      continueGoogle: "Google ನೊಂದಿಗೆ ಮುಂದುವರಿಯಿರಿ",
      createAccount: "ಖಾತೆ ರಚಿಸಿ",
      pleaseWait: "ದಯವಿಟ್ಟು ನಿರೀಕ್ಷಿಸಿ...",
      or: "ಅಥವಾ",
      built: "VVCE ನಲ್ಲಿ ನಿರ್ಮಿಸಲಾಗಿದೆ · TomatoGuard AI v2.0",
    },

    detect: {
      subtitle: "ಟೊಮೇಟೊ ಎಲೆಯ ಚಿತ್ರವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ ಅಥವಾ ಕ್ಯಾಮೆರಾದಿಂದ ತೆಗೆಯಿರಿ",
      uploadTab: "ಅಪ್‌ಲೋಡ್",
      cameraTab: "ಕ್ಯಾಮೆರಾ",
      capture: "ಫೋಟೋ ತೆಗೆಯಿರಿ",
      detectBtn: "ರೋಗ ಪತ್ತೆಹಚ್ಚಿ",
      detecting: "ವಿಶ್ಲೇಷಿಸಲಾಗುತ್ತಿದೆ...",
      noImage: "ದಯವಿಟ್ಟು ಮೊದಲು ಒಂದು ಚಿತ್ರವನ್ನು ಆಯ್ಕೆ ಮಾಡಿ ಅಥವಾ ಸೆರೆಹಿಡಿಯಿರಿ.",
    },

    result: {
      diseaseDetected: "ರೋಗ ಪತ್ತೆಯಾಗಿದೆ",
      healthy: "ಆರೋಗ್ಯಕರ ಸಸ್ಯ",
      confidence: "ವಿಶ್ವಾಸಾರ್ಹತೆ",
      high: "ಹೆಚ್ಚು",
      medium: "ಮಧ್ಯಮ",
      low: "ಕಡಿಮೆ",
      description: "ಈ ರೋಗದ ಬಗ್ಗೆ",
      causes: "ಕಾರಣಗಳು",
      symptoms: "ಲಕ್ಷಣಗಳು",
      severity: "ತೀವ್ರತೆಯ ಮಟ್ಟ",
      severityLow: "ಕಡಿಮೆ",
      severityMedium: "ಮಧ್ಯಮ",
      severityHigh: "ಅಧಿಕ",
      severityCritical: "ಗಂಭೀರ",
      treatment: "ಚಿಕಿತ್ಸೆಯ ಹಂತಗಳು",
      prevention: "ತಡೆಗಟ್ಟುವ ಸಲಹೆಗಳು",
      farmerAction: "ರೈತರಿಗೆ ಶಿಫಾರಸು ಕ್ರಮಗಳು",
      products: "ಶಿಫಾರಸು ಮಾಡಿದ ಉತ್ಪನ್ನಗಳು",
      organic: "ಸಾವಯವ",
      chemical: "ರಾಸಾಯನಿಕ",
      preventive: "ತಡೆಗಟ್ಟುವ",
      buyOnline: "ಆನ್‌ಲೈನ್ ಖರೀದಿಸಿ",
      notTomato: "ಇದು ಟೊಮೇಟೊ ಎಲೆ ಅಲ್ಲ! ದಯವಿಟ್ಟು ಸ್ಪಷ್ಟ ಟೊಮೇಟೊ ಎಲೆಯ ಚಿತ್ರ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ.",
      unclear: "ಚಿತ್ರ ಅಸ್ಪಷ್ಟವಾಗಿದೆ. ಉತ್ತಮ ಬೆಳಕಿನಲ್ಲಿ ಮತ್ತೆ ತೆಗೆಯಿರಿ.",
      error: "ಸರ್ವರ್‌ಗೆ ಸಂಪರ್ಕಿಸಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ. ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.",
    },

    sensors: {
      title: "ಸಂವೇದಕ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
      lastUpdated: "ಕೊನೆಯ ಅಪ್‌ಡೇಟ್",
      refresh: "ರಿಫ್ರೆಶ್",
      noData: "ಇನ್ನೂ ಯಾವುದೇ ಸಂವೇದಕ ಡೇಟಾ ಇಲ್ಲ",
      noDataDesc: "ನಿಮ್ಮ ESP32 ಚಾಲೂ ಇದೆ ಮತ್ತು WiFi ಗೆ ಸಂಪರ್ಕಿತವಾಗಿದೆ ಎಂದು ಖಚಿತಪಡಿಸಿ",
      temperature: "ತಾಪಮಾನ",
      humidity: "ಆರ್ದ್ರತೆ",
      soilMoisture: "ಮಣ್ಣಿನ ತೇವಾಂಶ",
      idealRanges: "ಟೊಮೇಟೊಗೆ ಆದರ್ಶ ವ್ಯಾಪ್ತಿ",
      status: {
        optimal: "ಉತ್ತಮ",
        warning: "ಎಚ್ಚರಿಕೆ",
        critical: "ಗಂಭೀರ",
        unknown: "ಅಜ್ಞಾತ",
      },
      alerts: {
        title: "ಸಕ್ರಿಯ ಎಚ್ಚರಿಕೆಗಳು",
        tempHigh: "ತಾಪಮಾನ ತುಂಬಾ ಹೆಚ್ಚು — ನೆರಳು ನೀಡಿ ಅಥವಾ ನೀರಾವರಿ ಹೆಚ್ಚಿಸಿ",
        tempLow: "ತಾಪಮಾನ ತುಂಬಾ ಕಡಿಮೆ — ಸಸ್ಯಗಳನ್ನು ಚಳಿಯಿಂದ ರಕ್ಷಿಸಿ",
        humidityLow: "ಆರ್ದ್ರತೆ ತುಂಬಾ ಕಡಿಮೆ — ನೀರಾವರಿ ಹೆಚ್ಚಿಸಿ",
        humidityHigh: "ಆರ್ದ್ರತೆ ತುಂಬಾ ಹೆಚ್ಚು — ಗಾಳಿಯಾಡುವಿಕೆ ಸುಧಾರಿಸಿ",
        moistureLow: "ಮಣ್ಣು ತುಂಬಾ ಒಣಗಿದೆ — ತಕ್ಷಣ ನೀರು ನೀಡಿ",
        moistureHigh: "ಮಣ್ಣು ತುಂಬಾ ತೇವವಾಗಿದೆ — ನೀರಾವರಿ ಕಡಿಮೆ ಮಾಡಿ",
      },
    },

    history: {
      title: "ಪತ್ತೆ ಇತಿಹಾಸ",
      loading: "ಇತಿಹಾಸ ಲೋಡ್ ಆಗುತ್ತಿದೆ...",
      empty: "ಇನ್ನೂ ಯಾವುದೇ ಪತ್ತೆ ಇಲ್ಲ. ನಿಮ್ಮ ಮೊದಲ ಟೊಮೇಟೊ ಎಲೆ ಸ್ಕ್ಯಾನ್ ಮಾಡಿ!",
      detectedAt: "ಪತ್ತೆಯಾದ ಸಮಯ",
    },

    shops: {
      title: "ಹತ್ತಿರದ ಅಂಗಡಿಗಳು",
      description: "ನಿಮ್ಮ ಸ್ಥಳದ ಬಳಿ ಕೃಷಿ ಮತ್ತು ಕೀಟನಾಶಕ ಅಂಗಡಿಗಳನ್ನು ಹುಡುಕಿ",
      openMaps: "Google Maps ತೆರೆಯಿರಿ — ಹತ್ತಿರದ ಅಂಗಡಿಗಳನ್ನು ಹುಡುಕಿ",
    },

    footer: {
      rights: "ಎಲ್ಲಾ ಹಕ್ಕುಗಳು ಕಾಯ್ದಿರಿಸಲಾಗಿವೆ",
      built: "ರೈತರಿಗಾಗಿ ❤️ ನಿಂದ ನಿರ್ಮಿಸಲಾಗಿದೆ",
    },

    common: {
      loading: "ಲೋಡ್ ಆಗುತ್ತಿದೆ...",
      error: "ಏನೋ ತಪ್ಪಾಗಿದೆ",
      retry: "ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ",
      close: "ಮುಚ್ಚಿ",
      save: "ಉಳಿಸಿ",
      cancel: "ರದ್ದುಮಾಡಿ",
    },
  },
}

export default translations
