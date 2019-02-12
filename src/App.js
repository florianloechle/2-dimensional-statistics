/** @format */

import React from 'react';
import Layout from './components/Layout';
import DotSequency from './components/DotSequency';
import styles from './App.module.css';

class StatisticApp extends React.Component {
  state = {
    //
  };

  render() {
    return (
      <Layout>
        <div className={styles.sheet}>
          <span>{new Date().toLocaleString()}</span>
        </div>
      </Layout>
    );
  }
}

export default StatisticApp;
