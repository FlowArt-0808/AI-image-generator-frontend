"use client";
import {
  useContext,
  createContext,
  useState,
  type ChangeEvent,
  type ReactNode,
  type SetStateAction,
  type Dispatch,
} from "react";
import axios from "axios";
import { apiUrl } from "@/lib/api";

type ChatMessage = { role: "user" | "assistant"; content: string };
type AnotherAIContextType = {
  generatedImage: string | null;
  imageCreatorError: string;
  imageCreatorTextarea: string;
  imageCreatorLoading: boolean;
  isImageCreated: boolean;
  chatbotTextarea: string;
  chatbotLoading: boolean;
  chatbotError: string;
  chatbotMessages: ChatMessage[];
  setIsImageCreated: Dispatch<SetStateAction<boolean>>;
  setGeneratedImage: Dispatch<SetStateAction<string | null>>;
  setImageCreatorError: Dispatch<SetStateAction<string>>;
  setImageCreatorTextarea: Dispatch<SetStateAction<string>>;
  handleTextToImage: () => Promise<void>;
  sendChatbotMessage: () => Promise<void>;
  handleImageCreatorTextareaChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  handleChatbotTextarea: (e: ChangeEvent<HTMLTextAreaElement>) => void;
};

const AnotherAIContext = createContext<AnotherAIContextType | undefined>(undefined);
const toRequestErrorMessage = (error: unknown, fallback: string) => {
  if (axios.isAxiosError(error)) {
    if (error.response) return error.response.data?.message || error.message;
    if (error.request) return "No response from server. Please check your connection.";
    return error.message;
  }
  if (error instanceof Error) return error.message;
  return fallback;
};

export const useAnotherAIContext = () => {
  const context = useContext(AnotherAIContext);
  if (!context) {
    throw new Error("useImageCreatorContext must be used inside <ImageCreatorProvider>");
  }
  return context;
};

export const AnotherAIProvider = ({ children }: { children: ReactNode }) => {
  const [imageCreatorTextarea, setImageCreatorTextarea] = useState("");
  const [chatbotTextarea, setChatbotTextarea] = useState("");
  const [chatbotLoading, setChatbotLoading] = useState(false);
  const [chatbotError, setChatbotError] = useState("");
  const [chatbotMessages, setChatbotMessages] = useState<ChatMessage[]>([]);
  const [imageCreatorLoading, setImageCreatorLoading] = useState(false);
  const [isImageCreated, setIsImageCreated] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [imageCreatorError, setImageCreatorError] = useState("");

  const handleImageCreatorTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) =>
    setImageCreatorTextarea(e.target.value);
  const handleChatbotTextarea = (e: ChangeEvent<HTMLTextAreaElement>) =>
    setChatbotTextarea(e.target.value);

  const sendChatbotMessage = async () => {
    const message = chatbotTextarea.trim();
    if (!message || chatbotLoading) return;
    setChatbotError("");
    setChatbotLoading(true);
    setChatbotTextarea("");
    setChatbotMessages((prev) => [...prev, { role: "user", content: message }]);
    try {
      const response = await axios.post(apiUrl("/authentication/chatbot"), { chat: message });
      if (response.data.success) {
        setChatbotMessages((prev) => [...prev, { role: "assistant", content: response.data.message }]);
      } else {
        setChatbotError(response.data.message || "Chat request failed.");
      }
    } catch (error) {
      setChatbotError(toRequestErrorMessage(error, "Chat request failed."));
    } finally {
      setChatbotLoading(false);
    }
  };

  const handleTextToImage = async () => {
    const cleanedContents = imageCreatorTextarea.trim();
    if (!cleanedContents) {
      setImageCreatorError("Please enter a food description first.");
      setGeneratedImage(null);
      setIsImageCreated(false);
      return;
    }
    setImageCreatorLoading(true);
    setIsImageCreated(false);
    setGeneratedImage(null);
    setImageCreatorError("");
    try {
      const response = await axios.post(apiUrl("/authentication/imageCreator"), {
        contents: cleanedContents,
      });
      if (response.data.success) {
        setGeneratedImage(response.data.image);
        setIsImageCreated(true);
      } else {
        setImageCreatorError(response.data.message || "Image generation failed.");
      }
    } catch (error) {
      setImageCreatorError(toRequestErrorMessage(error, "Image generation failed."));
      setGeneratedImage(null);
      setIsImageCreated(false);
    } finally {
      setImageCreatorLoading(false);
    }
  };

  return (
    <AnotherAIContext.Provider
      value={{
        chatbotTextarea,
        chatbotLoading,
        chatbotError,
        chatbotMessages,
        generatedImage,
        imageCreatorError,
        imageCreatorTextarea,
        handleTextToImage,
        sendChatbotMessage,
        handleImageCreatorTextareaChange,
        setImageCreatorTextarea,
        setIsImageCreated,
        setGeneratedImage,
        setImageCreatorError,
        handleChatbotTextarea,
        imageCreatorLoading,
        isImageCreated,
      }}
    >
      {children}
    </AnotherAIContext.Provider>
  );
};
