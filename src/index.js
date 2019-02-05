/** @format */
import React from 'react';
import ReactDOM from 'react-dom';
import ContingencyTable from './components/ContingencyTable';
import './styles/index.css';

class StatisticsApp extends React.Component {
  state = {
    // userChoice: null
    userChoice: 2,
  };

  setUserChoice(value) {
    this.setState({ userChoice: value });
  }

  renderChoice() {
    if (this.state.userChoice === null) {
      return (
        <div className="centerDiv">
          <button
            className="mainButton"
            onClick={this.setUserChoice.bind(this, 1)}
          >
            Manual Input
          </button>
          <br />
          <br />
          <button
            className="mainButton"
            onClick={this.setUserChoice.bind(this, 2)}
          >
            Contigency Table
          </button>
        </div>
      );
    } else if (this.state.userChoice === 1) {
      return <div>Manual Input</div>;
    } else if (this.state.userChoice === 2) {
      return (
        <div>
          <ContingencyTable />
        </div>
      );
    }
  }

  render() {
    return <div>{this.renderChoice()}</div>;
  }
}

const root = document.getElementById('root');

ReactDOM.render(<StatisticsApp />, root);
