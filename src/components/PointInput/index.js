/** @format */

import React from 'react';
import { Container, Col, Row } from '../Grid';
import Controls from '../Controls';

function PointItem({ x, y, onDelete, onEdit }) {
  return (
    <li className="list-group-item p-1 mr-1">
      {x} / {y}
      <button
        onClick={onDelete}
        type="button"
        class="close pl-2"
        aria-label="Delete"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </li>
  );
}

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
    const { samples } = this.state;

    if (samples.length !== 0 && samples.length <= 100) {
      this.props.onSubmit && this.props.onSubmit(samples);
    }
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
                style={{ minWidth: '65px' }}
                className="form-control"
                value={this.state.x}
                onChange={this.handlePointInputChange}
                onBlur={this.handlePointInputOnBlur}
              />
              <input
                type="number"
                id="y"
                style={{ minWidth: '65px' }}
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
          <Col className="col mb-2 mt-1">
            <ul className="list-group list-group-horizontal-sm flex-wrap">
              {this.state.samples.map(([x, y], i) => (
                <PointItem
                  key={i}
                  x={x}
                  y={y}
                  onDelete={() => this.deleteRow(i)}
                />
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
