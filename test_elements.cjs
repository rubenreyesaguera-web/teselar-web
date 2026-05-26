const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    page.on('pageerror', err => console.log('PAGE ERROR:', err.message));

    await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
    
    const elements = await page.evaluate(() => {
        const sections = Array.from(document.querySelectorAll('section')).map(s => {
            return {
                id: s.id,
                h2: s.querySelector('h2')?.textContent || s.querySelector('h1')?.textContent || 'No title',
                class: s.className
            };
        });
        
        const serviceCards = Array.from(document.querySelectorAll('#services .glass-card')).map(card => {
            return {
                title: card.querySelector('h3')?.textContent,
                price: card.querySelector('.bg-innovacion')?.textContent,
                featuresCount: card.querySelectorAll('li').length
            };
        });
        
        return {
            sections,
            serviceCards,
            bodyTextLength: document.body.innerText.length,
            html: document.body.innerHTML.substring(0, 1000)
        };
    });
    
    console.log('SECTIONS FOUND:', JSON.stringify(elements.sections, null, 2));
    console.log('SERVICES FOUND:', JSON.stringify(elements.serviceCards, null, 2));
    console.log('BODY TEXT LENGTH:', elements.bodyTextLength);
    
    await browser.close();
})();
