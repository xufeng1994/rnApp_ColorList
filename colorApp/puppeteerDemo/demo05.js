const puppeteer = require("puppeteer");
const fs = require('fs');

(async () => {
    const browser = await puppeteer.launch({ headless: true })
    const page = await browser.newPage()
    await page.goto('https://search.jd.com/Search?keyword=%E6%89%8B%E6%9C%BA&enc=utf-8&suggest=1.def.0.V11&wq=shouji&pvid=f2cbcc83f01e4d4a9330627d9137cb9d')

    await page.setViewport({ width: 1920, height: 1080 });
    const documentSize = await page.evaluate(() => {
        return {
            width: document.documentElement.clientWidth,
            height: document.body.clientHeight,
        }
    })
    await page.screenshot({ path: "long.png", clip: { x: 0, y: 0, width: 1920, height: documentSize.height } });

    // let inputElement = Array.from(document.querySelector('#key'))
    const goodsSku = await page.evaluate(() => {
        let goodsList = Array.from(document.querySelectorAll('#J_goodsList ul'))

        let goodLink = goodsList.map(goodsList => {
            return goodsList.textContent
        })
        return goodLink
    })
    // console.log(goodsSku)
    // const sku = goodsSku.toString()
    // let writerStream = fs.createWriteStream('商品名称.txt');
    // await writerStream.write(sku, 'UTF8');
    // await writerStream.end();



    // const aWindowHandle = await page.evaluateHandle(() => Promise.resolve(window));
    // aWindowHandle; // Handle for the window object. 

    // // const aHandle = await page.evaluateHandle('document'); // Handle for the 'document'.

    // const aHandle = await page.evaluateHandle(() => document.body);
    // const resultHandle = await page.evaluateHandle(body => body.innerHTML, aHandle);
    // console.log(await resultHandle.jsonValue());
    // await resultHandle.dispose();
    // /**
    //  * Page.exposeFunction，这个 API 用来在页面注册全局函数
    //  * 
    //  * 因为有时候需要在页面处理一些操作的时候需要用到一些函数
    //  * 虽然可以通过 Page.evaluate() API 在页面定义函数
    //  * 
    //  */
    // const docSize = await page.evaluate(() => {
    //     function getPageSize() {
    //         return {
    //             width: document.documentElement.clientWidth,
    //             height: document.body.clientHeight,
    //         }
    //     }

    //     return getPageSize();
    // });

    browser.close();
})();