"use client";

import { useContext, createContext, useState, ReactNode } from "react";

const EverythingContext = createContext({});
// Typescript//
// createContext (null) JS >>>>>> createContext ({}) TS
//

export const useEverythingContext = () => {
  const context = useContext(EverythingContext);

  if (!context) {
    throw new Error(
      "useEverythingContext must be used inside <EverythingProvider>"
    );
  }

  return context;
};

export const EverythingProvider = ({ children }: { children: ReactNode }) => {
  //Typescript// //: { children: ReactNode })//
  const [activeTab, setActiveTab] = useState(`ImageAnalysis`);

  const handleImageAnalysisTab = () => setActiveTab(`ImageAnalysis`);
  const handleImageCreator = () => setActiveTab(`ImageCreator`);
  const handleIngredientRecognition = () =>
    setActiveTab(`IngredientRecognition`);

  return (
    <EverythingContext.Provider
      value={{
        activeTab,
        setActiveTab,
        handleImageAnalysisTab,
        handleImageCreator,
        handleIngredientRecognition,
      }}
    >
      {children}
    </EverythingContext.Provider>
  );
};
