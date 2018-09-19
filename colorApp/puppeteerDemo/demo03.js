const puppeteer = require('puppeteer');

//  滑动后长截屏
(async () => {
	const browser = await puppeteer.launch({headless:false});
	const page = await browser.newPage();
	await page.goto('https://jd.com');
	await page.setViewport({width:1920, height:1080});
	const documentSize = await page.evaluate(() => {
		return {
			width: document.documentElement.clientWidth,
			height : document.body.clientHeight,
		}
	})
	await page.screenshot({path:"longjd.png", clip : {x:0, y:0, width:1920, height:documentSize.height}});

	await browser.close();
})();