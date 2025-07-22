import { CALL_STATUS, useVapi } from "./useVapi";
import { Loader2, Mic, Square } from "lucide-react";

const VapiButton = ({
  toggleCall,
  callStatus,
  audioLevel = 0,
}: Partial<ReturnType<typeof useVapi>>) => {
  const isActive = callStatus === CALL_STATUS.ACTIVE;
  const isLoading = callStatus === CALL_STATUS.LOADING;

  const pulseShadow = `0 0 ${10 + audioLevel * 30}px ${audioLevel * 10}px ${
    isActive ? "rgba(255,0,0,0.7)" : "rgba(0,255,0,0.5)"
  }`;

  return (
    <button
      onClick={toggleCall}
      style={{
        boxShadow: pulseShadow,
      }}
      className={`w-16 h-16 rounded-full flex items-center justify-center text-white transition-all duration-300 transform hover:scale-110
        ${isActive ? "bg-red-600 hover:bg-red-700" : isLoading ? "bg-orange-500 hover:bg-orange-600" : "bg-green-600 hover:bg-green-700"}`}
    >
      {isActive ? (
        <Square />
      ) : isLoading ? (
        <Loader2 className="animate-spin" />
      ) : (
        <Mic />
      )}
    </button>
  );
};

export { VapiButton };

