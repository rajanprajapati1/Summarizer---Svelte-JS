import fs from "fs/promises";
import fsn from "fs";
import mammoth from "mammoth";
import path from "path";
import * as pdfjs from 'pdfjs-dist';
import * as XLSX from 'xlsx';

// working
async function extractTextFromPDF(filePath) {
  try {
    // Read the file as a Buffer
    const pdfData = await fsn.promises.readFile(filePath);
    const uint8ArrayData = new Uint8Array(pdfData);
    const pdfDocument = await pdfjs.getDocument({ data: uint8ArrayData }).promise;
    let text = "";
    for (let i = 1; i <= pdfDocument.numPages; i++) {
      const page = await pdfDocument.getPage(i);
      const pageText = await page.getTextContent();
      text += pageText.items.map((item) => item.str).join(" ") + "\n";
    }

    return text;
  } catch (error) {
    console.error("Error extracting text from PDF:", error.message);
    throw error;
  }
}
// working
async function readTextFile(filePath) {
  if (!fsn.existsSync(filePath)) {
    throw new Error(`File not found: ${fileName}`);
}
  try {
    const content = await fs.readFile(filePath, "utf-8");
    return content;
  } catch (err) {
    console.error("Error reading the file:", err);
    throw err;
  }
}

// wordking for low dataser
async function extractTextFromExcel(filePath) {
  try {
    const fileData = await fsn.promises.readFile(filePath);

    const workbook = XLSX.read(fileData, { type: 'buffer' });

    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });
    const limitedData = data.map(row => row.slice(0, 1));
    const formattedData = limitedData.map(row => {
      return row.join(' | '); 
    }).join('\n');
console.log(limitedData,"limitedData")
    return formattedData;
  } catch (error) {
    console.error("Error reading the Excel file:", error.message);
    throw error;
  }
}
// working only for docx not for doc
async function extractTextFromWord(filePath) {
  try {
    const result = await mammoth.extractRawText({ path: filePath });
    return result.value;
  } catch (err) {
    console.error("Error reading the Word document:", err);
    throw err;
  }
}

// Main function to summarize files based on type
export async function summarizeFile(filePath, fileType) {

  let content;
  switch (fileType) {
    case "pdf":
      content = await extractTextFromPDF(filePath);
      break;
    case "text":
      content = await readTextFile(filePath);
      break;
    case "excel":
      content = await extractTextFromExcel(filePath);
      break;
    case "word":
      content = await extractTextFromWord(filePath);
      break;
    default:
      throw new Error("Unsupported file type");
  }
  return content;
}
