import { ScrollArea } from "@/components/ui/ScrollArea";
import { VapiButton, vapi } from "./features/Assistant";
import { MessageList } from "./features/Messages";
import { useVapi } from "./features/Assistant";
import { CharacterPreview } from "./features/Character";
import { useEffect, useRef, useState } from "react";
import { MessageTypeEnum, TranscriptMessageTypeEnum } from "@/lib/types/conversation.type";

function App() {
  const scrollAreaRef = useRef<any>(null);
  const viewportRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    const viewport = viewportRef.current;
    if (viewport) {
      viewport.scrollTop = viewport.scrollHeight;
    }
  };

  const { toggleCall, messages, callStatus, activeTranscript, audioLevel } =
    useVapi();

  const [input, setInput] = useState("");
  const [localMessages, setLocalMessages] = useState([]);

  // Combine Vapi messages with local messages
  const allMessages = [...messages, ...localMessages];
  
  // Debug logging
  console.log("Vapi messages:", messages);
  console.log("Local messages:", localMessages);
  console.log("All messages:", allMessages);

  const handleSend = () => {
    if (!input.trim()) return;

    console.log("Sending message:", input); // Debug log
    console.log("MessageTypeEnum.TRANSCRIPT:", MessageTypeEnum.TRANSCRIPT); // Debug log
    console.log("TranscriptMessageTypeEnum.FINAL:", TranscriptMessageTypeEnum.FINAL); // Debug log

    // Create user message object - using transcript property instead of content
    const userMessage = {
      type: MessageTypeEnum.TRANSCRIPT,
      role: "user",
      transcript: input, // Changed from 'content' to 'transcript'
      timestamp: new Date().toISOString(),
      transcriptType: TranscriptMessageTypeEnum.FINAL
    };

    console.log("Created user message:", userMessage); // Debug log

    // Add to local messages state
    setLocalMessages(prev => {
      const updated = [...prev, userMessage];
      console.log("Updated local messages:", updated); // Debug log
      return updated;
    });

    // Send to Vapi
    vapi.sendText?.(input);

    setInput(""); // Clear input field after sending
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  useEffect(() => {
    vapi.on("message", scrollToBottom);
    return () => {
      vapi.off("message", scrollToBottom);
    };
  });

  return (
    <main className="flex h-screen items-center justify-center bg-gradient-to-r from-blue-100 to-purple-100">
      <CharacterPreview />
      <div
        id="card"
        className="text-slate-950 dark:text-slate-50 w-full max-w-4xl mx-auto relative shadow-lg rounded-2xl bg-white/80 backdrop-blur p-6"
      >
        <div id="card-content" className="p-6 pt-0">
          <ScrollArea
            ref={scrollAreaRef}
            viewportRef={viewportRef}
            className="h-[90vh] flex flex-1 p-4"
          >
            <div className="flex flex-1 flex-col min-h-[85vh] justify-end pb-32">
              {/* 👆 Added bottom padding here */}
              <MessageList
                messages={allMessages}
                activeTranscript={activeTranscript}
              />
            </div>
          </ScrollArea>
        </div>

        {/* Footer input section */}
        <div
          id="card-footer"
          className="absolute bottom-0 left-0 right-0 px-6 pb-4 z-10"
        >
          <div className="flex items-center bg-white rounded-full shadow-md px-4 py-0.2 gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-grow px-4 py-2 rounded-full outline-none text-sm"
            />
            <button 
              onClick={handleSend}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1.5 rounded-full text-sm">
              Send
            </button>
            <div className="bg-green-500 hover:bg-green-600 p-0.5 rounded-full text-white cursor-pointer">
              <div className="scale-50"></div>
              <VapiButton
                audioLevel={audioLevel}
                callStatus={callStatus}
                toggleCall={toggleCall}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;