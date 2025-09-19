import axios from "axios";
import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import OpenAI from "openai";

const openaiClient = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const openAIController = asyncHandler(async (req: Request, res: Response) => {
  if (!req.headers.authorization) {
    res.status(401).json("No autorizado");
  }

  if (!req.body.prompt) {
    res.status(400).json({ message: "El Prompt esta vacio o no es valido" });
    return;
  }

  console.log(process.env.OPENAI_API_KEY);
  try {
    // 1. Validar entrada o prompt
    const { prompt } = req.body;
    // 2. Llamar a la API de OpenAI
    // const openAIResponse = await axios.post(
    //   "https://api.openai.com/v1/chat/completions",
    //   {
    //     model: "gpt-3.5-turbo",
    //     messages: [{ role: "user", content: prompt }],
    //     max_tokens: 10, // Limitar la respuesta a 10 tokens para probary evitar costos
    //   },
    //   {
    //     headers: {
    //       Autohrization: `Bearer ${process.env.OPENAI_API_KEY}`,
    //       "Content-Type": "application/json",
    //     },
    //   }
    // );

    const openAIResponse = await openaiClient.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 10, // Limitar la respuesta a 10 tokens para probar y evitar costos
    });

    // 3. Procesar respuesta
    console.log(openAIResponse);
    // const generatedText = openAIResponse.data.choices[0]?.message?.content;

    // 4. Enviar respuesta de exito al cliente
    res.status(200).json({
      success: true,
      content: openAIResponse.choices[0]?.message?.content,
      usage: openAIResponse.usage,
    });
  } catch (error) {
    // 6. Manejo granular de errores de OpenAI
    console.log(openAIController);
    res.status(500).json(`Error al comunicarse con la API de OpenAI: ${error}`);
    return;
  }
});

export default openAIController;
