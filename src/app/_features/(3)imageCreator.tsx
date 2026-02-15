"use client";

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useAnotherAIContext } from "../_provider/AI-relatedProvider2";
import { Textarea } from "@/components/ui/textarea";
import StarIcon from "@/components/ui/star-icon";
import ReloadIcon from "@/components/ui/reload-icon";
import ImageIcon from "@/components/ui/image-icon";
import { Skeleton } from "@/components/ui/skeleton";
export const ImageCreator = () => {
  const {
    generatedImage,
    imageCreatorError,
    isImageCreated,
    imageCreatorLoading,
    imageCreatorTextarea,
    handleImageCreatorTextareaChange,
    handleTextToImage,
    setGeneratedImage,
    setImageCreatorError,
    setImageCreatorTextarea,
    setIsImageCreated,
  } = useAnotherAIContext();

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
            onClick={() => (
              setImageCreatorTextarea(``),
              setGeneratedImage(null),
              setImageCreatorError(""),
              setIsImageCreated(false)
            )}
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
          <Textarea
            placeholder="Хоолны тайлбар"
            className="h-31 py-2 px-4"
            value={imageCreatorTextarea}
            onChange={handleImageCreatorTextareaChange}
          />
          <Button
            className={`w-27 py-2 px-4 flex items-center justify-center ml-118 cursor-pointer opacity-25 hover:opacity-100  ${
              imageCreatorLoading ? "opacity-100" : ""
            }  `}
            onClick={handleTextToImage}
            disabled={imageCreatorLoading || !imageCreatorTextarea.trim()}
          >
            {imageCreatorLoading ? "Generating..." : "Generate"}
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
          {isImageCreated ? (
            ``
          ) : imageCreatorLoading ? (
            <Label className="text-[#71717A] text-[14px] font-normal">
              Please wait, it's generating...
            </Label>
          ) : imageCreatorError ? (
            <Label className="text-red-500 text-[14px] font-normal">
              {imageCreatorError}
            </Label>
          ) : (
            <Label className="text-[#71717A] text-[14px] font-normal">
              Enter a food prompt to generate an image.
            </Label>
          )}
          {imageCreatorLoading ? (
            <div className="rounded-lg border border-[#E4E4E7] p-4 space-y-3">
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-80 w-full rounded-lg" />
            </div>
          ) : isImageCreated ? (
            <div className="p-4 flex flex-col gap-1 border border-[#E4E4E7] rounded-lg">
              <img
                src={generatedImage || ""}
                alt="Generated food"
                className="bg-center bg-cover rounded-lg w-90 h-90"
              />
            </div>
          ) : (
            ``
          )}
        </div>
      </div>
    </div>
  );
};
