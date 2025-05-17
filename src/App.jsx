import React, { useState } from "react";

const HUGGINGFACE_API = "https://api-inference.huggingface.co/models/deepseek-ai/DeepSeek-R1-Distill-Qwen-1.5B";
const API_KEY = import.meta.env.VITE_HUGGINGFACE_API_KEY;

const App = () => {
  const [topic, setTopic] = useState("");
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);

  const generateCards = async () => {
    setLoading(true);
    setCards([]);

    try {
      const response = await fetch(HUGGINGFACE_API, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: `Explain the topic: ${topic}`,
        }),
      });

      const data = await response.json();
      if (data.error) {
        alert("API Error: " + data.error);
        return;
      }

      const summary = data[0]?.summary_text || "";
      const splitPoints = summary.split(/\. |\n/g).filter(Boolean);
      setCards(splitPoints);
    } catch (error) {
      alert("Request failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "2rem" }}>
      <h1 style={{ textAlign: "center", color: "#333" }}>🧠 AI Flashcard Generator</h1>

      <div style={{ marginTop: "1rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter a topic (e.g. Photosynthesis)"
          style={{ padding: "0.75rem", fontSize: "1rem", width: "100%" }}
          onKeyDown={(e) => e.key === "Enter" && generateCards()}
        />

        <button
          onClick={generateCards}
          disabled={loading}
          style={{
            padding: "0.75rem",
            fontSize: "1rem",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          {loading ? "Generating..." : "Generate Flashcards"}
        </button>
      </div>

      <div
        style={{
          marginTop: "2rem",
          display: "grid",
          gap: "1rem",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        }}
      >
        {cards.map((card, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "1rem",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            <h4 style={{ margin: "0 0 0.5rem" }}>Flashcard {index + 1}</h4>
            <p>{card}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
