/** @format */

import React from 'react';

class StatisticDetails extends React.Component {
  render() {
    const {
      mean,
      variance,
      covariance,
      correlationCoefficient,
      regression,
    } = this.props;

    return (
      <>
        <h3>Auswertung</h3>
        <ul className="list-group">
          <li
            className="list-group-item p-0"
            style={{ border: 'none', background: 'none' }}
          >
            <div className="d-flex w-100 justify-content-between">
              <h5 className="mb-1">Mittelwerte</h5>
            </div>
            <div>x: {mean.x}</div>
            <div>y: {mean.y}</div>
          </li>
          <li
            className="list-group-item p-0"
            style={{ border: 'none', background: 'none' }}
          >
            <div className="d-flex w-100 justify-content-between">
              <h5 className="mb-1">Varianzen</h5>
            </div>
            <div>x: {variance.x}</div>
            <div>y: {variance.y}</div>
          </li>
          <li
            className="list-group-item p-0"
            style={{ border: 'none', background: 'none' }}
          >
            <div className="d-flex w-100 justify-content-between">
              <h5 className="mb-1">Kovarianz</h5>
            </div>
            <span>{covariance}</span>
          </li>
          <li
            className="list-group-item p-0"
            style={{ border: 'none', background: 'none' }}
          >
            <div className="d-flex w-100 justify-content-between">
              <h5 className="mb-1">Korrelationskoeffizient</h5>
            </div>
            <span>{correlationCoefficient}</span>
          </li>
          <li
            className="list-group-item p-0"
            style={{ border: 'none', background: 'none' }}
          >
            <div className="d-flex w-100 justify-content-between">
              <h5 className="mb-1">Regression</h5>
            </div>
            <div>m: {regression.m}</div>
            <div>b: {regression.b}</div>
            <div>Qualität:{regression.quality}</div>
          </li>
        </ul>
      </>
    );
  }
}

export default StatisticDetails;
