const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { GoogleGenAI } = require("@google/genai");
const mongoose = require("mongoose");
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.log(err));

app.use("/api/auth", require("./routes/auth"));

app.get("/", (req, res) => {
  res.send("API running");
});


const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});


app.post("/chat", async (req, res) => {
  try {
    console.log("📩 Incoming body:", req.body);

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: req.body.message,
    });

    console.log("🧠 Gemini raw response object:", response);

    const reply = response.text;

    console.log("✅ Sending reply to frontend:", reply);

    res.status(200).json({ reply });

  } catch (err) {
    console.error("❌ Backend error:", err);
    res.status(500).json({ reply: "AI error" });
  }
});




app.listen(5000, () => {
  console.log("🚀 Server running on port 5000");
});
