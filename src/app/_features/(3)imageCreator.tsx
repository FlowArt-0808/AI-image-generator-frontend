"use client";

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useAIContext } from "../_provider/AI-relatedProvider";
import { Textarea } from "@/components/ui/textarea";
import StarIcon from "@/components/ui/star-icon";
import ReloadIcon from "@/components/ui/reload-icon";
import ImageIcon from "@/components/ui/image-icon";
export const ImageCreator = () => {
  const { loading, generated, generatedImageAnalysisText } = useAIContext();

  return (
    <div aria-label="Every content" className="flex flex-col gap-6">
      <div aria-label="" className="flex flex-col gap-2">
        <div aria-label="Header" className="flex justify-between">
          <div
            aria-label="The icon and text"
            className="flex gap-2 items-center"
          >
            <StarIcon />
            <h1 className="text-[#09090B] text-[20px] font-semibold">
              Food image creator
            </h1>
          </div>
          <Button
            variant="outline"
            className="cursor-pointer hover:bg-black hover:text-white"
          >
            <ReloadIcon />
          </Button>
        </div>
        <Label
          htmlFor="nothing"
          className="text-[#71717A] text-[14px] font-normal"
        >
          What food image do you want? Describe it briefly.
        </Label>
        <div aria-label="Textrea and button" className="flex flex-col gap-2">
          <Textarea placeholder="Хоолны тайлбар" className="h-31 py-2 px-4" />
          <Button
            className={`w-27 py-2 px-4 flex items-center justify-center ml-118 cursor-pointer opacity-25 hover:opacity-100  ${
              loading ? "opacity-100" : ""
            }  `}
          >
            {loading ? "Generating..." : "Generate"}
          </Button>
        </div>
        <div
          aria-label="Generated image section"
          className="flex flex-col gap-2"
        >
          <div aria-label="Summary Header" className="flex gap-2 items-center">
            <ImageIcon />
            <h1 className="text-[#09090B] text-[20px] font-semibold">Result</h1>
          </div>
          {generated ? (
            ``
          ) : loading ? (
            <Label className="text-[#71717A] text-[14px] font-normal">
              Please wait, it's generating...
            </Label>
          ) : (
            <Label className="text-[#71717A] text-[14px] font-normal">
              First, enter your image to recognize an ingredient
            </Label>
          )}
          {loading ? (
            <Textarea value="Loading ingredients..." disabled />
          ) : generated ? (
            <Textarea value={generatedImageAnalysisText} readOnly />
          ) : (
            <Textarea
              value=""
              placeholder="Results will appear here..."
              readOnly
            />
          )}
        </div>
      </div>
    </div>
  );
};
