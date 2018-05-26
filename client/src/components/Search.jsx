import React from 'react';
import ReactDOM from 'react-dom';

class Search extends React.Component {
  render () {
    return (
      <div>
        <form>
          <input id="searchInput" type="text" name="searchInput"/>
          <input id="searchButton" type="submit" name="searchButton"/>
        </form>
      </div>
    )
  }
}


export default Search;