const express = require('express')
const app = express()
const port = 3000
// NEEDED for logins
var session = require('express-session');

app.use(express.urlencoded({ extended: false }))
app.use(session({
  resave: false, // don't save session if unmodified
  saveUninitialized: false, // don't create session until something stored
  secret: 'HNSUWFD328743DUW32D'
}));

// GITHUB EXAMPLES USES THIS MIDDLEWARE
// Session-persisted message middleware

app.use(function(req, res, next){
  var err = req.session.error;
  var msg = req.session.success;
  delete req.session.error;
  delete req.session.success;
  res.locals.message = '';
  if (err) res.locals.message = '<p class="msg error">' + err + '</p>';
  if (msg) res.locals.message = '<p class="msg success">' + msg + '</p>';
  next();
});

app.engine('.ejs', require('ejs').__express);
app.set('view engine', 'ejs');

// respond with "hello world" when a GET request is made to the homepage
app.get('/', (req, res) => {
  var date_time = new Date();
  res.render('home', {year: date_time.getFullYear(), day: date_time.getDay(), title: "Home"})
})


/*
LOGIN PAGE
-----------------------
Just render the login page, easy enough
*/
app.get('/login', function(req, res){
  var title = "Login"
  res.render('login', {title: title});
});

app.post('/login', function(req, res){
  var user = req.body.username
  var password = req.body.password

  req.session.regenerate(function(){
    // Store the user's primary key
    // in the session store to be retrieved,
    // or in this case the entire user object
    req.session.user = user;
    req.session.success = 'Authenticated as ' + user.name
      + ' click to <a href="/logout">logout</a>. '
      + ' You may now access <a href="/restricted">/restricted</a>.';
    res.redirect('user');
  });

  
})

app.get('/user', function(req, res){
  res.send(req.session.user + "-")
})

/*
LOGOUT PAGE
-----------------------
Destroy the session
*/
app.get('/logout', function(req, res){
  // destroy the user's session to log them out
  // will be re-created next request
  req.session.destroy(function(){
    res.redirect('/');
  });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})