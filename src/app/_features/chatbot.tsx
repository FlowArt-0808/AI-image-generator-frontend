import { Button } from "@/components/ui/button";
import { useFrontendContext } from "../_provider/frontendRelatedProvider";
import MessageIcon from "../../components/ui/message-icon";
import SendIcon from "@/components/ui/send-icon";
import { Label } from "@radix-ui/react-label";
import CloseIcon from "@/components/ui/close-icon";
import { Textarea } from "@/components/ui/textarea";

export const Chatbot = () => {
  const { setChatbotTab, chatbotTab } = useFrontendContext();
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
            {" "}
            <div aria-label="Display chat log" className=" w-83 h-75"></div>
          </div>
          <div className="py-2 px-6 flex gap-2 justify-between items-center">
            {" "}
            <Textarea />
            <Button
              variant="default"
              size="icon"
              className="rounded-full flex items-center justify-center cursor-pointer"
              onClick={() => setChatbotTab(true)}
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
