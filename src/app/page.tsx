"use client";

import { Header } from "./_features/header";

import * as React from "react";

import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { ImageAnalysis } from "./_features/(1)imageAnalysis";
import { ImageCreator } from "./_features/(3)imageCreator";
import { IngredientRecognition } from "./_features/(2)ingredientRecognition";
import { useFrontendContext } from "./_provider/frontendRelatedProvider";

export default function Home() {
  const {
    activeTab,
    handleImageAnalysisTab,
    handleImageCreator,
    handleIngredientRecognition,
  } = useFrontendContext();

  return (
    <div className=" flex flex-col gap-6 items-center ">
      <Header />
      <div className="w-145 flex flex-col gap-6">
        {" "}
        <ButtonGroup className="">
          <Button
            variant="ghost"
            className={`${
              activeTab === "ImageAnalysis"
                ? "bg-white rounded-md shadow-sm font-semibold text-black hover:bg-white"
                : "text-gray-400 font-normal hover:bg-transparent"
            }`}
            onClick={handleImageAnalysisTab}
          >
            Image analysis
          </Button>
          <Button
            variant="ghost"
            className={`${
              activeTab === "IngredientRecognition"
                ? "bg-white rounded-md shadow-sm font-semibold text-black hover:bg-white"
                : "text-gray-400 font-normal hover:bg-transparent"
            }`}
            onClick={handleIngredientRecognition}
          >
            Ingredient recognition
          </Button>
          <Button
            variant="ghost"
            className={`${
              activeTab === "ImageCreator"
                ? "bg-white rounded-md shadow-sm font-semibold text-black hover:bg-white"
                : "text-gray-400 font-normal hover:bg-transparent"
            }`}
            onClick={handleImageCreator}
          >
            Image creator
          </Button>
        </ButtonGroup>
        {activeTab === "ImageAnalysis" && <ImageAnalysis />}
        {activeTab === "ImageCreator" && <ImageCreator />}
        {activeTab === "IngredientRecognition" && <IngredientRecognition />}
      </div>
    </div>
  );
}
