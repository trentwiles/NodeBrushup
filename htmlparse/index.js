const axios = require('axios')
const cheerio = require('cheerio')

const BASE_URL = "https://books.toscrape.com/"

const req = axios.create({
    headers: {
        'User-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:127.0) Gecko/20100101 Firefox/127.0'
    },
    baseURL: BASE_URL
});

async function extractBooks(path="", catName=""){
    const raw = await req.get(path)
    const $ = cheerio.load(raw.data)

    $('li.col-xs-6').each((index, element) => {
        var x = cheerio.load(element)
        console.log(x('a').text())
        console.log(BASE_URL + x('a').attr('href'))
        if(catName != ""){
            console.log("(book above is under category " + catName)
        }
    })
}

async function extractCategories(){
    const raw = await req.get()
    const $ = cheerio.load(raw.data)

    const x = cheerio.load($('ul.nav').html())
    x('li').each((index, element) => {
        var name = x(element).text().trim()
        const z = cheerio.load(x(element).html())
        var path = z('a').attr("href")
        console.log(name)
        extractBooks(path, name)
    })
    console.log("===========================================================")
    console.log("===========================================================")
    
}

async function pageination(nextPath=""){
    if(nextPath == ""){
        // we are on the first page
        const raw = await req.get(nextPath)
        const $ = cheerio.load(raw.data)
        $('a').each((index, element) => {
            if($(element).text() == "next"){
                console.log($('title').text())
                return pageination($(element).attr('href'))
            }
        })
    }else{
        // we are not on the first page
    }
}

pageination()