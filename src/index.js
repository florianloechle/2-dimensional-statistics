/** @format */
import React from 'react';
import ReactDOM from 'react-dom';

class StatisticsApp extends React.Component {
  render() {
    return (
      <div>
        <form>
          <textarea />
          <button type="submit" />
        </form>
        <h1>Hi</h1>
      </div>
    );
  }
}

const root = document.getElementById('root');

ReactDOM.render(<StatisticsApp />, root);
