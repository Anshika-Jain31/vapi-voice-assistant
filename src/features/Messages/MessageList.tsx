import {
  Message,
  MessageTypeEnum,
  TranscriptMessage,
} from "@/lib/types/conversation.type";
import { ConversationMessage } from "./ConversationMessage";
import FunctionCallResult from "./FunctionCallResult";

interface MessageListProps {
  messages: Message[];
  activeTranscript?: TranscriptMessage | null;
}

export function MessageList({ messages, activeTranscript }: MessageListProps) {
  console.log("messages", messages);
  console.log("MessageTypeEnum.TRANSCRIPT:", MessageTypeEnum.TRANSCRIPT);
  
  return (
    <>
      {messages.map((message, index) => {
        console.log(`Message ${index}:`, message);
        console.log(`Message type: "${message.type}", Expected: "${MessageTypeEnum.TRANSCRIPT}"`);
        console.log(`Type match:`, message.type === MessageTypeEnum.TRANSCRIPT);
        
        if (message.type === MessageTypeEnum.TRANSCRIPT) {
          return (
            <ConversationMessage
              message={message}
              key={message.type + message?.role + index}
            />
          );
        } else if (message.type === MessageTypeEnum.FUNCTION_CALL_RESULT) {
          return (
            <FunctionCallResult key={message.type + index} message={message} />
          );
        } else {
          console.log(`Unhandled message type: "${message.type}"`);
          return null;
        }
      })}
      {activeTranscript ? (
        <ConversationMessage message={activeTranscript} />
      ) : null}
    </>
  );
}