import Groq from "groq-sdk";
import { NextResponse } from "next/server";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: "Message is required." },
        { status: 400 }
      );
    }

        const completion = await groq.chat.completions.create({
    model: "openai/gpt-oss-120b",
    messages: [
        {
          role: "system",
          content:
            "You are a paramedic education assistant. Provide clear, educational decision-support information. Do not present yourself as a replacement for medical direction, local protocols, or professional training.",
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

    const response =
      completion.choices[0]?.message?.content ||
      "I wasn't able to generate a response.";

    return NextResponse.json({ response });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}