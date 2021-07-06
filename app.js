const express = require('express');
const bodyParser = require('body-parser');
const date = require(__dirname + '/date.js');
const app = express();

app.use(express.static(__dirname + '/public'));

let items = [];

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', function(req, res) {
  const day = date.getDate();
  res.render("list", {
    dayType: day,
    newListItems: items
  });
});

app.post('/', function(req, res) {
  if (req.body.item) {
    items.push(req.body.item);
  } else if (req.body.remove) {
    items.splice(req.body.remove, 1);
  }
  else if (req.body.reset){
    items = [];
  }
  res.redirect('/');
});

app.get('/about', function(req, res) {
  res.render('about');
});

app.listen(3000, function() {
  console.log('Server started on port 3000');
});
