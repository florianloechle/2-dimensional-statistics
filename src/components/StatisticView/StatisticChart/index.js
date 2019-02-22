/** @format */

import React from 'react';
import { Scatter } from 'react-chartjs-2';

const getData = (lineData, scatterData) => {
  return {
    labels: ['Scatter'],
    datasets: [
      {
        type: 'scatter',
        label: 'Verteilung',
        fill: false,
        backgroundColor: 'red',
        pointBorderColor: 'black',
        pointBackgroundColor: 'red',
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
        borderColor: '#3300db',
        backgroundColor: '#3300db',
        pointBorderColor: '#3300db',
        pointBackgroundColor: '#3300db',
        pointHoverBackgroundColor: '#3300db',
        pointHoverBorderColor: '#3300db',
        data: lineData,
      },
    ],
  };
};

const options = {
  responsive: true,
  title: {
    display: true,
    fontSize: 28,
    fontColor: 'black',
    fontStyle: 'normal',
    lineHeight: 1.2,
    text: 'Visualisierung',
    fontFamily: 'Gochi Hand',
  },
  legend: {
    display: true,
    labels: {
      fontColor: 'black',
      fontFamily: 'Gochi Hand',
      fontSize: 20,
    },
  },
};

class StatisticChart extends React.Component {
  render() {
    const {
      regressionLineData: { points },
      scatterData,
    } = this.props;
    return <Scatter options={options} data={getData(points, scatterData)} />;
  }
}

export default StatisticChart;
