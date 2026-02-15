import { Button } from "@/components/ui/button";
import { useFrontendContext } from "../_provider/frontendRelatedProvider";
import { useAnotherAIContext } from "../_provider/AI-relatedProvider2";
import MessageIcon from "../../components/ui/message-icon";
import SendIcon from "@/components/ui/send-icon";
import { Label } from "@radix-ui/react-label";
import CloseIcon from "@/components/ui/close-icon";
import { Textarea } from "@/components/ui/textarea";

export const Chatbot = () => {
  const { setChatbotTab, chatbotTab } = useFrontendContext();
  const {
    chatbotTextarea,
    handleChatbotTextarea,
    chatbotLoading,
    chatbotError,
    chatbotMessages,
    sendChatbotMessage,
  } = useAnotherAIContext();

  return (
    <div
      className={`fixed  ${chatbotTab ? "bottom-2" : "bottom-7"}  ${
        chatbotTab ? "right-0" : "right-6"
      }`}
    >
      {chatbotTab ? (
        <div className="w-95 h-118 flex flex-col border border-[#E4E4E7] shadow-md rounded-md bg-[#FFF] ">
          <div
            aria-label="Label"
            className="px-2 py-4 flex justify-between items-center"
          >
            <Label className="text-[#09090B] text-[16px] font-medium">
              {" "}
              Chat assistant
            </Label>
            <button
              className="flex items-center justify-center p-2 border border-[#E4E4E7] rounded-md cursor-pointer"
              onClick={() => setChatbotTab(false)}
            >
              <CloseIcon />
            </button>
          </div>
          <div className="py-4 px-6 border-y border-[#E4E4E7]">
            <div
              aria-label="Display chat log"
              className="w-83 h-75 overflow-y-auto flex flex-col gap-2"
            >
              {chatbotMessages.length === 0 ? (
                <p className="text-sm text-zinc-500">
                  Ask anything about food, ingredients, and nutrition.
                </p>
              ) : (
                chatbotMessages.map((message, index) => (
                  <div
                    key={`${message.role}-${index}`}
                    className={`rounded-lg px-3 py-2 text-sm whitespace-pre-wrap ${
                      message.role === "user"
                        ? "bg-zinc-900 text-white self-end max-w-[85%]"
                        : "bg-zinc-100 text-zinc-900 self-start max-w-[90%]"
                    }`}
                  >
                    {message.content}
                  </div>
                ))
              )}
              {chatbotLoading ? (
                <p className="text-xs text-zinc-500">Thinking...</p>
              ) : null}
              {chatbotError ? (
                <p className="text-xs text-red-500">{chatbotError}</p>
              ) : null}
            </div>
          </div>
          <div className="py-2 px-6 flex gap-2 justify-between items-center">
            <Textarea value={chatbotTextarea} onChange={handleChatbotTextarea} />
            <Button
              variant="default"
              size="icon"
              className="rounded-full flex items-center justify-center cursor-pointer"
              onClick={sendChatbotMessage}
              disabled={chatbotLoading || !chatbotTextarea.trim()}
            >
              {chatbotTab ? <SendIcon /> : <MessageIcon />}
            </Button>
          </div>
        </div>
      ) : (
        <div>
          {" "}
          <Button
            variant="default"
            size="icon"
            className="rounded-full flex items-center justify-center cursor-pointer"
            onClick={() => setChatbotTab(true)}
          >
            {chatbotTab ? <SendIcon /> : <MessageIcon />}
          </Button>
        </div>
      )}
    </div>
  );
};
