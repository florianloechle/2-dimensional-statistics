/** @format */

import React from 'react';
import DotSequency from './components/DotSequency';
import ContingencyInput from './components/ContingencyInput';
import Footer from './components/Footer';
import styles from './App.module.css';

class StatisticApp extends React.Component {
  state = {
    //
  };

  render() {
    return (
      <div className={styles.app}>
        <main className="card">
          <ContingencyInput />
        </main>
        <Footer />
      </div>
    );
  }
}

export default StatisticApp;
