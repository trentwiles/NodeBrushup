const express = require('express')
const app = express()
const port = 3000
var cookieParser = require('cookie-parser');
const axios = require("axios");

// Serving Static files
// Examples of static files include images, frontend JS scripts,
// and static HTML files
// This line will expose everything in the public folder
app.use(express.static('public'))

// For example, if you would like to view the "test.txt" file in public,
// you would access localhost:3000/test.txt

// This can be messy, so you may want to host static files under a folder
app.use('/_', express.static("files"))

// token used for storing cookie values, needs to be set
app.use(cookieParser('1312134234234'));

// tell Express to render EJS files
// By default, the program will look in the views folder
app.engine('.ejs', require('ejs').__express);

// this is so that we don't have to use file extentions when specifying which template to use
app.set('view engine', 'ejs');

const CITIES = ["New York", "Boston", "Oakland"]
const NAME = "trent"

// Basic GET request
app.get('/', (req, res) => {
    // playing with cookies:
    if(req.cookies.times){
        res.cookie('times', parseInt(req.cookies.times,10) + 1, 60000)
    }else{
        res.cookie('times', 1, 60000)
    }
    res.send(`This is a GET request, you have been to this page ${req.cookies.times} times!`)
})

app.get('/template', (req, res) => {
    res.render("default.ejs", {cities: CITIES, myName: NAME})
})

app.get('/templateWithHTTP', (req, res) => {
    // 
    axios
        .get("https://www.reddit.com/r/popular.json")
        // Show response data
        .then((r) => 
            res.render("reddit.ejs", {api: r.data})
        )
        .catch((err) => console.log(err));
    
})

// Basic POST request
app.post('/', (req, res) => {
    res.send('This is a POST request')
})

// you can also add methods for PUT & DELETE

// ERROR PAGES
app.get('/404', function(req, res, next){
    next();
});

app.get('/403', function(req, res, next){
    var err = new Error('not allowed!');
    err.status = 403;
    next(err);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})