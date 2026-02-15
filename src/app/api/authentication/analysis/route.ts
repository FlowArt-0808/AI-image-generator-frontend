import { NextResponse } from "next/server";
import { getHfClient } from "@/lib/server/hfClient";

export const runtime = "nodejs";

const VISION_MODELS = [
  "CohereLabs/aya-vision-32b:cohere",
  "meta-llama/Llama-3.2-11B-Vision-Instruct:fireworks-ai",
  "Qwen/Qwen2.5-VL-7B-Instruct:nebius",
];

const PROMPT = `Analyze this food image.
Return concise plain text with exactly these headings:
Food:
Visible Ingredients:
Possible Hidden Ingredients:
Nutrition Note:`;

const toDataUrl = (image: unknown) => {
  if (typeof image !== "string" || image.trim().length === 0) {
    throw new Error("Image field is required");
  }
  if (image.startsWith("data:image")) {
    return image;
  }
  return `data:image/jpeg;base64,${image}`;
};

const analyzeWithFallbackModels = async (imageUrl: string) => {
  const hfClient = getHfClient();
  let lastError: unknown;
  for (const model of VISION_MODELS) {
    try {
      const response = await hfClient.chatCompletion({
        model,
        messages: [
          {
            role: "user",
            content: [
              { type: "text", text: PROMPT },
              { type: "image_url", image_url: { url: imageUrl } },
            ],
          },
        ],
      });
      const message = response.choices[0]?.message?.content;
      if (typeof message === "string" && message.trim().length > 0) {
        return message;
      }
    } catch (error) {
      lastError = error;
    }
  }
  throw lastError || new Error("No available vision model for analysis");
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { image?: string };
    const analysis = await analyzeWithFallbackModels(toDataUrl(body.image));

    return NextResponse.json({ success: true, message: analysis });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Image analysis failed";
    return NextResponse.json(
      { success: false, message: `Error processing image analysis: ${message}` },
      { status: 500 }
    );
  }
}
