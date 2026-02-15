import { InferenceClient } from "@huggingface/inference";

export const getHfClient = () => {
  const token = process.env.HF_TOKEN;
  if (!token) {
    throw new Error("HF_TOKEN is not configured.");
  }
  return new InferenceClient(token);
};
