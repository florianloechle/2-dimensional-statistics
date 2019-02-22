/** @format */

import React from 'react';
import PointInput from './components/PointInput';
import ContingencyTable from './components/ContingencyTableInput';
import SelectionToggle from './components/Toggle';
import StatisticView from './components/StatisticView';

import Statistic from './lib/Statistics';
import styles from './App.module.css';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/flip.css';
import Alert from 'react-s-alert';
import { CSSTransition } from 'react-transition-group';

const maxPoints = 100;
const minPoints = 2;
const maxDifferentPoints = 30;
/**
 * App component that hold the apps current state.
 */
class StatisticApp extends React.Component {
  state = {
    statistic: null,
    tableIsActive: false,
  };

  handleInputSelection = tableIsActive => {
    this.setState({
      tableIsActive: tableIsActive,
    });
  };

  handleData = data => {
    if (Array.isArray(data)) {
      return this.setState({
        statistic: new Statistic(data),
      });
    } else if (!data) {
      return this.setState({
        statistic: null,
      });
    }
    const { matrix, x, y } = data;

    this.setState({
      statistic: Statistic.createFromTable(matrix, x, y),
    });
  };

  onReset = () => {
    return this.setState({
      statistic: null,
    });
  };

  render() {
    const { tableIsActive, statistic } = this.state;
    return (
      <div className={styles.base}>
        <header className={styles.header} />
        <main>
          <div className={styles.sheet}>
            <SelectionToggle onChange={this.handleInputSelection} />
            {tableIsActive ? (
              <ContingencyTable
                initalRows={3}
                initalColumns={3}
                onSubmit={this.handleData}
                onReset={this.onReset}
              />
            ) : (
              <PointInput
                onSubmit={this.handleData}
                onReset={this.onReset}
                maxPoints={maxPoints}
                minPoints={minPoints}
                maxDifferentPoints={maxDifferentPoints}
              />
            )}
            <CSSTransition
              in={statistic !== null}
              timeout={700}
              classNames="growIn"
            >
              <StatisticView statistic={statistic} />
            </CSSTransition>
          </div>
        </main>
        <footer className={styles.footer}>
          <a href="https://github.com/schottilol/2-dimensional-statistics">
            <img
              alt="GitHub Stars"
              src="https://img.shields.io/github/stars/schottilol/2-dimensional-statistics.svg?label=Github&logoColor=red&style=social"
            />
          </a>
        </footer>
        <Alert
          effect={'flip'}
          position={'bottom'}
          timeout={1500}
          html={false}
          stack={false}
          offset={0}
          beep={false}
        />
      </div>
    );
  }
}

export default StatisticApp;
