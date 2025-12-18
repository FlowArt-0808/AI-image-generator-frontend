"use client";

import {
  useContext,
  createContext,
  useState,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
} from "react";

import React from "react";

type AIContextType = {
  generatedIngredientRecognitionText: string; // frontend and backend
  ingredientTextarea: string; //backend
  generatedImageAnalysisText: string;
  setGeneratedIngredientRecognitionText: Dispatch<SetStateAction<string>>;
  setGeneratedImageAnalysisText: Dispatch<SetStateAction<string>>;
  setTextArea: Dispatch<SetStateAction<string>>; // frontend and backend //Used for ingredient recognition
  handleGenerated: () => void; //backend and frontend
  handleTextAreaChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void; //frontend and backend
  sendIngredientTextToBackend: () => Promise<void>; // backend
  loading: boolean; //frontend and backend
  generated: boolean; // frontend and backend
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
  const [ingredientTextarea, setTextArea] = useState(``);
  const [loading, setLoading] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [generatedImageAnalysisText, setGeneratedImageAnalysisText] =
    useState(``);
  const [
    generatedIngredientRecognitionText,
    setGeneratedIngredientRecognitionText,
  ] = useState(``);

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setTextArea(value);
    console.log(value);
  };

  const handleGenerated = () => setGenerated(true);

  const sendIngredientTextToBackend = async () => {
    setLoading(true);
    setGenerated(false);
    try {
      const response = await fetch(
        "http://localhost:777/authentication/ingredients",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: ingredientTextarea,
          }),
        }
      );

      const data = await response.json();
      if (data.success) {
        console.log("Success:", data);
        setGenerated(true);
        setGeneratedIngredientRecognitionText(data.message);
        return data.message;
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AIContext.Provider
      value={{
        generatedImageAnalysisText,
        generatedIngredientRecognitionText,
        ingredientTextarea,
        setGeneratedImageAnalysisText,
        setGeneratedIngredientRecognitionText,
        setTextArea,
        handleTextAreaChange,
        handleGenerated,
        sendIngredientTextToBackend,
        loading,
        generated,
      }}
    >
      {children}
    </AIContext.Provider>
  );
};
