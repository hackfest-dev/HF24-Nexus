import { func } from "prop-types";

const { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory  } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export async function textOnly(prompt){
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const result = await model.generateContent(prompt);
  return result.response.text();
};

export async function multimodal(imageBinary, prompt){
  // For text-and-image input (multimodal), use the gemini-pro-vision model
  const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
  if(!prompt){
    prompt = "Explain me this image or chart, You will only give me insights for my day to day trading and advice me on mental well-being. You will NOT respond to any subject out of this scope"
  }
  const mimeType = "image/png";

  // Convert image binary to a GoogleGenerativeAI.Part object.
  const imageParts = [
    {
      inlineData: {
        data: Buffer.from(imageBinary, "binary").toString("base64"),
        mimeType
      }
    }
  ];

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
    },
  ];

  const result = await model.generateContent([prompt, ...imageParts], safetySettings);
  const text = result.response.text();
  return text;
};

export async function chat(prompt){
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const chat = model.startChat({
    history: [
      {
        role: "user",
        parts: [{ text: "Hello" }],
      },
      {
        role: "model",
        parts: [{ text: "I am your personal AI Assistant I will help you with all your needs for trading and take care of your mental health" }],
        },
        {
          role: "user",
          parts: [{ text: "Good, You will only give me insights for my day to day trading and advice me on mental health. You will NOT respond to any subject out of this scope, understood?" }],
        },
        {
          role: "model",
          parts: [{ text: "Yes I will not respond to anything outside of finance and mental wellbeing." }],
          }
    ]
  });

  const result = await chat.sendMessage(prompt);
  return result.response.text();
};

// module.exports = { textOnly, multimodal, chat };