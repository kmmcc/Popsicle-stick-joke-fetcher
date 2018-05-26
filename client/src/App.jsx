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
    this.setState({ todo: e.target.value });
  }

  jokeSearch(e) {
    e.preventDefault()

    console.log('jokesearch fire')
    
    axios.post('/jokesearch', {
      search: e
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    })

    e.target.reset();
  }

  fetchJokes() {
    console.log(this.state.jokes)

    axios.get('/jokesearch')
    .then((response) => {
      console.log('RESPONSE FROM GET FRONT END', response)
    })
    .catch((error) => {
      console.log('FRONT END ERROR', error)
    })

  }

  render () {
    return (
      <div>
        <div> Popsicle Stick Jokes </div>
        <div>
        <form onSubmit={e => this.jokeSearch(e)}>
          <input onKeyUp={e => this.handleInput(e)} required id="searchInput" type="text" name="searchInput"/>
          <input id="searchButton" type="submit" name="searchButton"/>
        </form>
      </div>
        <div> <JokeDisplay /> </div>
      </div>
    )
  }

}



export default App;