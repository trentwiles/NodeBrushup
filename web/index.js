const express = require('express')
const app = express()
const port = 3000

// Serving Static files
// Examples of static files include images, frontend JS scripts,
// and static HTML files
// This line will expose everything in the public folder
app.use(express.static('public'))

// Basic GET request
app.get('/', (req, res) => {
    res.send('This is a GET request')
})

// Basic POST request
app.post('/', (req, res) => {
    res.send('This is a POST request')
})

// you can also add methods for PUT & DELETE


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})