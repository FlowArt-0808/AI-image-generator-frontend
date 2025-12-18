"use client";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAIContext } from "../_provider/AI-relatedProvider";

import StarIcon from "@/components/ui/star-icon";
import ReloadIcon from "@/components/ui/reload-icon";
import FileIcon from "@/components/ui/file-icon";

export const ImageAnalysis = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { generatedImageAnalysisText, loading, generated } = useAIContext();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div aria-label="Contents inside it" className="flex flex-col gap-6 ">
      <div
        className="flex flex-col gap-2
      "
      >
        {" "}
        <div aria-label="Header" className="flex justify-between">
          <div
            aria-label="The icon and text"
            className="flex gap-2 items-center"
          >
            <StarIcon />
            <h1 className="text-[#09090B] text-[20px] font-semibold">
              Image analysis
            </h1>
          </div>
          <Button
            variant="outline"
            className="cursor-pointer hover:bg-black hover:text-white "
          >
            <ReloadIcon />
          </Button>
        </div>
        <Label
          htmlFor="nothing"
          className="text-[#71717A] text-[14px] font-normal"
        >
          Upload a food photo, and the AI will detect the ingredients.
        </Label>
        <div
          aria-label="Image drop zone and generate button"
          className="flex flex-col gap-2"
        >
          <div className="relative">
            <Input
              id="picture"
              type="file"
              accept="image/*"
              className=""
              onChange={handleImageChange}
            />
            {!imagePreview ? (
              <label htmlFor="picture" className=""></label>
            ) : (
              <div className="relative rounded-2xl overflow-hidden border-4 border-teal-200 bg-teal-50">
                <img
                  src={imagePreview}
                  alt="Uploaded food"
                  className="w-full h-auto max-h-80 object-cover"
                />
                <button
                  onClick={() => setImagePreview(null)}
                  className="absolute bottom-4 right-4 bg-white rounded-lg p-2 shadow-lg hover:bg-gray-100 transition-colors"
                  aria-label="Remove image"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 6h18" />
                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                  </svg>
                </button>
              </div>
            )}
          </div>
          <Button
            className={`w-27 h-10 py-2 px-4 flex items-center justify-center ml-122 cursor-pointer opacity-25 hover:opacity-100 ${
              loading ? "opacity-100" : ""
            }`}
          >
            {loading ? "Generating..." : "Generate"}
          </Button>
        </div>
      </div>

      <div
        aria-label="Summary generator section"
        className="flex flex-col gap-2"
      >
        <div aria-label="Summary Header" className="flex gap-2 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <FileIcon />
          </svg>
          <h1 className="text-[#09090B] text-[20px] font-semibold">
            Here is the summary
          </h1>
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
  );
};
