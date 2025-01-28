import path from "path";
import { SvelteResponse } from "../../../functions/SvelteResponse";
import { summarizeFile } from "../../../functions/FileProcessor";
import { reqGroqAI } from "../../../utils/GroqClient";

export async function GET({ url }) {
  try {
    const fileName = url.searchParams.get("fileName");
    const fileType = url.searchParams.get("fileType");

    if (!fileName || !fileType) {
      return SvelteResponse({
        status: 400,
        response: { error: "Missing fileName or fileType query parameters" },
      });
    }

    const filePath = path.join(process.cwd(), "public/uploads", fileName);
    console.log(filePath,"path")
    const content = await summarizeFile(filePath, fileType);
    console.log(content , "content")
    const summarizedContent = await reqGroqAI(content);

    return SvelteResponse({
      status: 200,
      response: { results: summarizedContent?.choices[0]?.message?.content },
    });
  } catch (error) {
    console.error("Error summarizing file:", error);
    return SvelteResponse({ status: 500, response: error.message });
  }
}
