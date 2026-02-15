"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAIContext } from "../_provider/AI-relatedProvider";
import StarIcon from "@/components/ui/star-icon";
import ReloadIcon from "@/components/ui/reload-icon";
import FileIcon from "@/components/ui/file-icon";
import { Skeleton } from "@/components/ui/skeleton";

export const IngredientRecognition = () => {
  const {
    ingredientTextarea,
    sendIngredientTextToBackend,
    ingredientTextareaLoading,
    isIngredientTextareaGenerated,
    generatedIngredientRecognitionText,
    handleTextareaChange,
    setIngredientTextarea,
    setGeneratedIngredientRecognitionText,
    setIsIngredientTextareaGenerated,
  } = useAIContext();

  return (
    <div aria-label="Everything inside it" className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        {" "}
        <div aria-label="Header" className="flex justify-between">
          <div
            aria-label="The icon and text"
            className="flex gap-2 items-center"
          >
            <StarIcon />
            <h1 className="text-[#09090B] text-[20px] font-semibold">
              Ingredient Recognition
            </h1>
          </div>
          <Button
            variant="outline"
            className="cursor-pointer hover:bg-black hover:text-white"
            onClick={() => (
              setGeneratedIngredientRecognitionText(``),
              setIsIngredientTextareaGenerated(false),
              setIngredientTextarea(``)
            )}
          >
            <ReloadIcon />
          </Button>
        </div>
        <Label className="text-[#71717A] text-[14px] font-normal">
          Describe the food, and the AI will detect the ingredients.
        </Label>
        <div aria-label="Textrea and button" className="flex flex-col gap-2">
          <Textarea
            placeholder="Орц тодорхойлох"
            className="h-31 py-2 px-4
          
          "
            value={ingredientTextarea}
            onChange={handleTextareaChange}
          />
          <Button
            onClick={sendIngredientTextToBackend}
            disabled={ingredientTextareaLoading || !ingredientTextarea.trim()}
            className={`w-27 py-2 px-4 flex items-center justify-center ml-118 cursor-pointer opacity-25 hover:opacity-100  ${
              ingredientTextareaLoading ? "opacity-100" : ""
            }  `}
          >
            {ingredientTextareaLoading ? "Generating..." : "Generate"}
          </Button>
        </div>
      </div>
      <div aria-label="Generated text section" className="flex flex-col gap-2">
        <div aria-label="Summary Header" className="flex gap-2 items-center">
          <FileIcon />
          <h1 className="text-[#09090B] text-[20px] font-semibold">
            Identified Ingredients
          </h1>
        </div>
        {ingredientTextareaLoading ? (
          <Label className="text-[#71717A] text-[14px] font-normal">
            Please wait, it's loading
          </Label>
        ) : isIngredientTextareaGenerated ? (
          ``
        ) : (
          <Label className="text-[#71717A] text-[14px] font-normal">
            Enter food names or ingredient nouns to classify them.
          </Label>
        )}
        {ingredientTextareaLoading ? (
          <div className="rounded-lg border border-[#E4E4E7] p-4 space-y-3">
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-10/12" />
          </div>
        ) : isIngredientTextareaGenerated ? (
          <Textarea value={generatedIngredientRecognitionText} readOnly />
        ) : (
          <Textarea
            value=""
            placeholder="Yo, your generated shit will show up here..."
            readOnly
          />
        )}
      </div>
    </div>
  );
};
