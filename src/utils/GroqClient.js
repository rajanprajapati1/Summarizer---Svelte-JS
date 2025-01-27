import Groq from "groq-sdk";

export const groq = new Groq({
  apiKey: ``,

});

export const reqGroqAI = async (content) => {
  const res = await groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content,
      },
    ],
    model: "llama3-70b-8192",
    max_tokens:8192
  });
  return res;
};

