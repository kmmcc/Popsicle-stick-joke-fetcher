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
  axios({ 
    method: 'get',
    headers: {
      Accept: 'application/json',
  },
    url: 'https://icanhazdadjoke.com/search' + '?term=dog' + '&limit=5',
    limit: 5,
    search_term: req.search
  })
  .then(function(response) {

    for (var i = 0; i < response.data.results.length; i++) {
      db.Joke.create( { jokeText: response.data.results[i].joke } );
    }

  })
  .catch(function(error) {
    console.log(error);
  })
})

app.get('/jokesearch', function(req, res) {
  db.Joke.findAll().then(jokes => {
    console.log('JOKES IN GET jokes[1].dataValues.jokeText', jokes[1].dataValues.jokeText)
    res.send(jokes[1].dataValues.jokeText)

  })
})