/** @format */

import React from 'react';
import { Container, Col, Row } from '../Grid';
import Controls from '../Controls';

class PointInput extends React.Component {
  state = {
    samples: [],
    x: 0,
    y: 0,
    editRow: null,
  };

  handlePointInputOnBlur = ev => {
    if (ev.target.value.length === 0) this.setState({ [ev.target.id]: 0 });
  };

  handlePointInputChange = ev => {
    var value = ev.target.value;
    var negativeNumber = false;

    if (value.startsWith('-')) {
      negativeNumber = true;
      value = value.substring(1);
    }

    if (value.length > 1) value = value.replace(/^0+/, '');

    if (value.startsWith('.')) {
      value = '0' + value;
    }

    if (negativeNumber) {
      value = '-' + value;
    }

    this.setState({ [ev.target.id]: value });
  };

  handleSubmit = () => {
    if (this.props.onSubmit) this.props.onSubmit(this.state.statistic);
  };

  deleteRow = index => {
    this.setState({
      samples: this.state.samples.filter((el, i) => i !== index),
    });
  };

  onAddPoint = () => {
    const { x, y } = this.state;
    this.setState({
      samples: [...this.state.samples, [Number(x), Number(y)]],
      x: 0,
      y: 0,
    });
  };

  handleSubmit = () => {
    this.props.onSubmit(this.state.samples);
  };

  handleResetClick = () => {
    this.setState(
      {
        samples: [],
        x: 0,
        y: 0,
      },
      () => this.props.onReset && this.props.onReset()
    );
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col className="col-6">
            <div className="input-group">
              <input
                type="number"
                id="x"
                className="form-control"
                value={this.state.x}
                onChange={this.handlePointInputChange}
                onBlur={this.handlePointInputOnBlur}
              />
              <input
                type="number"
                id="y"
                className="form-control"
                value={this.state.y}
                onChange={this.handlePointInputChange}
                onBlur={this.handlePointInputOnBlur}
              />
              <div className="input-group-append">
                <button className="input-group-text" onClick={this.onAddPoint}>
                  Hinzufügen
                </button>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col className="col mb-2">
            <ul className="list-group list-group-horizontal-sm flex-wrap">
              {this.state.samples.map(([x, y], i) => (
                <li className="list-group-item p-1" key={i}>
                  <button>
                    {x} / {y}
                  </button>
                  <button onClick={e => this.deleteRow(i)}>&times;</button>
                </li>
              ))}
            </ul>
          </Col>
        </Row>
        <Row>
          <Col>
            <Controls
              onReset={this.handleResetClick}
              onCompute={this.handleSubmit}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default PointInput;
