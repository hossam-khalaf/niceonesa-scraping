const puppeteer = require('puppeteer')

async function scrapeProduct(url) {
	const browser = await puppeteer.launch()
	const page = await browser.newPage()
	await page.goto(url)

	// get img element by XPath
	const [img] = await page.$x(
		'//*[@id="__layout"]/div/main/div/div/div/section/div/div[2]/div/div/div[3]/div[1]/div[1]/div[2]/a/picture/figure/img'
	)

	// get img src and turn it to JSON
	const src = await img.getProperty('src')
	const srcTxt = await src.jsonValue()

	// get product name by XPath
	const [name] = await page.$x('//*[@id="product-title"]')

	// getproduct name  and turn it to JSON
	const txt = await name.getProperty('textContent')
	const rawTxt = await txt.jsonValue()

	console.log({ srcTxt, rawTxt })

	browser.close()
}

scrapeProduct('https://niceonesa.com/ar/makeup/face/foundation/?page=1')
