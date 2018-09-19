const puppeteer = require("puppeteer");
const fs = require("fs");

(async () => {

    const browser = await puppeteer.launch({
        headless: true
    })
    const page = await browser.newPage();
    // 进入页面
    await page.goto('https://music.163.com/#')

    // 点击搜索框拟人输入 
    const musicName = '五月天';
    await page.type('.txt.j-flag', musicName)

    // 回车
    await page.keyboard.press('Enter');
    
    // 获取歌曲列表的 iframe
    await  page.waitFor(2000);
    let iframe = await page.frames().find(f=>f.name()==='contentFrame')
    const song_ls_selector = await iframe.$('.srchsongst')

    await page.screenshot({
        path:'/Users/xufeng/Desktop/github/colorApp/screenShot/Mayday01.png',
        type:'png',
        fullPage:true
    })
    // await page.click('#auto-id-lR1FHOn8pMEuMpA9 > li:nth-child(1) > a > em')
    // await page.screenshot({
    //     path:'/Users/xufeng/Desktop/github/colorApp/screenShot/Mayday02.png',
    //     type:'png',
    //     fullPage:true
    // })
      // 获取歌曲 五月天 的地址

    const selectedSongHref = await iframe.evaluate(e => {
        const songList = Array.from(e.childNodes)
        const idx = songList.findIndex(v => v.childNodes[1].innerText.replace(/\s/g,'')==='五月天');
        return songList[idx].childNodes[1].firstChild.firstChild.firstChild.href;
    },song_ls_selector)


    console.log('songUrl:',selectedSongHref)
    await page.goto(selectedSongHref)

    // await page.waitFor(2000)
    // iframe = await page.frames.find(f=>f.name() ==='contentFrame')
    // const unfoldButon = await iframe.$('#flag_ctrl');
    // await unfoldButon.click();

    // const lyric_Selector = await iframe.$('#liyric-content');
    // const liyricCtn = await iframe.evaluate(e => {
    //     return e.innerText;
    // },lyric_Selector)

    // console.log(liyricCtn)

    // await page.screenshot({
    //     path:'/Users/xufeng/Desktop/github/colorApp/screenShot/music.png',
    //     fullPage:true
    // });

    browser.close()
}
)();