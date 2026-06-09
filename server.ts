import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

// Middleware for parsing JSON
app.use(express.json());

// Lazy-initialized Gemini client to prevent crashes if key is omitted on boot
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is required. Please set it in Settings > Secrets.");
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// REST helper to check if Gemini API secret is available
app.get("/api/config", (req, res) => {
  res.json({
    hasGeminiKey: !!process.env.GEMINI_API_KEY,
  });
});

// Full-fledged AI Bike customization endpoint powered by Gemini 3.5 Flash
app.post("/api/customize", async (req, res) => {
  try {
    const { ridingStyle, performanceTier, designNotes } = req.body;
    
    if (!ridingStyle || !performanceTier) {
      res.status(400).json({ error: "Riding style and performance tier are required." });
      return;
    }

    const ai = getGeminiClient();
    const prompt = `Design a premium futuristic aero bicycle configuration based on the client's profiling:
    - Target Riding Style/Terrains: "${ridingStyle}"
    - Performance Class requested: "${performanceTier}"
    - Bespoke Aesthetics/Requirements: "${designNotes || "None provided"}"

    Your task is to choose the most suitable chassis from our base models:
    - "Cruxon Model A" (Ultimate solid disk aerodynamic racing track bicycle, stealth carbon/copper, ultra high-speed)
    - "Cruxon Model S" (Elegant urban hubless lightweight future frame, silver/neon cyan glow, highly agile)
    - "Cruxon Model D" (Aggressive composite tri-spoke adventure/commuter aero endurance build, deep gunmetal/bronze)

    Recommend the exact model matching their style, explain the precise technical engineering justification with premium phrasing, suggest a gorgeous customized composite accent palette, optimal futuristic gearing ratio, precise frame weight optimization based on tier, and custom active wheel-hub LED mode.

    Format the final response strictly in JSON matching this schema:
    {
      "modelRecommendation": "Cruxon Model A" | "Cruxon Model S" | "Cruxon Model D",
      "modelReasoning": "Technical engineering reason demonstrating high craft and futuristic utility.",
      "customAccents": "Visual paint palette suggestion (e.g. Copper Core & Matte Void Slate) with a brief aesthetic reason.",
      "gearRatio": "Scientific composite gear spec (e.g., Electro-Continuum Hub with 54T Aero Sprocket)",
      "weightSavings": "Mass reduction metric (e.g. -145g saved via customized layered resin lay-up)",
      "laserGlowMode": "LED neon ring mode (e.g. Hyper-reactive Cyan Pulse across disk edges)",
      "estimatedBuildWeeks": 3 | 4 | 5
    }
    
    Provide only raw valid stringified JSON. No Markdown block backticks, comments, or extra wrapping.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const textOutput = response.text;
    if (!textOutput) {
      throw new Error("No response content generated from Gemini.");
    }

    // Attempt to parse text in case of potential wrapping issues
    const cleanJson = textOutput.replace(/```json/g, "").replace(/```/g, "").trim();
    const data = JSON.parse(cleanJson);
    res.json(data);
  } catch (error: any) {
    console.error("Gemini customization endpoint error:", error);
    res.status(500).json({ 
      error: "AI Customization Engine failed", 
      message: error.message || "An error occurred with the Gemini API." 
    });
  }
});

// Configure Vite Dev Middleware or Static File Serving
async function initServer() {
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[FTR Server] Active on port ${PORT} with environment ${process.env.NODE_ENV || "development"}`);
  });
}

initServer();
