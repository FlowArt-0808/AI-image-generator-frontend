import { NextResponse } from "next/server";
import { getHfClient } from "@/lib/server/hfClient";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const hfClient = getHfClient();
    const body = (await request.json()) as { chat?: string };
    const chat = typeof body.chat === "string" ? body.chat.trim() : "";

    if (!chat) {
      return NextResponse.json(
        { success: false, message: "Chat field is required" },
        { status: 400 }
      );
    }

    const result = await hfClient.chatCompletion({
      model: "openai/gpt-oss-20b:groq",
      messages: [{ role: "user", content: chat }],
    });

    return NextResponse.json({
      success: true,
      message: result.choices[0].message.content,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Error processing chat";
    return NextResponse.json(
      { success: false, message: `Error processing chat: ${message}` },
      { status: 500 }
    );
  }
}
