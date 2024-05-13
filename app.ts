import axios from "axios";
import { PDFDocument } from "pdf-lib";
import { readFile, writeFile } from "fs/promises";
import util from "util";

const date: Date = new Date();
const setCurrDate: string = date.toLocaleDateString("he-IL").toString();
async function fillForm(input: string, output: string) {
  try {
    const pdfDoc = await PDFDocument.load(await readFile(input));
    const form = pdfDoc.getForm();
    const firstName = form.getTextField("firstName");
    const middleName = form.getTextField("middleName");
    const lastName = form.getTextField("lastName");
    const currDate = form.getTextField("currDate");

    firstName.setText("Josef");
    middleName.setText("Ashton");
    lastName.setText("Mamo");
    currDate.setText(setCurrDate);
    const pdfBytes = await pdfDoc.save();
    await writeFile(output, pdfBytes);
  } catch (err) {
    console.error("Error", err);
  }
}

// async function saveFilledForm(pdfDoc, output: string) {
//   try {
//     const filledFormBytes = await pdfDoc.save();
//     writeFile(output, (err, data) => {});
//     console.log("Filled form saved succesfully");
//   } catch (err) {
//     console.error("Error saving filled form:", err);
//   }
// }

async function main() {
  const input = "ddd_new.pdf";
  const output = "output.pdf";

  await fillForm(input, output);
  //   await saveFilledForm(pdfDoc, output);
}
main().catch((err) => console.error("Error", err));
