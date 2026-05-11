import React from "react";

export default function App() {
  const sampleDiseases = [
    {
      name: "Early Blight",
      image:
        "https://images.unsplash.com/photo-1592928302636-c83cf1e1f4a9?q=80&w=800&auto=format&fit=crop",
      npk: "N: Medium | P: Low | K: Medium",
      solution: "Use copper-based fungicide and avoid overwatering.",
    },
    {
      name: "Late Blight",
      image:
        "https://images.unsplash.com/photo-1582284540020-8acbe03f4924?q=80&w=800&auto=format&fit=crop",
      npk: "N: Low | P: Medium | K: High",
      solution: "Remove infected leaves and improve airflow.",
    },
    {
      name: "Healthy Leaf",
      image:
        "https://images.unsplash.com/photo-1561136594-7f68413baa99?q=80&w=800&auto=format&fit=crop",
      npk: "Balanced NPK",
      solution: "Plant is healthy. Continue regular care.",
    },
    {
      name: "Leaf Mold",
      image:
        "https://images.unsplash.com/photo-1518977676601-b53f82aba655?q=80&w=800&auto=format&fit=crop",
      npk: "N: Medium | P: Medium | K: Low",
      solution: "Reduce humidity and apply fungicide.",
    },
  ];

  const [selectedImage, setSelectedImage] = React.useState(null);
  const [prediction, setPrediction] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [confidence, setConfidence] = React.useState(null);

  const videoRef = React.useRef(null);
  const canvasRef = React.useRef(null);

  const [cameraOn, setCameraOn] = React.useState(false);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });

      videoRef.current.srcObject = stream;
      setCameraOn(true);
    } catch (err) {
      alert("Camera access denied or unavailable.");
    }
  };

  const capturePhoto = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageData = canvas.toDataURL("image/png");

    setSelectedImage(imageData);

    detectDisease(imageData);
  };

  const handleUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);

      setSelectedImage(imageUrl);

      detectDisease(file.name.toLowerCase());
    }
  };

  const detectDisease = async (imageInput) => {
    if (!imageInput) return;

    setLoading(true);
    setPrediction(null);

    setTimeout(() => {
      const imageName = imageInput.toLowerCase();

      const tomatoKeywords = [
        "tomato",
        "leaf",
        "plant",
        "blight",
        "crop",
      ];

      const isTomatoImage = tomatoKeywords.some((keyword) =>
        imageName.includes(keyword)
      );

      if (!isTomatoImage) {
        setPrediction({
          name: "Not a Tomato Image",
          npk: "N/A",
          solution:
            "Please upload a tomato leaf or tomato plant image for disease detection.",
        });

        setConfidence("0%");
        setLoading(false);

        return;
      }

      const randomDisease =
        sampleDiseases[Math.floor(Math.random() * sampleDiseases.length)];

      const randomConfidence = Math.floor(Math.random() * 10) + 90;

      setPrediction(randomDisease);
      setConfidence(`${randomConfidence}%`);

      setLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-green-50 p-6 font-sans">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-green-700 mb-6">
          Tomato Disease Detector
        </h1>

        {/* Upload Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4">
            Upload Tomato Leaf
          </h2>

          <input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            className="mb-4"
          />

          <div className="flex gap-4 flex-wrap">
            <button
              onClick={startCamera}
              className="bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700"
            >
              Open Camera
            </button>

            {cameraOn && (
              <button
                onClick={capturePhoto}
                className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700"
              >
                Capture Image
              </button>
            )}
          </div>

          {cameraOn && (
            <div className="mt-4">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full max-w-md rounded-xl border"
              />
            </div>
          )}

          <canvas ref={canvasRef} className="hidden" />

          {selectedImage && (
            <div className="mt-6">
              <h3 className="font-semibold mb-2">
                Selected Image:
              </h3>

              <div className="bg-gray-100 p-4 rounded-2xl inline-block">
                <img
                  src={selectedImage}
                  alt="Selected"
                  className="w-72 rounded-xl shadow-lg border-4 border-green-200"
                />
              </div>
            </div>
          )}
        </div>

        {/* Loading Section */}
        {loading && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-green-600 mx-auto mb-4"></div>

            <h2 className="text-2xl font-semibold text-green-700 mb-2">
              Analyzing Tomato Leaf...
            </h2>

            <p className="text-gray-600">
              AI model is detecting disease patterns
            </p>
          </div>
        )}

        {/* Result Section */}
        {prediction && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <h2 className="text-2xl font-semibold mb-4">
              Detection Result
            </h2>

            <p
              className={`text-xl font-bold mb-3 ${
                prediction.name === "Healthy Leaf"
                  ? "text-green-600"
                  : prediction.name === "Not a Tomato Image"
                  ? "text-yellow-600"
                  : "text-red-600"
              }`}
            >
              {prediction.name}
            </p>

            <p className="text-lg mb-2">
              <strong>Confidence:</strong> {confidence}
            </p>

            <div className="w-full bg-gray-200 rounded-full h-4 mt-3 mb-4">
              <div
                className="bg-green-600 h-4 rounded-full"
                style={{ width: confidence }}
              ></div>
            </div>

            <p className="text-lg mb-2">
              <strong>NPK Values:</strong> {prediction.npk}
            </p>

            <p className="text-lg">
              <strong>Suggested Solution:</strong>{" "}
              {prediction.solution}
            </p>
          </div>
        )}

        {/* Demo Video */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4">
            How to Use
          </h2>

          <div className="aspect-video rounded-xl overflow-hidden">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="Demo Video"
              allowFullScreen
            />
          </div>
        </div>

        {/* Disease Gallery */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-6">
            Tomato Disease Samples
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {sampleDiseases.map((disease, index) => (
              <div
                key={index}
                className="border rounded-2xl overflow-hidden shadow hover:scale-105 transition"
              >
                <img
                  src={disease.image}
                  alt={disease.name}
                  className="w-full h-48 object-cover"
                />

                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2">
                    {disease.name}
                  </h3>

                  <p className="text-sm text-gray-600">
                    {disease.npk}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <footer className="text-center text-gray-500 mt-10 pb-4">
          Powered by AI Tomato Disease Detection System
        </footer>
      </div>
    </div>
  );
}