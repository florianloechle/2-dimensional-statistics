/** @format */
import React from 'react';
import ReactDOM from 'react-dom';

class StatisticsApp extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello World</h1>
      </div>
    );
  }
}

const root = document.getElementById('root');

ReactDOM.render(<StatisticsApp />, root);
