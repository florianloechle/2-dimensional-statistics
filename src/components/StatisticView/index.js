/** @format */

import React from 'react';
import Chart from './Chart';
import Layout from '../Layout';
import './StatisticView.module.css';

const Result = ({ header, values }) => (
  <div>
    {Object.keys(values).length > 1 ? (
      <div className="input-group input-group-sm mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text" id="inputGroup-sizing-sm">
            {header}
          </span>
        </div>
        <div className="input-group input-group-sm mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="inputGroup-sizing-sm">
              X
            </span>
          </div>
          <input
            value={values.x}
            type="text"
            className="form-control"
            aria-describedby="inputGroup-sizing-sm"
          />
          <div className="input-group-prepend">
            <span className="input-group-text" id="inputGroup-sizing-sm">
              Y
            </span>
          </div>
          <input
            value={values.y}
            type="text"
            className="form-control"
            aria-describedby="inputGroup-sizing-sm"
          />
        </div>
      </div>
    ) : (
      <div className="input-group input-group-sm mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text" id="inputGroup-sizing-sm">
            {header}
          </span>
          <input
            value={values.xy}
            type="text"
            className="form-control"
            aria-describedby="inputGroup-sizing-sm"
          />
        </div>
      </div>
    )}
  </div>
);

const StatisticView = ({ statistic }) => (
  <Layout.Container>
    <br />
    <div className="row">
      <section className="col">
        <header>
          <h2>Auswertung</h2>
        </header>
        <Result
          header="Mittelwerte"
          values={{ x: statistic.mean.x, y: statistic.mean.y }}
        />
        <Result
          header="Varianzen"
          values={{ x: statistic.variance.x, y: statistic.variance.y }}
        />
        <Result header="Kovarianz" values={{ xy: statistic.covariance }} />
        <Result
          header="Korrelationskoeffizent"
          values={{ xy: statistic.correlationCoefficient }}
        />
      </section>
      <div className="col">
        <br />
        <br />
        <Chart
          regressionLineData={statistic.regressionLine}
          scatterData={statistic.raw.map(([x, y]) => ({ x, y }))}
        />
      </div>
    </div>
  </Layout.Container>
);

export default StatisticView;
