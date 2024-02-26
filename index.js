require('dotenv').config();
const express = require('express');
const cors = require('cors');
const dns = require('dns')
const app = express();
const bodyParser = require('body-parser');
// Basic Configuration
const port = process.env.PORT || 3000;

const shortenedArr = []

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});


app.post('/api/shorturl', function(req, res) {
  const url = req.body.url;
  const isValid = /https:\/\/|http:\/\//g.test(url)
  console.log(isValid)
  if(!isValid) {
    res.json({ error: 'invalid url' });
  } else {
    shortenedArr.push(url);
    res.json({original_url : url, short_url : shortenedArr.length});
  }
})

app.get("/api/shorturl/:id", function(req, res) {
  const id = req.params.id
  if(!isNaN(parseInt(id))) {
    if(parseInt(id) <= shortenedArr.length) res.redirect(shortenedArr[parseInt(id) - 1])
  }
})

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
