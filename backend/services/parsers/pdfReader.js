const fs = require("fs");
const pdf = require("pdf-parse");

module.exports = async function readPDF(path) {
  try {
    const dataBuffer = fs.readFileSync(path);
    const data = await pdf(dataBuffer);

    // Normalize text: replace multiple spaces with single space, preserve newlines
    const text = data.text
      .replace(/\r\n/g, "\n")
      .replace(/[ \t]+/g, " ")
      .trim();

    console.log("PDF TEXT LENGTH:", text.length);

    return text;
  } catch (err) {
    console.error("PDF READ ERROR:", err);
    return "";
  }
};
