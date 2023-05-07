const puppeteer = require('puppeteer');

async function comparePrices() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto('https://www.technodom.kz/p/naushniki-vstavnye-apple-airpods-3rd-generation-mme73rua-254608?recommended_by=instant_search&recommended_code=airpods');
    const technodomPrice = await page.evaluate(() => {
        const price = document.querySelector('.--accented').innerText;
        return parseFloat(price.replace(/[^0-9.-]+/g, ''))
    });

    await page.goto('https://www.sulpak.kz/g/naushniki_besprovodniye_apple_airpods_3rd_generation_mme73rua');
    const sulpakPrice = await page.evaluate(() => {
        const price = document.querySelector('.product__price').innerText;
        return parseFloat(price.replace(/[^0-9.-]+/g, ''))
    });

    await page.goto('https://shop.kz/offer/bluetooth-garnitura-apple-airpods-3rd-gen-white/');
    const shopkzPrice = await page.evaluate(() => {
        const price = document.querySelector('.item_current_price').innerText;
        return parseFloat(price.replace(/[^0-9.-]+/g, ''))
    });

    console.log('technodom: ' + technodomPrice);
    console.log('sulpak: ' + sulpakPrice);
    console.log('shopkz: ' + shopkzPrice);
    
    if (technodomPrice == sulpakPrice && sulpakPrice == shopkzPrice ) {
        console.log('Цена =')
    } else if (technodomPrice < sulpakPrice && technodomPrice < shopkzPrice){
        console.log('technodom дешевле ')
    } else if (sulpakPrice < technodomPrice && sulpakPrice < shopkzPrice ){
        console.log('sulpak дешевле')
    } else if (shopkzPrice < technodomPrice && shopkzPrice < sulpakPrice  ){
        console.log('shopkz дешевле')

    } else {
        console.log('No')
    }
    await browser.close();
}

comparePrices();