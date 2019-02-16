/** @format */

import React from 'react';
import Chart from './Chart';
import Layout from '../Layout';
import styles from './StatisticView.module.css';

const Result = ({ header, children }) => (
  <div>
    <h5>{header}</h5>
    <div>{children}</div>
  </div>
);

const StatisticView = ({ statistic }) => (
  <Layout.Container>
    <div className="row">
      <section className="col">
        <header>
          <h3>Auswertung</h3>
        </header>
        <Result header="Mittelwerte">
          x: {statistic.mean.x} | y: {statistic.mean.y}
        </Result>
        <Result header="Varianzen">
          x: {statistic.variance.x} | y: {statistic.variance.y}
        </Result>
        <Result header="Kovarianz">{statistic.covariance}</Result>
        <Result header="Korrelationskoeffizent">
          {statistic.correlationCoefficient}
        </Result>
      </section>
      <div className="col">
        <Chart
          regressionLineData={statistic.regressionLine}
          scatterData={statistic.raw.map(([x, y]) => ({ x, y }))}
        />
      </div>
    </div>
  </Layout.Container>
);

export default StatisticView;
