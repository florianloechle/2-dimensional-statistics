/** @format */

import React from 'react';
import Layout from './components/Layout';
import PointInput from './components/PointInput';
import ContingencyTable from './components/ContingencyTableInput';
import SelectionToggle from './components/Toggle';
import Statistic from './lib/Statistics';
import StatisticView from './components/StatisticView';
import styles from './App.module.css';

/**
 * App component that hold the apps current state.
 */
class StatisticApp extends React.Component {
  state = {
    statistic: null,
    tableIsActive: null,
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

  render() {
    const { tableIsActive, statistic } = this.state;
    return (
      <Layout>
        <SelectionToggle onChange={this.handleInputSelection} />
        {tableIsActive ? (
          <ContingencyTable
            initalRows={2}
            initalColumns={2}
            onSubmit={this.handleData}
          />
        ) : (
          <PointInput onSubmit={this.handleData} />
        )}
        {statistic !== null ? (
          <StatisticView statistic={statistic} />
        ) : (
          <div className={styles.notFound}>
            <h2>Warte auf Daten...</h2>
          </div>
        )}
      </Layout>
    );
  }
}

export default StatisticApp;
