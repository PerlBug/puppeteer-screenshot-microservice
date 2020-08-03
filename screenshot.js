const puppeteer = require('puppeteer');

async function takeScreenshot(url, width, height, waitForId, screenshotId) {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  await page.setViewport({
    width: width || 500,
    height: height || 500,
    deviceScaleFactor: 2,
  });
  await page.goto(url);
  await page.waitForSelector(waitForId);
  const screenshot = await screenshotDOMElement(screenshotId, 0, page); //returns image file
  return screenshot;
}

async function screenshotDOMElement(selector, padding = 0, page) {
  const rect = await page.evaluate((selector) => {
    const element = document.querySelector(selector);
    const { x, y, width, height } = element.getBoundingClientRect();
    return { left: x, top: y, width, height, id: element.id };
  }, selector);

  return page.screenshot({
    clip: {
      x: rect.left - padding,
      y: rect.top - padding,
      width: rect.width + padding * 2,
      height: rect.height + padding * 2,
    },
    encoding: 'binary',
  });
}
module.exports = { takeScreenshot };