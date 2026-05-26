// diseaseData.js
// TomatoGuard AI — Full disease database with multilingual support
// Every disease has: description, causes, symptoms, severity, treatment, prevention, farmerActions

const diseaseData = {

  // ─────────────────────────────────────────
  // EARLY BLIGHT
  // ─────────────────────────────────────────
  "Early Blight": {
    english: {
      description: "Early blight is a common fungal disease caused by Alternaria solani. It primarily affects older leaves first and can severely reduce crop yield if left untreated. It thrives in warm, humid conditions with temperatures between 24–29°C.",
      causes: [
        "Fungus: Alternaria solani",
        "Warm and humid weather (24–29°C)",
        "Infected seeds or transplants",
        "Overhead irrigation spreading spores",
        "Poor air circulation between plants",
      ],
      symptoms: [
        "Dark brown circular spots with yellow rings (target board pattern)",
        "Spots appear first on older lower leaves",
        "Leaves turn yellow and drop prematurely",
        "Stem lesions near soil line",
        "Fruit may also develop dark sunken spots",
      ],
      severity: "Medium",
      treatment: [
        "Remove and destroy all infected leaves immediately",
        "Apply Mancozeb 75% WP (2g per litre of water) every 7 days",
        "Use Chlorothalonil spray as an alternative fungicide",
        "Avoid wetting leaves — use drip irrigation instead of overhead watering",
        "Apply copper-based fungicide as a protective spray",
      ],
      prevention: [
        "Use certified disease-free seeds",
        "Maintain proper plant spacing (45–60cm) for good air flow",
        "Rotate crops — do not plant tomatoes in same spot for 2–3 years",
        "Remove plant debris after harvest",
        "Apply mulch to prevent soil splash on leaves",
        "Monitor plants regularly especially after rain",
      ],
      farmerActions: [
        "Start treatment within 24–48 hours of spotting symptoms",
        "Spray fungicide in the early morning or evening to avoid leaf burn",
        "Keep records of spray schedule for effective crop management",
        "Consult your local agricultural officer if disease spreads rapidly",
      ],
      products: {
        organic: [
          { name: "Neem Oil Spray", use: "Spray on leaves every 7 days", search: "neem oil spray for plants" },
          { name: "Copper Fungicide Organic", use: "Apply at early signs", search: "copper fungicide organic" },
        ],
        chemical: [
          { name: "Mancozeb 75% WP", use: "Mix 2g/L water, spray weekly", search: "mancozeb 75 wp fungicide" },
          { name: "Chlorothalonil", use: "Apply every 10 days", search: "chlorothalonil fungicide" },
        ],
        preventive: [
          { name: "Trichoderma viride", use: "Soil application to prevent fungal growth", search: "trichoderma viride fungicide" },
        ],
      },
    },
    hindi: {
      description: "अर्ली ब्लाइट एक आम फफूंद रोग है जो Alternaria solani कवक के कारण होता है। यह पहले पुरानी पत्तियों को प्रभावित करता है और यदि समय पर उपचार न किया जाए तो फसल की उपज को गंभीर रूप से कम कर सकता है।",
      causes: [
        "फफूंद: Alternaria solani",
        "गर्म और आर्द्र मौसम (24–29°C)",
        "संक्रमित बीज या पौधे",
        "ऊपर से सिंचाई द्वारा बीजाणुओं का फैलाव",
        "पौधों के बीच खराब वायु संचार",
      ],
      symptoms: [
        "पीले छल्लों के साथ गहरे भूरे गोलाकार धब्बे",
        "धब्बे पहले पुरानी निचली पत्तियों पर दिखाई देते हैं",
        "पत्तियाँ पीली होकर जल्दी गिरती हैं",
        "मिट्टी के पास तने पर घाव",
        "फल पर भी गहरे धँसे हुए धब्बे हो सकते हैं",
      ],
      severity: "मध्यम",
      treatment: [
        "सभी संक्रमित पत्तियों को तुरंत हटाएं और नष्ट करें",
        "Mancozeb 75% WP (2g प्रति लीटर पानी) हर 7 दिन में लगाएं",
        "वैकल्पिक फफूंदनाशक के रूप में Chlorothalonil स्प्रे करें",
        "पत्तियों को गीला करने से बचें — ड्रिप सिंचाई का उपयोग करें",
        "सुरक्षात्मक स्प्रे के रूप में तांबा आधारित फफूंदनाशक लगाएं",
      ],
      prevention: [
        "प्रमाणित रोगमुक्त बीजों का उपयोग करें",
        "अच्छे वायु प्रवाह के लिए उचित पौधा दूरी (45–60 सेमी) बनाए रखें",
        "फसल चक्र अपनाएं — 2–3 वर्षों तक एक ही स्थान पर टमाटर न लगाएं",
        "कटाई के बाद पौधे का मलबा हटाएं",
        "पत्तियों पर मिट्टी के छींटे रोकने के लिए मल्च लगाएं",
        "विशेष रूप से बारिश के बाद पौधों की नियमित निगरानी करें",
      ],
      farmerActions: [
        "लक्षण दिखने के 24–48 घंटों के भीतर उपचार शुरू करें",
        "पत्ती जलने से बचाने के लिए सुबह या शाम में स्प्रे करें",
        "प्रभावी फसल प्रबंधन के लिए स्प्रे कार्यक्रम का रिकॉर्ड रखें",
        "यदि रोग तेजी से फैलता है तो स्थानीय कृषि अधिकारी से सलाह लें",
      ],
      products: {
        organic: [
          { name: "नीम तेल स्प्रे", use: "हर 7 दिन में पत्तियों पर स्प्रे करें", search: "neem oil spray for plants" },
          { name: "जैविक कॉपर फफूंदनाशक", use: "शुरुआती लक्षणों पर लगाएं", search: "copper fungicide organic" },
        ],
        chemical: [
          { name: "Mancozeb 75% WP", use: "2g/L पानी मिलाएं, साप्ताहिक स्प्रे करें", search: "mancozeb 75 wp fungicide" },
          { name: "Chlorothalonil", use: "हर 10 दिन में लगाएं", search: "chlorothalonil fungicide" },
        ],
        preventive: [
          { name: "Trichoderma viride", use: "फफूंद वृद्धि रोकने के लिए मिट्टी में डालें", search: "trichoderma viride fungicide" },
        ],
      },
    },
    kannada: {
      description: "ಅರ್ಲಿ ಬ್ಲೈಟ್ ಒಂದು ಸಾಮಾನ್ಯ ಶಿಲೀಂಧ್ರ ರೋಗವಾಗಿದ್ದು, Alternaria solani ಶಿಲೀಂಧ್ರದಿಂದ ಉಂಟಾಗುತ್ತದೆ. ಇದು ಮೊದಲು ಹಳೆಯ ಎಲೆಗಳ ಮೇಲೆ ಪರಿಣಾಮ ಬೀರುತ್ತದೆ ಮತ್ತು ಸಮಯಕ್ಕೆ ಚಿಕಿತ್ಸೆ ನೀಡದಿದ್ದರೆ ಬೆಳೆ ಇಳುವರಿಯನ್ನು ತೀವ್ರವಾಗಿ ಕಡಿಮೆ ಮಾಡುತ್ತದೆ.",
      causes: [
        "ಶಿಲೀಂಧ್ರ: Alternaria solani",
        "ಬೆಚ್ಚಗಿನ ಮತ್ತು ಆರ್ದ್ರ ವಾತಾವರಣ (24–29°C)",
        "ಸೋಂಕಿತ ಬೀಜಗಳು ಅಥವಾ ಸಸಿಗಳು",
        "ಮೇಲ್ಭಾಗದ ನೀರಾವರಿಯಿಂದ ಬೀಜಾಣುಗಳ ಹರಡುವಿಕೆ",
        "ಗಿಡಗಳ ನಡುವೆ ಕಳಪೆ ಗಾಳಿ ಸಂಚಾರ",
      ],
      symptoms: [
        "ಹಳದಿ ವಲಯಗಳೊಂದಿಗೆ ಗಾಢ ಕಂದು ವೃತ್ತಾಕಾರದ ಚುಕ್ಕೆಗಳು",
        "ಚುಕ್ಕೆಗಳು ಮೊದಲು ಹಳೆಯ ಕೆಳಗಿನ ಎಲೆಗಳ ಮೇಲೆ ಕಾಣಿಸಿಕೊಳ್ಳುತ್ತವೆ",
        "ಎಲೆಗಳು ಹಳದಿ ಬಣ್ಣಕ್ಕೆ ತಿರುಗಿ ಮೊದಲೇ ಉದುರುತ್ತವೆ",
        "ಮಣ್ಣಿನ ರೇಖೆಯ ಬಳಿ ಕಾಂಡದ ಮೇಲೆ ಗಾಯಗಳು",
        "ಹಣ್ಣಿನ ಮೇಲೆಯೂ ಗಾಢ ಕುಳಿಯಾದ ಚುಕ್ಕೆಗಳು ಬೆಳೆಯಬಹುದು",
      ],
      severity: "ಮಧ್ಯಮ",
      treatment: [
        "ಎಲ್ಲಾ ಸೋಂಕಿತ ಎಲೆಗಳನ್ನು ತಕ್ಷಣ ತೆಗೆದು ನಾಶಪಡಿಸಿ",
        "Mancozeb 75% WP (ಪ್ರತಿ ಲೀಟರ್ ನೀರಿಗೆ 2g) ಪ್ರತಿ 7 ದಿನಗಳಿಗೆ ಒಮ್ಮೆ ಸಿಂಪಡಿಸಿ",
        "ಪರ್ಯಾಯ ಶಿಲೀಂಧ್ರನಾಶಕವಾಗಿ Chlorothalonil ಸ್ಪ್ರೇ ಬಳಸಿ",
        "ಎಲೆಗಳನ್ನು ತೇವ ಮಾಡುವುದನ್ನು ತಪ್ಪಿಸಿ — ಮೇಲ್ಭಾಗದ ನೀರಾವರಿ ಬದಲು ತೊಟ್ಟಿ ನೀರಾವರಿ ಬಳಸಿ",
        "ರಕ್ಷಣಾತ್ಮಕ ಸ್ಪ್ರೇಯಾಗಿ ತಾಮ್ರ ಆಧಾರಿತ ಶಿಲೀಂಧ್ರನಾಶಕ ಹಾಕಿ",
      ],
      prevention: [
        "ಪ್ರಮಾಣೀಕೃತ ರೋಗಮುಕ್ತ ಬೀಜಗಳನ್ನು ಬಳಸಿ",
        "ಉತ್ತಮ ಗಾಳಿ ಹರಿವಿಗಾಗಿ ಸರಿಯಾದ ಗಿಡ ಅಂತರ (45–60 ಸೆಂ.ಮೀ) ಕಾಪಾಡಿ",
        "ಬೆಳೆ ಪರಿವರ್ತನೆ ಮಾಡಿ — 2–3 ವರ್ಷ ಒಂದೇ ಸ್ಥಳದಲ್ಲಿ ಟೊಮೇಟೊ ಬೆಳೆಯಬೇಡಿ",
        "ಕೊಯ್ಲಿನ ನಂತರ ಗಿಡದ ತ್ಯಾಜ್ಯ ತೆಗೆದುಹಾಕಿ",
        "ಎಲೆಗಳ ಮೇಲೆ ಮಣ್ಣು ಸಿಡಿಯದಂತೆ ತಡೆಯಲು ಮಲ್ಚ್ ಹಾಕಿ",
        "ವಿಶೇಷವಾಗಿ ಮಳೆಯ ನಂತರ ಗಿಡಗಳನ್ನು ನಿಯಮಿತವಾಗಿ ಗಮನಿಸಿ",
      ],
      farmerActions: [
        "ಲಕ್ಷಣ ಕಂಡ 24–48 ಗಂಟೆಗಳಲ್ಲಿ ಚಿಕಿತ್ಸೆ ಪ್ರಾರಂಭಿಸಿ",
        "ಎಲೆ ಸುಡದಂತೆ ಬೆಳಗ್ಗೆ ಅಥವಾ ಸಂಜೆ ಸ್ಪ್ರೇ ಮಾಡಿ",
        "ಪರಿಣಾಮಕಾರಿ ಬೆಳೆ ನಿರ್ವಹಣೆಗಾಗಿ ಸ್ಪ್ರೇ ವೇಳಾಪಟ್ಟಿ ದಾಖಲಿಸಿ",
        "ರೋಗ ವೇಗವಾಗಿ ಹರಡಿದರೆ ಸ್ಥಳೀಯ ಕೃಷಿ ಅಧಿಕಾರಿಯನ್ನು ಸಂಪರ್ಕಿಸಿ",
      ],
      products: {
        organic: [
          { name: "ಬೇವಿನ ಎಣ್ಣೆ ಸ್ಪ್ರೇ", use: "ಪ್ರತಿ 7 ದಿನಗಳಿಗೊಮ್ಮೆ ಎಲೆಗಳ ಮೇಲೆ ಸಿಂಪಡಿಸಿ", search: "neem oil spray for plants" },
          { name: "ಜೈವಿಕ ತಾಮ್ರ ಶಿಲೀಂಧ್ರನಾಶಕ", use: "ಆರಂಭಿಕ ಲಕ್ಷಣಗಳಲ್ಲಿ ಹಾಕಿ", search: "copper fungicide organic" },
        ],
        chemical: [
          { name: "Mancozeb 75% WP", use: "2g/L ನೀರಿಗೆ ಮಿಶ್ರ ಮಾಡಿ, ವಾರಕ್ಕೊಮ್ಮೆ ಸಿಂಪಡಿಸಿ", search: "mancozeb 75 wp fungicide" },
          { name: "Chlorothalonil", use: "ಪ್ರತಿ 10 ದಿನಗಳಿಗೊಮ್ಮೆ ಹಾಕಿ", search: "chlorothalonil fungicide" },
        ],
        preventive: [
          { name: "Trichoderma viride", use: "ಶಿಲೀಂಧ್ರ ಬೆಳವಣಿಗೆ ತಡೆಯಲು ಮಣ್ಣಿಗೆ ಹಾಕಿ", search: "trichoderma viride fungicide" },
        ],
      },
    },
  },

  // ─────────────────────────────────────────
  // LATE BLIGHT
  // ─────────────────────────────────────────
  "Late Blight": {
    english: {
      description: "Late blight is a destructive water mold disease caused by Phytophthora infestans. It can destroy an entire crop within days in cool, wet conditions. This is the same disease that caused the Irish Potato Famine. It is considered one of the most serious tomato diseases.",
      causes: [
        "Water mold: Phytophthora infestans",
        "Cool and wet weather (10–20°C)",
        "High humidity (above 90%)",
        "Overcrowded plants with poor ventilation",
        "Infected plant material from previous season",
      ],
      symptoms: [
        "Water-soaked, irregular dark green to brown patches on leaves",
        "White powdery mold on the underside of leaves",
        "Brown lesions on stems that girdle and kill branches",
        "Dark brown firm spots on fruit",
        "Entire plant can collapse within days",
      ],
      severity: "Critical",
      treatment: [
        "Immediately remove and bag all infected plant material",
        "Apply Metalaxyl + Mancozeb (2.5g/L) every 5–7 days",
        "Use Cymoxanil 8% + Mancozeb 64% as an alternative",
        "Avoid any overhead irrigation — switch to drip completely",
        "Increase plant spacing if replanting to improve air flow",
      ],
      prevention: [
        "Plant resistant varieties like Arka Rakshak or Pusa Hybrid",
        "Avoid planting in low-lying, poorly drained areas",
        "Never irrigate in the evening — water in the morning only",
        "Apply preventive copper-based sprays before rainy season",
        "Inspect plants twice a week during monsoon season",
        "Destroy all infected plants — do not compost them",
      ],
      farmerActions: [
        "Act immediately — late blight spreads extremely fast",
        "Isolate infected plants to stop spread to healthy ones",
        "Contact local agriculture department for emergency advisory",
        "Do not replant tomatoes in affected area for at least 1 season",
      ],
      products: {
        organic: [
          { name: "Copper Hydroxide", use: "Spray every 5-7 days", search: "copper hydroxide fungicide" },
          { name: "Bacillus subtilis", use: "Biological fungicide, spray weekly", search: "bacillus subtilis biofungicide" },
        ],
        chemical: [
          { name: "Metalaxyl + Mancozeb", use: "Mix 2.5g/L, spray every 7 days", search: "metalaxyl mancozeb fungicide" },
          { name: "Cymoxanil 8% + Mancozeb 64%", use: "Apply at first symptoms", search: "cymoxanil mancozeb fungicide" },
        ],
        preventive: [
          { name: "Potassium Bicarbonate", use: "Preventive spray weekly", search: "potassium bicarbonate fungicide" },
        ],
      },
    },
    hindi: {
      description: "लेट ब्लाइट एक विनाशकारी जल फफूंद रोग है जो Phytophthora infestans के कारण होता है। यह ठंडी और गीली परिस्थितियों में कुछ ही दिनों में पूरी फसल को नष्ट कर सकता है। इसे टमाटर की सबसे गंभीर बीमारियों में से एक माना जाता है।",
      causes: ["जल फफूंद: Phytophthora infestans", "ठंडा और गीला मौसम (10–20°C)", "उच्च आर्द्रता (90% से ऊपर)", "खराब वेंटिलेशन वाले भीड़भाड़ वाले पौधे", "पिछले मौसम की संक्रमित सामग्री"],
      symptoms: ["पत्तियों पर गहरे हरे से भूरे रंग के पानी से भरे अनियमित धब्बे", "पत्तियों के नीचे सफेद पाउडरी फफूंद", "तनों पर भूरे घाव जो शाखाओं को मार देते हैं", "फल पर गहरे भूरे धँसे धब्बे", "पूरा पौधा कुछ ही दिनों में मर सकता है"],
      severity: "गंभीर",
      treatment: ["सभी संक्रमित पौधे सामग्री को तुरंत बैग में बंद करके हटाएं", "Metalaxyl + Mancozeb (2.5g/L) हर 5–7 दिन में लगाएं", "विकल्प के रूप में Cymoxanil 8% + Mancozeb 64% का उपयोग करें", "ऊपर से सिंचाई पूरी तरह बंद करें — ड्रिप पर जाएं", "हवा प्रवाह सुधारने के लिए पौधे की दूरी बढ़ाएं"],
      prevention: ["प्रतिरोधी किस्में जैसे Arka Rakshak लगाएं", "कम भूमि वाले, खराब जल निकासी वाले क्षेत्रों में न लगाएं", "शाम को सिंचाई न करें — केवल सुबह पानी दें", "बारिश के मौसम से पहले निवारक तांबा आधारित स्प्रे करें", "मानसून में सप्ताह में दो बार पौधों का निरीक्षण करें", "संक्रमित पौधों को नष्ट करें — खाद में न डालें"],
      farmerActions: ["तुरंत कार्रवाई करें — लेट ब्लाइट बहुत तेजी से फैलता है", "स्वस्थ पौधों में फैलाव रोकने के लिए संक्रमित पौधे अलग करें", "आपातकालीन सलाह के लिए स्थानीय कृषि विभाग से संपर्क करें", "कम से कम 1 मौसम के लिए प्रभावित क्षेत्र में टमाटर न लगाएं"],
      products: {
        organic: [{ name: "कॉपर हाइड्रॉक्साइड", use: "हर 5-7 दिन में स्प्रे करें", search: "copper hydroxide fungicide" }],
        chemical: [{ name: "Metalaxyl + Mancozeb", use: "2.5g/L मिलाएं, 7 दिन में स्प्रे करें", search: "metalaxyl mancozeb fungicide" }],
        preventive: [{ name: "पोटेशियम बाइकार्बोनेट", use: "साप्ताहिक निवारक स्प्रे", search: "potassium bicarbonate fungicide" }],
      },
    },
    kannada: {
      description: "ಲೇಟ್ ಬ್ಲೈಟ್ Phytophthora infestans ನಿಂದ ಉಂಟಾಗುವ ವಿನಾಶಕಾರಿ ಜಲ ಶಿಲೀಂಧ್ರ ರೋಗ. ತಂಪಾದ ಮತ್ತು ತೇವಾಂಶ ಪರಿಸ್ಥಿತಿಗಳಲ್ಲಿ ಕೆಲವೇ ದಿನಗಳಲ್ಲಿ ಇಡೀ ಬೆಳೆಯನ್ನು ನಾಶ ಮಾಡಬಹುದು. ಇದನ್ನು ಟೊಮೇಟೊಗೆ ಅತ್ಯಂತ ಗಂಭೀರ ರೋಗಗಳಲ್ಲಿ ಒಂದೆಂದು ಪರಿಗಣಿಸಲಾಗಿದೆ.",
      causes: ["ಜಲ ಶಿಲೀಂಧ್ರ: Phytophthora infestans", "ತಂಪಾದ ಮತ್ತು ತೇವ ವಾತಾವರಣ (10–20°C)", "ಹೆಚ್ಚಿನ ಆರ್ದ್ರತೆ (90% ಮೇಲೆ)", "ಕಳಪೆ ವಾಯುಚಲನೆಯ ದಟ್ಟ ಗಿಡಗಳು", "ಹಿಂದಿನ ಋತುವಿನ ಸೋಂಕಿತ ಸಸ್ಯ ಸಾಮಗ್ರಿ"],
      symptoms: ["ಎಲೆಗಳ ಮೇಲೆ ನೀರು ನೆನೆದ ಅನಿಯಮಿತ ಗಾಢ ಹಸಿರು ಚುಕ್ಕೆಗಳು", "ಎಲೆಗಳ ಕೆಳಭಾಗದಲ್ಲಿ ಬಿಳಿ ಪೌಡರ್ ಶಿಲೀಂಧ್ರ", "ಕಾಂಡಗಳ ಮೇಲೆ ಕಂದು ಗಾಯಗಳು", "ಹಣ್ಣಿನ ಮೇಲೆ ಗಾಢ ಕಂದು ಗಟ್ಟಿ ಚುಕ್ಕೆಗಳು", "ಇಡೀ ಗಿಡ ಕೆಲವೇ ದಿನಗಳಲ್ಲಿ ಸಾಯಬಹುದು"],
      severity: "ಗಂಭೀರ",
      treatment: ["ಎಲ್ಲಾ ಸೋಂಕಿತ ಸಸ್ಯ ಸಾಮಗ್ರಿ ತಕ್ಷಣ ಚೀಲದಲ್ಲಿ ಹಾಕಿ ತೆಗೆದು ಹಾಕಿ", "Metalaxyl + Mancozeb (2.5g/L) ಪ್ರತಿ 5–7 ದಿನಗಳಿಗೆ ಹಾಕಿ", "ಪರ್ಯಾಯವಾಗಿ Cymoxanil 8% + Mancozeb 64% ಬಳಸಿ", "ಮೇಲ್ಭಾಗದ ನೀರಾವರಿ ಸಂಪೂರ್ಣ ನಿಲ್ಲಿಸಿ", "ಗಾಳಿ ಹರಿವು ಸುಧಾರಿಸಲು ಗಿಡ ಅಂತರ ಹೆಚ್ಚಿಸಿ"],
      prevention: ["Arka Rakshak ನಂತಹ ನಿರೋಧಕ ತಳಿಗಳನ್ನು ನೆಡಿ", "ಕಡಿಮೆ ಭೂಮಿ ಅಥವಾ ಕಳಪೆ ನೀರು ಬಸಿಯುವ ಪ್ರದೇಶದಲ್ಲಿ ನೆಡಬೇಡಿ", "ಸಂಜೆ ನೀರು ಹಾಕಬೇಡಿ — ಬೆಳಗ್ಗೆ ಮಾತ್ರ ನೀರು ಕೊಡಿ", "ಮಳೆಗಾಲ ಮೊದಲು ತಾಮ್ರ ಆಧಾರಿತ ಸ್ಪ್ರೇ ಮಾಡಿ", "ಮಾನ್ಸೂನ್‌ನಲ್ಲಿ ವಾರಕ್ಕೆ ಎರಡು ಬಾರಿ ಗಿಡ ಪರೀಕ್ಷಿಸಿ", "ಸೋಂಕಿತ ಗಿಡ ನಾಶ ಮಾಡಿ — ಗೊಬ್ಬರ ಗುಂಡಿಗೆ ಹಾಕಬೇಡಿ"],
      farmerActions: ["ತಕ್ಷಣ ಕ್ರಮ ತೆಗೆದುಕೊಳ್ಳಿ — ಲೇಟ್ ಬ್ಲೈಟ್ ಬಹಳ ವೇಗವಾಗಿ ಹರಡುತ್ತದೆ", "ಸ್ವಸ್ಥ ಗಿಡಗಳಿಗೆ ಹರಡದಂತೆ ಸೋಂಕಿತ ಗಿಡ ಪ್ರತ್ಯೇಕಿಸಿ", "ತುರ್ತು ಸಲಹೆಗಾಗಿ ಸ್ಥಳೀಯ ಕೃಷಿ ಇಲಾಖೆ ಸಂಪರ್ಕಿಸಿ", "ಕನಿಷ್ಠ 1 ಋತು ಪ್ರಭಾವಿತ ಪ್ರದೇಶದಲ್ಲಿ ಟೊಮೇಟೊ ನೆಡಬೇಡಿ"],
      products: {
        organic: [{ name: "ತಾಮ್ರ ಹೈಡ್ರಾಕ್ಸೈಡ್", use: "ಪ್ರತಿ 5-7 ದಿನಗಳಿಗೊಮ್ಮೆ ಸಿಂಪಡಿಸಿ", search: "copper hydroxide fungicide" }],
        chemical: [{ name: "Metalaxyl + Mancozeb", use: "2.5g/L ಮಿಶ್ರ ಮಾಡಿ, 7 ದಿನಕ್ಕೊಮ್ಮೆ ಸಿಂಪಡಿಸಿ", search: "metalaxyl mancozeb fungicide" }],
        preventive: [{ name: "ಪೊಟ್ಯಾಸಿಯಮ್ ಬೈಕಾರ್ಬೊನೇಟ್", use: "ವಾರಕ್ಕೊಮ್ಮೆ ತಡೆಗಟ್ಟುವ ಸ್ಪ್ರೇ", search: "potassium bicarbonate fungicide" }],
      },
    },
  },

  // ─────────────────────────────────────────
  // HEALTHY
  // ─────────────────────────────────────────
  "Healthy": {
    english: {
      description: "Your tomato plant appears healthy! No signs of disease were detected. Continue your current care routine to maintain plant health and maximize yield.",
      causes: [],
      symptoms: ["No disease symptoms detected", "Leaves appear green and healthy", "Normal plant growth observed"],
      severity: "None",
      treatment: ["No treatment required", "Continue regular watering schedule", "Maintain balanced fertilization"],
      prevention: [
        "Continue regular monitoring every 3–4 days",
        "Maintain proper spacing for air circulation",
        "Use drip irrigation to keep leaves dry",
        "Apply preventive neem oil spray monthly",
        "Keep the field clean and weed-free",
      ],
      farmerActions: [
        "Keep monitoring regularly to catch any early signs",
        "Maintain soil nutrition with balanced NPK fertilizers",
        "Record plant growth and yield for future reference",
      ],
      products: {
        organic: [{ name: "Neem Oil (Preventive)", use: "Spray monthly to prevent disease", search: "neem oil preventive spray" }],
        chemical: [],
        preventive: [{ name: "Trichoderma viride", use: "Soil application for prevention", search: "trichoderma viride" }],
      },
    },
    hindi: {
      description: "आपका टमाटर का पौधा स्वस्थ दिखता है! कोई रोग के लक्षण नहीं मिले। पौधे की सेहत बनाए रखने और उपज बढ़ाने के लिए अपनी वर्तमान देखभाल जारी रखें।",
      causes: [],
      symptoms: ["कोई रोग लक्षण नहीं", "पत्तियाँ हरी और स्वस्थ दिखती हैं", "सामान्य पौधे की वृद्धि"],
      severity: "कोई नहीं",
      treatment: ["कोई उपचार आवश्यक नहीं", "नियमित सिंचाई जारी रखें", "संतुलित उर्वरक बनाए रखें"],
      prevention: ["हर 3–4 दिन में नियमित निगरानी जारी रखें", "वायु संचार के लिए उचित दूरी बनाए रखें", "पत्तियाँ सूखी रखने के लिए ड्रिप सिंचाई का उपयोग करें", "मासिक निवारक नीम तेल स्प्रे करें", "खेत साफ और खरपतवार मुक्त रखें"],
      farmerActions: ["कोई भी शुरुआती संकेत पकड़ने के लिए नियमित निगरानी करते रहें", "संतुलित NPK उर्वरकों से मिट्टी का पोषण बनाए रखें", "भविष्य के संदर्भ के लिए पौधे की वृद्धि और उपज दर्ज करें"],
      products: {
        organic: [{ name: "नीम तेल (निवारक)", use: "रोग रोकने के लिए मासिक स्प्रे करें", search: "neem oil preventive spray" }],
        chemical: [],
        preventive: [{ name: "Trichoderma viride", use: "निवारण के लिए मिट्टी में डालें", search: "trichoderma viride" }],
      },
    },
    kannada: {
      description: "ನಿಮ್ಮ ಟೊಮೇಟೊ ಗಿಡ ಆರೋಗ್ಯವಾಗಿ ಕಾಣುತ್ತಿದೆ! ಯಾವುದೇ ರೋಗದ ಲಕ್ಷಣ ಕಂಡುಬಂದಿಲ್ಲ. ಗಿಡದ ಆರೋಗ್ಯ ಕಾಪಾಡಲು ಮತ್ತು ಇಳುವರಿ ಹೆಚ್ಚಿಸಲು ನಿಮ್ಮ ಪ್ರಸ್ತುತ ಆರೈಕೆ ಮುಂದುವರಿಸಿ.",
      causes: [],
      symptoms: ["ಯಾವುದೇ ರೋಗ ಲಕ್ಷಣಗಳಿಲ್ಲ", "ಎಲೆಗಳು ಹಸಿರಾಗಿ ಮತ್ತು ಆರೋಗ್ಯಕರವಾಗಿ ಕಾಣುತ್ತಿವೆ", "ಸಾಮಾನ್ಯ ಗಿಡ ಬೆಳವಣಿಗೆ"],
      severity: "ಯಾವುದೂ ಇಲ್ಲ",
      treatment: ["ಯಾವುದೇ ಚಿಕಿತ್ಸೆ ಅಗತ್ಯವಿಲ್ಲ", "ನಿಯಮಿತ ನೀರಾವರಿ ಮುಂದುವರಿಸಿ", "ಸಮತೋಲಿತ ಗೊಬ್ಬರ ನೀಡಿ"],
      prevention: ["ಪ್ರತಿ 3–4 ದಿನಗಳಿಗೊಮ್ಮೆ ನಿಯಮಿತ ಮೇಲ್ವಿಚಾರಣೆ ಮುಂದುವರಿಸಿ", "ಗಾಳಿ ಸಂಚಾರಕ್ಕಾಗಿ ಸರಿಯಾದ ಅಂತರ ಕಾಪಾಡಿ", "ಎಲೆ ಒಣಗಿಸಲು ತೊಟ್ಟಿ ನೀರಾವರಿ ಬಳಸಿ", "ತಿಂಗಳಿಗೊಮ್ಮೆ ತಡೆಗಟ್ಟುವ ಬೇವಿನ ಎಣ್ಣೆ ಸ್ಪ್ರೇ ಮಾಡಿ", "ಹೊಲ ಸ್ವಚ್ಛ ಮತ್ತು ಕಳೆ ಮುಕ್ತವಾಗಿ ಇಡಿ"],
      farmerActions: ["ಆರಂಭಿಕ ಲಕ್ಷಣ ಪತ್ತೆಹಚ್ಚಲು ನಿಯಮಿತ ಮೇಲ್ವಿಚಾರಣೆ ಮಾಡಿ", "ಸಮತೋಲಿತ NPK ಗೊಬ್ಬರದಿಂದ ಮಣ್ಣಿನ ಪೋಷಣೆ ಕಾಪಾಡಿ", "ಭವಿಷ್ಯದ ಉಲ್ಲೇಖಕ್ಕಾಗಿ ಗಿಡ ಬೆಳವಣಿಗೆ ಮತ್ತು ಇಳುವರಿ ದಾಖಲಿಸಿ"],
      products: {
        organic: [{ name: "ಬೇವಿನ ಎಣ್ಣೆ (ತಡೆಗಟ್ಟುವ)", use: "ರೋಗ ತಡೆಗಟ್ಟಲು ತಿಂಗಳಿಗೊಮ್ಮೆ ಸಿಂಪಡಿಸಿ", search: "neem oil preventive spray" }],
        chemical: [],
        preventive: [{ name: "Trichoderma viride", use: "ತಡೆಗಟ್ಟುವಿಕೆಗಾಗಿ ಮಣ್ಣಿಗೆ ಹಾಕಿ", search: "trichoderma viride" }],
      },
    },
  },
}

// Helper: get disease data for detected disease name + language
export function getDiseaseData(diseaseName, language = "english") {
  const key = Object.keys(diseaseData).find(k =>
    diseaseName?.toLowerCase().includes(k.toLowerCase())
  )
  if (!key) return null
  const lang = diseaseData[key][language] || diseaseData[key]["english"]
  return { key, ...lang }
}

export default diseaseData
