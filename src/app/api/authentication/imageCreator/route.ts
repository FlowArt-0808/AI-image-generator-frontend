import { NextResponse } from "next/server";
import { getHfClient } from "@/lib/server/hfClient";

export const runtime = "nodejs";

const generateImage = async (prompt: string) => {
  const hfClient = getHfClient();
  const attempts = [
    { model: "black-forest-labs/FLUX.1-schnell", provider: "nebius" as const },
    { model: "stabilityai/stable-diffusion-xl-base-1.0" },
  ];

  let lastError: unknown;
  for (const attempt of attempts) {
    try {
      return await hfClient.textToImage({
        model: attempt.model,
        provider: attempt.provider,
        inputs: prompt,
        parameters: { num_inference_steps: 5 },
      });
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError || new Error("Image generation failed");
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { contents?: string };
    const contents =
      typeof body.contents === "string" ? body.contents.trim() : "";

    if (!contents) {
      return NextResponse.json(
        { success: false, message: "Contents field is required" },
        { status: 400 }
      );
    }

    const image = (await generateImage(contents)) as Blob | string;
    if (typeof image === "string") {
      return NextResponse.json({
        success: true,
        image: image.startsWith("data:image") ? image : `data:image/png;base64,${image}`,
      });
    }

    const buffer = Buffer.from(await image.arrayBuffer());

    return NextResponse.json({
      success: true,
      image: `data:image/png;base64,${buffer.toString("base64")}`,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Image generation failed";
    return NextResponse.json(
      { success: false, message: `Error generating image: ${message}` },
      { status: 500 }
    );
  }
}
