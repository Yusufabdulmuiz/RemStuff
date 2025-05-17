import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Grid,
} from "@mui/material";

const App = () => {
  const [topic, setTopic] = useState("");
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);

  const HUGGINGFACE_API = "https://api-inference.huggingface.co/models/facebook/bart-large-cnn";
  const API_KEY = process.env.REACT_APP_HUGGINGFACE_API_KEY;

  const generateCards = async () => {
    setLoading(true);
    setCards([]);

    try {
      const response = await fetch(HUGGINGFACE_API, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          inputs: `Explain the topic: ${topic}`
        })
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
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{
          fontWeight: 700,
          textAlign: "center",
          color: "primary.main",
        }}
      >
        🧠 AI Flashcard Generator
      </Typography>

      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} md={8}>
          <TextField
            fullWidth
            variant="outlined"
            label="Enter a topic"
            placeholder="e.g. Photosynthesis"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            sx={{ mb: 2 }}
            onKeyPress={(e) => e.key === "Enter" && generateCards()}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <Button
            fullWidth
            variant="contained"
            onClick={generateCards}
            disabled={loading}
            sx={{ height: "56px" }}
          >
            {loading ? (
              <CircularProgress size={24} sx={{ color: "white" }} />
            ) : (
              "Generate Flashcards"
            )}
          </Button>
        </Grid>
      </Grid>

      <Grid container spacing={2} sx={{ mt: 2 }}>
        {cards.map((card, i) => (
          <Grid item xs={12} sm={6} md={4} key={i}>
            <Card
              sx={{
                height: "100%",
                transition: "transform 0.2s",
                "&:hover": { transform: "scale(1.02)" }
              }}
            >
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary">
                  Flashcard {i + 1}
                </Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>
                  {card}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default App;
              
