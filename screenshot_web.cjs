const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
        headless: "new"
    });
    const page = await browser.newPage();
    page.on('pageerror', err => {
        console.error('Page error in browser:', err);
    });
    page.on('console', msg => {
        console.log('BROWSER LOG:', msg.text());
    });
    await page.setViewport({ width: 1400, height: 5200 }); // Make height larger to accommodate full page
    await page.goto('http://localhost:3000/es', { waitUntil: 'networkidle2' });
    
    // Scroll down slowly to trigger all scroll animations
    await page.evaluate(async () => {
        await new Promise((resolve) => {
            let totalHeight = 0;
            const distance = 100;
            const timer = setInterval(() => {
                const scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;

                if (totalHeight >= scrollHeight) {
                    clearInterval(timer);
                    resolve();
                }
            }, 50); // scroll every 50ms
        });
    });

    // Wait a brief moment for any final animations to finish
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Scroll back to top to ensure clean screenshot if fullPage is false, 
    // but since we are taking a fullPage screenshot, scrolling down is enough to trigger animations.
    await page.screenshot({ path: 'screenshot_web.png', fullPage: true });
    await browser.close();
})();
