/** @format */

import React from 'react';
import Layout from './components/Layout';
import styles from './App.module.css';
import DotSequency from './components/DotSequency';
import ContingencyTable from './components/ContingencyTable';
import SelectionToggle from './components/Toggle';
import Statistic from './lib/Statistics';
import StatisticView from './components/StatisticView';
import './App.module.css';
// import Statistic from './lib/Statistics';
// import TextInput from './components/Input/Text';

const providedSample = [
  [20, 0.2],
  [20, 0.3],
  [30, 0.3],
  [20, 0.3],
  [30, 0.4],
  [20, 0.1],
  [30, 0.3],
  [40, 0.3],
  [10, 0.1],
  [40, 0.2],
  [30, 0.3],
  [40, 0.3],
  [30, 0.3],
  [20, 0.1],
  [30, 0.3],
  [40, 0.3],
  [30, 0.4],
  [10, 0.1],
  [20, 0.3],
  [10, 0.2],
  [30, 0.3],
  [20, 0.3],
  [10, 0.2],
  [40, 0.3],
  [30, 0.2],
];

class StatisticApp extends React.Component {
  state = {
    statistic: new Statistic(providedSample),
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
      statistic: Statistic.createFromTable(matrix, x, y),
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
          <DotSequency onSubmit={this.handleData} />
        )}
        {statistic !== null ? (
          <StatisticView statistic={statistic} />
        ) : (
          <div>Keine Daten</div>
        )}
      </Layout>
    );
  }
}

export default StatisticApp;
