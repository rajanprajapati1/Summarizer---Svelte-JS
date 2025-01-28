import { env } from '$env/dynamic/private';
import Groq from 'groq-sdk';

const apiKey = env.GROQ_API_CLIENT;

if (!apiKey) {
  throw new Error('GROQ_API_CLIENT environment variable is missing');
}

export const groq = new Groq({
  apiKey,
});

export const reqGroqAI = async (content) => {
  try {
    const res = await groq.chat.completions.create({
      messages: [
        {
          role: 'user',
          content,
        },
      ],
      model: 'llama3-70b-8192',
      max_tokens: 8192,
    });
    return res;
  } catch (error) {
    console.error('Error in reqGroqAI:', error);
    throw error;
  }
};
