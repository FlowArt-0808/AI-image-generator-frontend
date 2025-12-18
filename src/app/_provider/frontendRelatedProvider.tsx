"use client";

import { useContext, createContext, useState, type ReactNode } from "react";

type FrontendContextType = {
  activeTab: string;

  handleImageAnalysisTab: () => void; //frontend
  handleImageCreator: () => void; //frontend
  handleIngredientRecognition: () => void; //frontend
};

const FrontendContext = createContext<FrontendContextType | undefined>(
  undefined
);

export const useFrontendContext = () => {
  const context = useContext(FrontendContext);

  if (!context) {
    throw new Error(
      "UseFrontendContext must be used inside <FrontendProvider>"
    );
  }

  return context;
};

export const FrontendProvider = ({ children }: { children: ReactNode }) => {
  const [activeTab, setActiveTab] = useState(`ImageAnalysis`);
  const handleImageAnalysisTab = () => setActiveTab(`ImageAnalysis`);
  const handleImageCreator = () => setActiveTab(`ImageCreator`);
  const handleIngredientRecognition = () =>
    setActiveTab(`IngredientRecognition`);

  return (
    <FrontendContext.Provider
      value={{
        activeTab,
        handleImageAnalysisTab,
        handleImageCreator,
        handleIngredientRecognition,
      }}
    >
      {" "}
      {children}
    </FrontendContext.Provider>
  );
};
