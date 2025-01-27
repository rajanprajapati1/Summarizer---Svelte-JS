import multiparty from "multiparty";
import fs from "fs";
import path from "path";
import { SvelteResponse } from "../../../functions/SvelteResponse";

const UPLOAD_DIR = path.join(process.cwd(), "public");

export async function POST({ request }) {
  try {
    // Ensure the upload directory exists
    if (!fs.existsSync(UPLOAD_DIR)) {
      fs.mkdirSync(UPLOAD_DIR);
    }

    const form = new multiparty.Form({
      uploadDir: UPLOAD_DIR,
      maxFilesSize: 10 * 1024 * 1024, // Limit file size to 10MB
    });

    // Manually handle the request stream
    const formData = await new Promise((resolve, reject) => {
      const reqStream = request.body;

      // Create a readable stream from the request body
      const reader = reqStream.getReader();
      const chunks = [];
      reader.read().then(function processText({ done, value }) {
        if (done) {
          // Send the form data to multiparty once the request body is read
          form.parse(Buffer.concat(chunks), (err, fields, files) => {
            if (err) {
              reject(err);
            } else {
              resolve({ fields, files });
            }
          });
          return;
        }
        chunks.push(value);
        reader.read().then(processText);
      });
    });

    // Get the uploaded file
    const uploadedFile = formData.files.file[0];
    const filePath = uploadedFile.path;

    // Return response
    return SvelteResponse({
      status: 200,
      response: {
        message: "File uploaded successfully",
        filePath: filePath,
      },
    });
  } catch (error) {
    console.error("Error uploading file:", error);
    return SvelteResponse({ status: 500, response: error.message });
  }
}
