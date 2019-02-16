/** @format */

import React from 'react';
import Layout from './components/Layout';
import DotSequency from './components/DotSequency';
import './App.module.css';
import Statistic from './lib/Statistics';
import ContingencyTable from './components/ContingencyTable';

class StatisticApp extends React.Component {
  state = {
    statistic: null,
    tableIsActive: true,
    isValidData: false,
  };

  toggleInput = () => {
    this.setState(state => {
      return {
        tableisActive: !state.tableisActive,
      };
    });
  };

  handleTableDataChange = ({ matrix, x, y, overMaxSum, isValid }) => {
    if (overMaxSum || !isValid) {
      return;
    }

    this.setState({
      isValidData: true,
    });
  };

  render() {
    const { tableIsActive } = this.state;
    return (
      <Layout>
        <span>{new Date().toLocaleString()}</span>
        <Layout.Container>
          {tableIsActive ? (
            <ContingencyTable onDataChange={this.handleTableDataChange} />
          ) : (
            <DotSequency />
          )}
        </Layout.Container>
      </Layout>
    );
  }
}

export default StatisticApp;
