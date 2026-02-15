"use client";
import {
  useContext,
  createContext,
  useState,
  type ReactNode,
  type SetStateAction,
  type Dispatch,
} from "react";
import axios from "axios";
import React from "react";
import { apiUrl } from "@/lib/api";
type AIContextType = {
  imageAnalysisLoading: boolean;
  generatedIngredientRecognitionText: string;
  ingredientTextarea: string;
  imageAnalysisInput: string;
  generatedImageAnalysisTextarea: string;
  setIngredientTextarea: Dispatch<SetStateAction<string>>;
  setImageAnalysisInput: Dispatch<SetStateAction<string>>;
  setIsImageAnalyzedTextareaGenerated: Dispatch<SetStateAction<boolean>>;
  setIsIngredientTextareaGenerated: Dispatch<SetStateAction<boolean>>;
  setGeneratedImageAnalysisTextarea: Dispatch<SetStateAction<string>>;
  setGeneratedIngredientRecognitionText: Dispatch<SetStateAction<string>>;
  handleTextareaChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  sendIngredientTextToBackend: () => Promise<void>;
  sendImageToBackend: () => Promise<void>;
  ingredientTextareaLoading: boolean;
  isImageAnalyzedTextareaGenerated: boolean;
  isIngredientTextareaGenerated: boolean;
};
const AIContext = createContext<AIContextType | undefined>(undefined);
export const useAIContext = () => {
  const context = useContext(AIContext);
  if (!context) {
    throw new Error("useAIContext must be used inside <AIProvider>");
  }
  return context;
};

export const AIProvider = ({ children }: { children: ReactNode }) => {
  const [ingredientTextarea, setIngredientTextarea] = useState(``);
  const [imageAnalysisInput, setImageAnalysisInput] = useState(``);
  const [ingredientTextareaLoading, setIngredientTextareaLoading] = useState(false);
  const [imageAnalysisLoading, setImageAnalysisLoading] = useState(false);
  const [isImageAnalyzedTextareaGenerated, setIsImageAnalyzedTextareaGenerated] = useState(false);
  const [isIngredientTextareaGenerated, setIsIngredientTextareaGenerated] = useState(false);
  const [generatedImageAnalysisTextarea, setGeneratedImageAnalysisTextarea] = useState(``);
  const [generatedIngredientRecognitionText, setGeneratedIngredientRecognitionText] = useState(``);

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setIngredientTextarea(value);
  };

  const sendImageToBackend = async () => {
    if (!imageAnalysisInput) {
      setGeneratedImageAnalysisTextarea("Please upload an image first.");
      setIsImageAnalyzedTextareaGenerated(true);
      return;
    }
    setImageAnalysisLoading(true);
    setIsImageAnalyzedTextareaGenerated(false);
    try {
      const response = await axios.post(apiUrl("/authentication/analysis"), {
        image: imageAnalysisInput,
      });
      if (response.data.success) {
        setGeneratedImageAnalysisTextarea(response.data.message);
        setIsImageAnalyzedTextareaGenerated(true);
      } else {
        setGeneratedImageAnalysisTextarea(response.data.message || "Image analysis failed.");
        setIsImageAnalyzedTextareaGenerated(true);
      }
    } catch (error) {
      let errorMessage = "An unexpected error occurred";
      if (axios.isAxiosError(error)) {
        if (error.response) {
          errorMessage = error.response.data?.message || error.message;
        } else if (error.request) {
          errorMessage = "No response from server. Please check your connection.";
        } else {
          errorMessage = error.message;
        }
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      setGeneratedImageAnalysisTextarea(errorMessage);
      setIsImageAnalyzedTextareaGenerated(true);
    } finally {
      setImageAnalysisLoading(false);
    }
  };

  const sendIngredientTextToBackend = async () => {
    const cleanedContents = ingredientTextarea.trim();
    if (!cleanedContents) {
      setGeneratedIngredientRecognitionText("Please enter food or ingredient names first.");
      setIsIngredientTextareaGenerated(true);
      return;
    }
    setIngredientTextareaLoading(true);
    setIsIngredientTextareaGenerated(false);
    try {
      const response = await axios.post(apiUrl("/authentication/ingredients"), {
        contents: cleanedContents,
      });

      if (response.data.success) {
        console.log("Success:", response.data);
        setIsIngredientTextareaGenerated(true);
        setGeneratedIngredientRecognitionText(response.data.message);
      } else {
        setGeneratedIngredientRecognitionText(response.data.message);
        setIsIngredientTextareaGenerated(true);
      }
    } catch (error) {
      let errorMessage = "An unexpected error occurred";

      if (axios.isAxiosError(error)) {
        if (error.response) {
          errorMessage = error.response.data?.message || error.message;
        } else if (error.request) {
          errorMessage =
            "No response from server. Please check your connection.";
        } else {
          errorMessage = error.message;
        }
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      console.error("Error:", errorMessage);
      setGeneratedIngredientRecognitionText(errorMessage);
      setIsIngredientTextareaGenerated(true);
    } finally {
      setIngredientTextareaLoading(false);
    }
  };

  return (
    <AIContext.Provider
      value={{
        generatedImageAnalysisTextarea,
        generatedIngredientRecognitionText,
        ingredientTextarea,
        imageAnalysisInput,
        handleTextareaChange,
        setIngredientTextarea,
        setImageAnalysisInput,
        setGeneratedImageAnalysisTextarea,
        setIsImageAnalyzedTextareaGenerated,
        sendIngredientTextToBackend,
        sendImageToBackend,
        setIsIngredientTextareaGenerated,
        setGeneratedIngredientRecognitionText,
        imageAnalysisLoading,
        ingredientTextareaLoading,
        isImageAnalyzedTextareaGenerated,
        isIngredientTextareaGenerated,
      }}
    >
      {children}
    </AIContext.Provider>
  );
};
