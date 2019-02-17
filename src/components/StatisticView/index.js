/** @format */

import React from 'react';
import Chart from './Chart';
import Layout from '../Layout';
import './StatisticView.module.css';

const roundDecimals = 6;

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

const ResultRegression = ({ header, values }) => (
  <div>
    <div className="input-group input-group-sm mb-3">
      <div className="input-group-prepend">
        <span className="input-group-text" id="inputGroup-sizing-sm">
          {header}
        </span>
      </div>
      <div className="input-group input-group-sm mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text" id="inputGroup-sizing-sm">
            m
          </span>
        </div>
        <input
          value={Number(values.m.toFixed(roundDecimals))}
          type="text"
          className="form-control"
          aria-describedby="inputGroup-sizing-sm"
        />
        <div className="input-group-prepend">
          <span className="input-group-text" id="inputGroup-sizing-sm">
            b
          </span>
        </div>
        <input
          value={Number(values.b.toFixed(roundDecimals))}
          type="text"
          className="form-control"
          aria-describedby="inputGroup-sizing-sm"
        />
        <div className="input-group-prepend">
          <span className="input-group-text" id="inputGroup-sizing-sm">
            Qualität B
          </span>
        </div>
        <input
          value={Number(values.quality.toFixed(roundDecimals))}
          type="text"
          className="form-control"
          aria-describedby="inputGroup-sizing-sm"
        />
      </div>
    </div>
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
          values={{
            x: Number(statistic.mean.x.toFixed(roundDecimals)),
            y: Number(statistic.mean.y.toFixed(roundDecimals)),
          }}
        />
        <Result
          header="Varianzen"
          values={{
            x: Number(statistic.variance.x.toFixed(roundDecimals)),
            y: Number(statistic.variance.y.toFixed(roundDecimals)),
          }}
        />
        <Result
          header="Kovarianz"
          values={{ xy: Number(statistic.covariance.toFixed(roundDecimals)) }}
        />
        <Result
          header="Korrelationskoeffizent"
          values={{
            xy: Number(statistic.correlationCoefficient.toFixed(roundDecimals)),
          }}
        />
        <ResultRegression
          header="Regression"
          values={statistic.regressionLineDetails}
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
