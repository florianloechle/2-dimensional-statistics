/** @format */

import React from 'react';
import Chart from './Chart';
import styles from './StatisticView.module.css';

const StatisticView = ({ statistic }) => (
  <div className={styles.base}>
    <div />
    <div>
      <Chart
        regressionLineData={statistic.regressionLine}
        scatterData={statistic.raw}
      />
    </div>
  </div>
);

export default StatisticView;
