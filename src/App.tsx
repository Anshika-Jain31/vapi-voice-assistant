import { ScrollArea } from "@/components/ui/ScrollArea";
import { VapiButton, vapi } from "./features/Assistant";
import { MessageList } from "./features/Messages";
import { useVapi } from "./features/Assistant";
import { CharacterPreview } from "./features/Character";
import { useEffect, useRef, useState } from "react";

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
            <div className="flex flex-1 flex-col min-h-[85vh] justify-end pb-20">
              {/* 👆 Reduced bottom padding since footer is smaller now */}
              <MessageList
                messages={messages}
                activeTranscript={activeTranscript}
              />
            </div>
          </ScrollArea>
        </div>

        {/* Footer with centered microphone and visual elements */}
        <div
          id="card-footer"
          className="absolute bottom-0 left-0 right-0 px-6 pb-4 z-10"
        >
          <div className="flex items-center justify-center">
            {/* Left decorative elements */}
            <div className="flex items-center space-x-2 mr-8">
              <div className={`w-2 h-2 rounded-full ${callStatus === 'active' ? 'bg-green-400 animate-pulse' : 'bg-gray-300'}`}></div>
              <div className={`w-1.5 h-1.5 rounded-full ${callStatus === 'active' ? 'bg-green-300 animate-pulse' : 'bg-gray-200'}`} style={{animationDelay: '0.2s'}}></div>
              <div className={`w-1 h-1 rounded-full ${callStatus === 'active' ? 'bg-green-200 animate-pulse' : 'bg-gray-100'}`} style={{animationDelay: '0.4s'}}></div>
            </div>

            {/* Main microphone button */}
            <div className="relative">
              {/* Pulsing ring when active */}
              {callStatus === 'active' && (
                <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-30"></div>
              )}
              <div className="bg-green-500 hover:bg-green-600 p-3 rounded-full text-white cursor-pointer shadow-lg relative z-10 transition-all duration-200 hover:scale-105">
                <VapiButton
                  audioLevel={audioLevel}
                  callStatus={callStatus}
                  toggleCall={toggleCall}
                />
              </div>
            </div>

            {/* Right decorative elements */}
            <div className="flex items-center space-x-2 ml-8">
              <div className={`w-1 h-1 rounded-full ${callStatus === 'active' ? 'bg-green-200 animate-pulse' : 'bg-gray-100'}`} style={{animationDelay: '0.4s'}}></div>
              <div className={`w-1.5 h-1.5 rounded-full ${callStatus === 'active' ? 'bg-green-300 animate-pulse' : 'bg-gray-200'}`} style={{animationDelay: '0.2s'}}></div>
              <div className={`w-2 h-2 rounded-full ${callStatus === 'active' ? 'bg-green-400 animate-pulse' : 'bg-gray-300'}`}></div>
            </div>
          </div>

          {/* Status text */}
          <div className="text-center mt-2">
            <p className="text-xs text-gray-500">
              {callStatus === 'active' ? 'Listening...' : 
               callStatus === 'loading' ? 'Connecting...' : 
               'Tap to speak'}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;