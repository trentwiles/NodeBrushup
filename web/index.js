const express = require('express')
const app = express()
const port = 3000
var cookieParser = require('cookie-parser');

// Serving Static files
// Examples of static files include images, frontend JS scripts,
// and static HTML files
// This line will expose everything in the public folder
app.use(express.static('public'))

// For example, if you would like to view the "test.txt" file in public,
// you would access localhost:3000/test.txt

// This can be messy, so you may want to host static files under a folder
app.use('/_', express.static("files"))

// Basic GET request
app.get('/', (req, res) => {
    // playing with cookies:
    if(req.cookies.times){
        res.cookie('times', req.cookies.times + 1, 60000)
    }else{
        res.cookie('times', 1, 60000)
    }
    res.send(`This is a GET request, you have been to this page ${req.cookies.times} times!`)
})

// Basic POST request
app.post('/', (req, res) => {
    res.send('This is a POST request')
})

// you can also add methods for PUT & DELETE


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})