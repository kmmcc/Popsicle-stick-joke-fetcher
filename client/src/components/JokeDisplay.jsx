import React from 'react';
import ReactDOM from 'react-dom';

function JokeDisplay (props) {
    return (
      <div>
        {props.joke}
      </div>
    )
  }

export default JokeDisplay;