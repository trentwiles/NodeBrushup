const axios = require('axios')
const cheerio = require('cheerio')

const BASE_URL = "https://books.toscrape.com/"

const req = axios.create({
    headers: {
        'User-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:127.0) Gecko/20100101 Firefox/127.0'
    },
    baseURL: BASE_URL
});

async function extractBooks(){
    const raw = await req.get()
    const $ = cheerio.load(raw.data)

    $('li.col-xs-6').each((index, element) => {
        var x = cheerio.load(element)
        console.log(x('a').text())
        console.log(BASE_URL + x('a').attr('href'))
    })
}

async function extractCategories(){
    const raw = await req.get()
    const $ = cheerio.load(raw.data)

    const x = cheerio.load($('ul.nav').html())
    x('li').each((index, element) => {
        console.log(x(element).text().trim())
    })
    
}

extractCategories()