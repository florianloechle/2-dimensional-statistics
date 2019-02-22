/** @format */

import React from 'react';
import Alert from 'react-s-alert';
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
    differentPointsCount: 0,
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

  handlePointOnFocus = ev => {
    if (this.state[ev.target.id] === 0) this.setState({ [ev.target.id]: '' });
  };

  handlePointOnKeyDown = ev => {
    if (ev.keyCode === 13) {
      this.handlePointAdd();
    }
  };

  handleSubmit = () => {
    const { samples } = this.state;

    if (
      samples.length >= this.props.minPoints &&
      samples.length <= this.props.maxPoints
    )
      this.props.onSubmit && this.props.onSubmit(samples);
    else
      Alert.error(
        'Die Anzahl der Punkte muss zwischen ' +
          this.props.minPoints +
          ' und ' +
          this.props.maxPoints +
          ' liegen.'
      );
  };

  handlePointAdd = () => {
    this.addPoint();
    if (this.xInput) {
      this.xInput.focus();
      this.setState({ x: '' });
    }
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

  deleteRow = index => {
    var row = this.state.samples.filter((el, i) => i == index);
    this.setState(
      {
        samples: this.state.samples.filter((el, i) => i !== index),
      },
      () => {
        if (this.state.samples.length == this.props.maxPoints)
          Alert.success(this.getMsgMaxPointsReached());
        else if (this.state.samples.length > this.props.maxPoints)
          Alert.error(this.getMsgTooManyPoints(this.state.samples.length));

        if (
          this.state.samples.filter(
            el => el[0] === row[0][0] && el[1] === row[0][1]
          ).length == 0
        )
          this.setState(
            { differentPointsCount: this.state.differentPointsCount - 1 },
            () => {
              if (
                this.state.differentPointsCount == this.props.maxDifferentPoints
              )
                Alert.warning(this.getMsgMaxDifferentPointsReached());
              if (
                this.state.differentPointsCount > this.props.maxDifferentPoints
              )
                Alert.error(this.getMsgTooManyDifferentPoints());
            }
          );
      }
    );
  };

  addPoint = () => {
    const { x, y } = this.state;

    this.setState(
      {
        samples: [...this.state.samples, [Number(x), Number(y)]],
        x: 0,
        y: 0,
      },
      () => {
        if (this.state.samples.length > this.props.maxPoints)
          Alert.error(this.getMsgTooManyPoints(this.state.samples.length));
        if (this.state.samples.length == this.props.maxPoints)
          Alert.warning(this.getMsgMaxPointsReached());
        if (
          this.state.samples.filter(el => el[0] == x && el[1] == y).length == 1
        )
          this.setState(
            { differentPointsCount: this.state.differentPointsCount + 1 },
            () => {
              if (
                this.state.differentPointsCount == this.props.maxDifferentPoints
              )
                Alert.warning(this.getMsgMaxDifferentPointsReached());
              if (
                this.state.differentPointsCount > this.props.maxDifferentPoints
              )
                Alert.error(this.getMsgTooManyDifferentPoints());
            }
          );
      }
    );
  };

  getMsgTooManyPoints() {
    return (
      'Die maximale Anzahl von ' +
      this.props.maxPoints +
      ' Punkten wurde mit ' +
      (this.state.samples.length - this.props.maxPoints) +
      ' Punkt' +
      (this.state.samples.length - this.props.maxPoints === 1 ? '' : 'en') +
      ' überschritten.'
    );
  }

  getMsgMaxPointsReached() {
    return (
      'Die maximale Anzahl von  ' +
      this.props.maxPoints +
      '  Punkten wurde erreicht.'
    );
  }

  getMsgTooManyDifferentPoints() {
    return (
      'Die maximale Anzahl von ' +
      this.props.maxDifferentPoints +
      ' Punkten wurde mit ' +
      (this.state.differentPointsCount - this.props.maxDifferentPoints) +
      ' Punkt' +
      (this.state.differentPointsCount - this.props.maxDifferentPoints === 1
        ? ''
        : 'en') +
      ' überschritten.'
    );
  }

  getMsgMaxDifferentPointsReached() {
    return (
      'Die maximale Anzahl von  ' +
      this.props.maxDifferentPoints +
      '  Punkten wurde erreicht.'
    );
  }

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
                ref={el => (this.xInput = el)}
                onChange={this.handlePointInputChange}
                onBlur={this.handlePointInputOnBlur}
                onFocus={this.handlePointOnFocus}
                onKeyDown={this.handlePointOnKeyDown}
              />
              <input
                type="number"
                id="y"
                style={{ minWidth: '65px' }}
                className="form-control"
                value={this.state.y}
                onChange={this.handlePointInputChange}
                onBlur={this.handlePointInputOnBlur}
                onFocus={this.handlePointOnFocus}
                onKeyDown={this.handlePointOnKeyDown}
              />
              <div className="input-group-append">
                <button
                  className="input-group-text"
                  onClick={this.handlePointAdd}
                >
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
