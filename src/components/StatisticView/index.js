/** @format */

import React from 'react';
import Chart from './Chart';
import Layout from '../Layout';
import styles from './StatisticView.module.css';

const StatisticView = ({ statistic }) => (
  <Layout.Container>
    <div className="row">
      <section className="col-3">
        <header>
          <h3>Auswertung</h3>
        </header>
        <div>
          <h5>Mittelwerte</h5>
          <div>
            x: {statistic.mean.x} | y: {statistic.mean.y}
          </div>
        </div>
        <div>
          <h5>Varianzen</h5>
          <div>
            x: {statistic.variance.x} | y: {statistic.variance.y}
          </div>
        </div>
        <div>
          <h5>Kovarianz</h5>
          <div>{statistic.covariance}</div>
        </div>
        <div>
          <h5>Korrelationskoeffizent</h5>
          <div>{statistic.correlationCoefficient}</div>
        </div>
      </section>
      <div className="col-9">
        <Chart
          regressionLineData={statistic.regressionLine}
          scatterData={statistic.raw.map(([x, y]) => ({ x, y }))}
        />
      </div>
    </div>
  </Layout.Container>
);

export default StatisticView;
