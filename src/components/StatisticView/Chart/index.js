/** @format */

import React from 'react';
import { Scatter } from 'react-chartjs-2';

const getData = (lineData, scatterData) => {
  return {
    labels: ['Scatter'],
    datasets: [
      {
        type: 'scatter',
        label: 'Punkte',
        fill: false,
        backgroundColor: 'blue',
        pointBorderColor: 'black',
        pointBackgroundColor: 'blue',
        pointBorderWidth: 2,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: 'darkblue',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 6,
        pointHitRadius: 10,
        data: scatterData,
      },
      {
        type: 'line',
        label: 'Regressionsgerade',
        fill: false,
        showLine: true,
        borderColor: '#EC932F',
        backgroundColor: '#EC932F',
        pointBorderColor: '#EC932F',
        pointBackgroundColor: '#EC932F',
        pointHoverBackgroundColor: '#EC932F',
        pointHoverBorderColor: '#EC932F',
        data: lineData,
      },
    ],
  };
};

const Chart = ({ scatterData, regressionLineData }) => (
  <div style={{ backgroundColor: 'white' }}>
    <Scatter data={getData(regressionLineData, scatterData)} />
  </div>
);

export default Chart;
