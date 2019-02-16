/** @format */

import React from 'react';
import Layout from './components/Layout';
import DotSequency from './components/DotSequency';
import ContingencyTable from './components/ContingencyTable';
import SelectionToggle from './components/Toggle';
import Statistic from './lib/Statistics';
import './App.module.css';

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
          <div>Hier kommen die Daten rein</div>
        ) : (
          <div>Keine Daten</div>
        )}
      </Layout>
    );
  }
}

export default StatisticApp;
