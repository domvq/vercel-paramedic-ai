
import Groq from "groq-sdk";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

function loadKnowledge() {
  const knowledgePath = path.join(process.cwd(), "processed");

  if (!fs.existsSync(knowledgePath)) {
    return "";
  }

  const files = fs
    .readdirSync(knowledgePath)
    .filter((file) => file.endsWith(".txt"));

  return files
    .map((file) => {
      const filePath = path.join(knowledgePath, file);
      const content = fs.readFileSync(filePath, "utf8");

      return `\n--- ${file} ---\n${content}`;
    })
    .join("\n");
}

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: "Message is required." },
        { status: 400 }
      );
    }

    const knowledge = loadKnowledge();

    const completion = await groq.chat.completions.create({
      model: "openai/gpt-oss-120b",
      messages: [
        {
          role: "system",
          content: `You are a paramedic education assistant.

Use the provided paramedic reference material as your primary knowledge source.

Provide clear, educational decision-support information. Do not present yourself as a replacement for medical direction, local protocols, or professional training.

If the provided reference material does not contain enough information to answer a question, say so rather than inventing a specific protocol.

REFERENCE MATERIAL:
${knowledge}`,
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
