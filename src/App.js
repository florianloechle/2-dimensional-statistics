/** @format */

import React from 'react';
import Layout from './components/Layout';
import DotSequency from './components/DotSequency';
import styles from './App.module.css';
import Statistic from './lib/Statistics';
import TextInput from './components/Input/Text';
import ContingencyTable from './components/ContingencyTable';

class StatisticApp extends React.Component {
  state = {
    statistics: null,
  };

  render() {
    return (
      <Layout>
        <div className={styles.sheet}>
          <span>{new Date().toLocaleString()}</span>
          <ContingencyTable />
        </div>
      </Layout>
    );
  }
}

export default StatisticApp;
