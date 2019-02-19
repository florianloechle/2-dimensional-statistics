/** @format */

import React from 'react';
import { Container, Row, Col } from '../Grid';

class SelectionToggle extends React.Component {
  state = {
    active: false,
  };

  onChange = newState => {
    this.setState(
      {
        active: newState,
      },
      () => this.props.onChange && this.props.onChange(this.state.active)
    );
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col>
            <h5>Eingabemethode</h5>
            <span className="custom-control custom-radio">
              <input
                type="radio"
                checked={this.state.active === false}
                id="checkDotSequence"
                name="radioInput"
                className="custom-control-input"
                onChange={_ => this.onChange(false)}
              />
              <label
                className="custom-control-label"
                htmlFor="checkDotSequence"
              >
                Punktfolge
              </label>
            </span>
            <span className="custom-control custom-radio">
              <input
                type="radio"
                checked={this.state.active}
                id="checkContigencyTable"
                name="radioInput"
                className="custom-control-input"
                onChange={_ => this.onChange(true)}
              />
              <label
                className="custom-control-label"
                htmlFor="checkContigencyTable"
              >
                Kontingenztafel
              </label>
            </span>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default SelectionToggle;
