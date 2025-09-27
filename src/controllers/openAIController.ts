import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import OpenAI from "openai";

const openAIController = asyncHandler(async (req: Request, res: Response) => {
  if (!req.body.prompt) {
    res.status(400).json({ message: "El Prompt está vacío o no es válido" });
    return;
  }

  // VERIFICACIÓN DE LA API KEY
  if (!process.env.OPENAI_API_KEY) {
    res.status(500).json({
      success: false,
      error: "Configuración incompleta",
      message: "La API Key de OpenAI no está configurada. Verifica el archivo .env"
    });
    return;
  }

  try {
    const { prompt } = req.body;

    // INICIALIZAR CLIENTE OPENAI
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 1000,
      temperature: 0.7,
    });

    res.status(200).json({
      success: true,
      content: response.choices[0]?.message?.content,
      usage: response.usage,
      model: response.model,
    });

  } catch (error: any) {
    console.error("Error con OpenAI:", error);

    if (error?.status === 401) {
      res.status(401).json({
        success: false,
        error: "API Key inválida",
        message: "La clave API no es válida. Verifica tu OPENAI_API_KEY"
      });
      return;
    }

    res.status(500).json({
      success: false,
      error: "Error interno",
      message: error.message || "Error desconocido"
    });
  }
});

export default openAIController;