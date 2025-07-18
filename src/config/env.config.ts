export const envConfig = {
  vapi: {
    apiUrl: import.meta.env.VITE_VAPI_API_URL ?? "https://api.vapi.ai",
    token: import.meta.env.VITE_VAPI_WEB_TOKEN ?? "vapi-web-token",
    agentId: "2fb50c08-a734-4620-8f6e-45cddbd1cc1c", 
  },
};