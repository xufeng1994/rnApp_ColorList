const puppeteer = require("puppeteer");

(
    async () => {
        const browser = await puppeteer.launch({
            // executablePath:'/Users/xufeng/Desktop/github/colorApp/node_modules/puppeteer/.local-chromium/',
            timeout:60000,
            ignoreHTTPSErrors:true,
            devtools:false,
            headless:true
        });
        const page = await browser.newPage()
        await page.goto('https://www.jianshu.com/u/40909ea33e50')
        
        await page.screenshot({
            path:'/Users/xufeng/Desktop/github/colorApp/screenShot/jiansu.png',
            type:'png',
            fullPage:true
        })
        browser.close()
    }
)();
