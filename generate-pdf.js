import puppeteer from "puppeteer";
import * as path from "path";
import resume from "./resume.json" with { type: "json" };

(async () => {
  if(!resume.basics.hasOwnProperty('pdfName')) {
    console.info('resume.basics.pdfName not configured');
    process.exit();
  }

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(`file:${path.resolve('dist/index.html')}`);

  // Generate PDF
  await page.pdf({
    path: `dist/${resume.basics.pdfName}`,
    format: 'A4',
    printBackground: true,
    displayHeaderFooter: false,
    margin: {
      top: '10mm',
      bottom: '10mm',
    },
    scale: 0.8
  });

  await browser.close();
})();
