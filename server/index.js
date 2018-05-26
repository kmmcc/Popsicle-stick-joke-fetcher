const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const path = require('path');
const axios = require('axios');

const db = require('../database')

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, "../client/dist")));
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

app.listen(PORT, function(err, success) {
  if (err) {
    console.log ('Express server error!');
  } else {
    console.log('Listening on port ' + PORT);
  }
})

app.post('/jokesearch', function(req, res) {
  console.log('REQ IN SERVER INDEX', req.query, "GGGGGGGG", req.body.search)
  axios({ 
    method: 'get',
    headers: {
      Accept: 'application/json',
  },
    url: 'https://icanhazdadjoke.com/search' + '?term=' + req.body.search,
    limit: 5,
    search_term: req.search
  })
  .then(function(response) {

    for (var i = 0; i < response.data.results.length; i++) {
      db.Joke.create( { jokeText: response.data.results[i].joke } );
    }
    res.send(response.data)
  })
  .catch(function(error) {
    console.log(error);
  })
})

app.get('/jokesearch', function(req, res) {
  db.Joke.findAll().then(jokes => {
    console.log('JOKES IN GET jokes[1].dataValues.jokeText', jokes[1].dataValues.jokeText)
    var jokeArray = []
    for (var i = 0; i < jokes.length; i++) {
      jokeArray.push(jokes[i].dataValues.jokeText)
    }
    res.send(jokeArray)
  })
})