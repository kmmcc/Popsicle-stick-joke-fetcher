const Sequelize = require('sequelize');

const db = new Sequelize('practice', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

console.log('SUCCESS CONNECT 2 DB')

db.authenticate()
  .then(() => {
    console.log('success connect 2 database')
  })
  .catch(err => {
    console.error('oh snap! the db is busted.')
  });

const Joke = db.define('joke', {
  jokeText: Sequelize.STRING
})


Joke.sync()


module.exports.db = db;
module.exports.Joke = Joke;