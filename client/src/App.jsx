import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

//import Search from './components/Search.jsx';
import JokeDisplay from './components/JokeDisplay.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      jokes: []
    }
  }

  componentDidMount() {
    this.fetchJokes()
  }

  handleInput(e) {
    this.setState({ input: e.target.value });
  }

  jokeSearch(e) {
    var context = this
    e.preventDefault()

    console.log('jokesearch fire')
    
    axios.post('/jokesearch', 
    {
      search: this.state.input
    })
    .then(function (response) {
      console.log('that response.data.results', response.data.results);
      console.log('this', this)
      context.setState({ jokes: response.data.results });
    })
    .catch(function (error) {
      console.log(error); 
    })

    e.target.reset();
    
  }

  fetchJokes() {

    axios.get('/jokesearch')
    .then((response) => {
      console.log('RESPONSE FROM GET FRONT END', response.data)
      // this.setState({ jokes: [...this.state.jokes, response.data] });
      console.log('STATE ON FRONT END', this.state.jokes)
    })
    .catch((error) => {
      console.log('FRONT END ERROR', error)
    })

  }

  render () {
    return (
      <div>
        <div> <h1> Popsicle Stick Jokes </h1> </div>
        <div>
        <form onSubmit={e => this.jokeSearch(e)}>
          <input onKeyUp={e => this.handleInput(e)} required id="searchInput" type="text" name="searchInput"/>
          <input id="searchButton" type="submit" name="searchButton"/>
        </form>
      </div>
        {this.state.jokes[0] && (<div> {this.state.jokes.map((joke) => <JokeDisplay joke={joke.joke}/>)} </div>)}
      </div>
    )
  }

}



export default App;