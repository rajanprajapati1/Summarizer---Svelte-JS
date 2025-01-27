import { SvelteResponse } from "../../../functions/SvelteResponse";
import { reqGroqAI } from "../../../utils/GroqClient";
import { summarizeFile } from "../../../functions/FileProcessor";
import path from "path";

export async function GET({ url }) {
    try {
        // Get the fileName and fileType from query parameters
        const fileName = url.searchParams.get("fileName") || "test-file.txt"; // Default to "test-file.txt"
        const fileType = url.searchParams.get("fileType") || "text"; // Default to "text"

        // Construct the file path in the public directory
        const filePath = path.join(process.cwd(), "public", fileName);

        // Summarize the file
        const content = await summarizeFile(filePath, fileType);
        const summarizedContent = await reqGroqAI(content);

        // Respond with summarized content
        return SvelteResponse({
            status: 200,
            response: {
                results: summarizedContent?.choices[0]?.message?.content,
            },
        });
    } catch (error) {
        console.error("Error processing the request:", error);
        return SvelteResponse({ status: 500, response: error.message });
    }
}
