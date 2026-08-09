import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-3-flash-preview",
    });

    const { message, history } = await req.json();

    const validHistory =
      history?.length > 0 && history[0].role === "user" ? history : [];

    const chat = model.startChat({
      history: validHistory,
      generationConfig: { maxOutputTokens: 500 },
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ text });
  } catch (error) {
    console.error("Chat API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch response" },
      { status: 500 },
    );
  }
}
