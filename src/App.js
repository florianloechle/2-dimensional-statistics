/** @format */

import React from 'react';
import PointInput from './components/PointInput';
import ContingencyTable from './components/ContingencyTable';
import SelectionToggle from './components/Toggle';
import Statistic from './lib/Statistics';
import StatisticView from './components/StatisticView';
import styles from './App.module.css';
import { CSSTransition } from 'react-transition-group';

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
    }
    const { matrix, x, y } = data;

    this.setState({
      statistic: new Statistic(Statistic.createFromTable(matrix, x, y)),
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
          <div className={styles.sheet} {...this.props}>
            <SelectionToggle onChange={this.handleInputSelection} />
            {tableIsActive ? (
              <ContingencyTable
                initalRows={3}
                initalColumns={3}
                onSubmit={this.handleData}
                onReset={this.onReset}
              />
            ) : (
              <PointInput onSubmit={this.handleData} onReset={this.onReset} />
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
      </div>
    );
  }
}

export default StatisticApp;
