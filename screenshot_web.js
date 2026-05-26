const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({ width: 1400, height: 2500 });
    // Go to vite dev server or preview server
    await page.goto('http://localhost:4173', { waitUntil: 'networkidle0' });
    await page.screenshot({ path: 'screenshot_web.png', fullPage: true });
    await browser.close();
})();
