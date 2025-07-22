import { Message, MessageTypeEnum } from "@/lib/types/conversation.type";
import { Check, Pencil, X } from "lucide-react";
import React, { useEffect } from "react";
import { vapi } from "../Assistant";

function CharacterDetails() {
  const [characterDetails, setCharacterDetails] = React.useState<
    Record<string, string>
  >({});
  const [editKey, setEditKey] = React.useState<string | null>(null);
  const [editValue, setEditValue] = React.useState<string>("");

  useEffect(() => {
    const onMessageUpdate = (message: Message) => {
      if (message.type !== MessageTypeEnum.FUNCTION_CALL) return;
      if (message.functionCall.name === "finalizeDetail") {
        const params = message.functionCall.parameters;
        setCharacterDetails((details) => ({
          ...details,
          [params.key.toLowerCase()]: [params.value],
        }));
      }
    };

    vapi.on("message", onMessageUpdate);
    return () => {
      vapi.off("message", onMessageUpdate);
    };
  }, []);

  const handleEdit = (key: string) => {
    setEditKey(key);
    setEditValue(characterDetails[key]);
  };

  const handleEditChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditValue(event.target.value);
  };

  const handleCancel = () => {
    setEditKey(null);
    setEditValue("");
  };

  const handleSave = () => {
    if (editKey) {
      vapi.send({
        type: MessageTypeEnum.ADD_MESSAGE,
        message: {
          role: "system",
          content: `The user has updated the final value for ${editKey} to ${editValue}.`,
        },
      });
    }
    setEditKey(null);
    setEditValue("");
  };

  return (
    <div className="flex flex-col gap-4">
      {Object.keys(characterDetails).map((key: string) => (
        <div
          key={key}
          className="w-full bg-gray-100 px-4 py-3 rounded-lg shadow-sm flex flex-col"
        >
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium capitalize text-gray-700">
              {key}
            </span>
            {editKey === key ? (
              <div className="flex gap-1">
                <button onClick={handleCancel}>
                  <X size={16} className="text-red-500" />
                </button>
                <button onClick={handleSave}>
                  <Check size={16} className="text-green-500" />
                </button>
              </div>
            ) : (
              <button onClick={() => handleEdit(key)}>
                <Pencil size={16} className="text-blue-500" />
              </button>
            )}
          </div>
          <div className="mt-2">
            {editKey === key ? (
              <textarea
                value={editValue}
                onChange={handleEditChange}
                className="w-full text-sm px-2 py-1 border rounded focus:outline-none focus:ring focus:border-blue-300"
              />
            ) : (
              <p className="text-sm text-gray-800">{characterDetails[key]}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export { CharacterDetails };
