/** @format */
import React from 'react';
import ReactDOM from 'react-dom';
import StatisticApp from './App';
import 'bootstrap/dist/css/bootstrap.min.css';

/* class StatisticsApp extends React.Component {
  state = {
    userChoice: null,
    //userChoice: 2
  };

  setUserChoice(value) {
    this.setState({ userChoice: value });
  }

  renderChoice() {
    if (this.state.userChoice === null) {
      return (
        <div>
          <div className="centerDiv">
            <div className="card">
              <div className="card-body">
                <div className="custom-control custom-radio">
                  <input
                    type="radio"
                    id="checkContigencyTable"
                    name="radioInput"
                    className="custom-control-input"
                    value="1"
                  />
                  <label
                    className="custom-control-label"
                    for="checkContigencyTable"
                  >
                    Kontigenztafel
                  </label>
                </div>
                <div className="custom-control custom-radio">
                  <input
                    type="radio"
                    id="checkDotSequence"
                    name="radioInput"
                    className="custom-control-input"
                    value="2"
                  />
                  <label
                    className="custom-control-label"
                    for="checkDotSequence"
                  >
                    Punktfolge
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="rightBottomDiv">
            <button
              type="button"
              class="btn btn-outline-primary"
              onClick={this.setUserChoice.bind(this, 1)}
            >
              Weiter
            </button>
          </div>
        </div>
      );
    } else if (this.state.userChoice === 1) {
      return (
        <div>
          <DotSequency />
        </div>
      );
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
} */

const root = document.getElementById('root');

ReactDOM.render(<StatisticApp />, root);
