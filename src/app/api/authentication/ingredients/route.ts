import { NextResponse } from "next/server";
import { getHfClient } from "@/lib/server/hfClient";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const hfClient = getHfClient();
    const body = (await request.json()) as { contents?: string };
    const contents =
      typeof body.contents === "string" ? body.contents.trim() : "";

    if (!contents) {
      return NextResponse.json(
        { success: false, message: "Contents field is required" },
        { status: 400 }
      );
    }

    const prompt = `Extract only food ingredients from this text: "${contents}".
Rules:
- If food names are present, infer likely ingredients.
- Ignore non-food nouns and unrelated words.
- Return only bullet list lines starting with "- ".
- No intro or explanation.`;

    const result = await hfClient.chatCompletion({
      model: "openai/gpt-oss-20b:groq",
      messages: [{ role: "user", content: prompt }],
    });

    return NextResponse.json({
      success: true,
      message: result.choices[0].message.content,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Error processing ingredients";
    return NextResponse.json(
      { success: false, message: `Error processing ingredients: ${message}` },
      { status: 500 }
    );
  }
}
