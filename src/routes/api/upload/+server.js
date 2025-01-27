import fs from "fs";
import path from "path";
import { SvelteResponse } from "../../../functions/SvelteResponse";

const UPLOAD_DIR = path.join(process.cwd(), "public/uploads");

export async function POST({ request }) {
  try {
    if (!fs.existsSync(UPLOAD_DIR)) {
      fs.mkdirSync(UPLOAD_DIR, { recursive: true });
    }

    const contentType = request.headers.get("content-type");
    if (!contentType || !contentType.includes("multipart/form-data")) {
      return SvelteResponse({ status: 400, response: "Invalid content type" });
    }

    const boundary = contentType.split("boundary=")[1];
    if (!boundary) {
      return SvelteResponse({ status: 400, response: "Boundary not found" });
    }

    const body = await request.arrayBuffer();
    const parts = Buffer.from(body)
      .toString()
      .split(`--${boundary}`)
      .filter((part) => part.trim() && part !== `--`);

    let uploadedFileName;

    for (const part of parts) {
      const [headers, content] = part.split("\r\n\r\n");
      if (!headers.includes("filename")) continue;

      const match = headers.match(/filename="(.+)"/);
      if (!match) continue;

      const fileName = match[1].trim();
      const filePath = path.join(UPLOAD_DIR, fileName);
      uploadedFileName = fileName;

      const fileData = content.split("\r\n").join("");
      fs.writeFileSync(filePath, Buffer.from(fileData, "binary"));
    }

    if (!uploadedFileName) {
      return SvelteResponse({ status: 400, response: "No file uploaded" });
    }

    return SvelteResponse({
      status: 200,
      response: { message: "File uploaded successfully", fileName: uploadedFileName },
    });
  } catch (error) {
    console.error("Error uploading file:", error);
    return SvelteResponse({ status: 500, response: error.message });
  }
}
