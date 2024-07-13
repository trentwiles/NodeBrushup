const send = require('./send')
const axios = require('axios')
const cheerio = require('cheerio')
const BASE_URL = 'https://www.motorsport.com'

const req = axios.create({
    headers: {
        'User-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:127.0) Gecko/20100101 Firefox/127.0'
    },
    baseURL: BASE_URL
});

async function getNews(){
    const raw = await req.get('/f1/news/')
    const html = raw.data
    const $ = cheerio.load(html)

    var newsItems = []

    $('a.ms-item').each((index, element) => {
        const x = cheerio.load($(element).html())

        var title = x('div.ms-item__title').text()
        var url = BASE_URL + $(element).attr('href')
        var time = x('time.ms-item__date').text().trim()
        var image = x('img').attr('src')
        var metaData = {"title": title, "url": url, "time": time, 'image': image}

        newsItems.push(metaData)
    })

    var htm = "<hr>"
    for(var i = 0; i < 3; i++){
        var current = newsItems[i]
        htm += `${current["title"]}`
        htm += "<hr>"
    }

    console.log(htm)
}
getNews()
// send.send('Frank', 'me@trentwil.es', 'A New Email', 'test', '<i>test</i>')