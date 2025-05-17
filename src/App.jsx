import React, { useState } from "react";
import "./App.css";

function App() {
  const [topic, setTopic] = useState("");
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);

  const HUGGINGFACE_API = "https://api-inference.huggingface.co/models/facebook/bart-large-cnn";
  const API_KEY = "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"; // 

  const generateCards = async () => {
    setLoading(true);
    setCards([]);

    const response = await fetch(HUGGINGFACE_API, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        inputs: `Explain the topic: ${topic}`
      })
    });

    const data = await response.json();
    if (data.error) {
      alert("API Error: " + data.error);
      setLoading(false);
      return;
    }

    const summary = data[0]?.summary_text || "";
    const splitPoints = summary.split(/\. |\n/g).filter(Boolean);

    setCards(splitPoints);
    setLoading(false);
  };

  return (
    <div className="App" style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
      <h1>🧠 AI Flashcard Generator</h1>
      <input
        type="text"
        placeholder="Enter a topic (e.g. photosynthesis)"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        style={{ width: "100%", padding: 10 }}
      />
      <button onClick={generateCards} disabled={loading} style={{ marginTop: 10 }}>
        {loading ? "Generating..." : "Generate Flashcards"}
      </button>

      <div style={{ marginTop: 20 }}>
        {cards.map((card, i) => (
          <div key={i} style={{
            border: "1px solid #ccc",
            padding: 15,
            marginBottom: 10,
            borderRadius: 10
          }}>
            <strong>Flashcard {i + 1}</strong><br />
            {card}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
