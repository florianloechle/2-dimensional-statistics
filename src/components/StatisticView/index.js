/** @format */

import React from 'react';
import PropTypes from 'prop-types';
import Statistic from '../../lib/Statistics';
import { Container, Row, Col } from '../Grid';
import StatisticDetails from './StatisticDetails';
import StatisticChart from './StatisticChart';
import styles from './StatisticView.module.css';

class StatisticView extends React.Component {
  static propTypes = {
    /**
     * Instance of the statistics class.
     */
    statistic: PropTypes.instanceOf(Statistic),
  };

  render() {
    const { statistic } = this.props;

    return (
      <Container fluid className="mt-2">
        <Row className="align-items-center">
          {statistic ? (
            <>
              <Col className="col-3">
                <StatisticDetails
                  mean={statistic.mean}
                  variance={statistic.variance}
                  covariance={statistic.covariance}
                  correlationCoefficient={statistic.correlationCoefficient}
                  regression={statistic.regressionLine}
                />
              </Col>
              <Col className="col-9">
                <StatisticChart
                  regressionLineData={statistic.regressionLine}
                  scatterData={statistic.samples}
                />
              </Col>{' '}
            </>
          ) : (
            <Col className="col-6">
              <div className={styles.noContent}>404 Student ist faul.</div>
            </Col>
          )}
        </Row>
      </Container>
    );
  }
}

export default StatisticView;
