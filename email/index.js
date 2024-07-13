const send = require('./send')
const axios = require('axios')
const cheerio = require('cheerio')

const req = axios.create({
    headers: {
        'User-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:127.0) Gecko/20100101 Firefox/127.0'
    },
    baseURL: 'https://www.motorsport.com/f1/news/'
});

async function getNews(){
    const raw = await req.get()
    console.log(raw.data)
}
// send.send('Frank', 'me@trentwil.es', 'A New Email', 'test', '<i>test</i>')