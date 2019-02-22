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
        className="close pl-2"
        aria-label="Delete"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </li>
  );
}

class PointInput extends React.Component {
  state = {
    // Stores all inputed points
    samples: [],
    // Stores value of xInput
    x: 0,
    // Stores value of yInput
    y: 0,
    // Counts number of differnt points
    differentPointsCount: 0,
  };

  // Sets Value to 0 when it's empty
  handlePointInputOnBlur = ev => {
    if (ev.target.value.length === 0) this.setState({ [ev.target.id]: 0 });
  };

  // Formats number on input
  handlePointInputChange = ev => {
    var value = ev.target.value;
    var negativeNumber = false;

    // Saves and removes sign for formatting
    if (value.startsWith('-')) {
      negativeNumber = true;
      value = value.substring(1);
    }

    // Removes 0 from double 00
    if (value === '00') value = '0';

    // Clears forwarding zeros
    if (value.length > 1) value = value.replace(/^0+/, '');

    // Adds zero again if the number is a point number
    if (value.startsWith('.')) {
      value = '0' + value;
    }

    // Adds negative sign again
    if (negativeNumber) {
      value = '-' + value;
    }

    this.setState({ [ev.target.id]: value });
  };

  // Clears input to improve usabilty
  handlePointOnFocus = ev => {
    if (this.state[ev.target.id] === 0) this.setState({ [ev.target.id]: '' });
  };

  // Handles 'Return' to improve usabilty
  handlePointOnKeyDown = ev => {
    if (ev.keyCode === 13) {
      // Jump from xInput to yInput
      if (ev.target.id === 'x') {
        if (this.yInput) {
          this.yInput.focus();
          this.setState({ y: '' });
        }
        // Adds point
      } else if (ev.target.id === 'y') {
        if (this.state.y === '')
          this.setState({ y: 0 }, () => {
            this.handlePointAdd();
          });
        else this.handlePointAdd();
      }
    }
  };

  // Verifys list of points and runs the calculation and the display
  handleSubmit = () => {
    const { samples, differentPointsCount } = this.state;

    if (
      samples.length >= this.props.minPoints &&
      samples.length <= this.props.maxPoints &&
      differentPointsCount <= this.props.maxDifferentPoints
    ) {
      this.props.onSubmit && this.props.onSubmit(samples);
    } else if (differentPointsCount > this.props.maxDifferentPoints) {
      this.props.onSubmit(false);
      Alert.error(
        'Maximal unterschiedliche Punkte erreicht: ' +
          this.props.maxDifferentPoints
      );
    } else {
      this.props.onSubmit(false);
      Alert.error(
        'Die Anzahl der Punkte muss zwischen ' +
          this.props.minPoints +
          ' und ' +
          this.props.maxPoints +
          ' liegen.'
      );
    }
  };

  // Adds a point to the list and sets the focus on xInput
  handlePointAdd = () => {
    this.addPoint();
    if (this.xInput) {
      this.xInput.focus();
      this.setState({ x: '' });
    }
  };

  // Clears the state
  handleResetClick = () => {
    this.setState(
      {
        samples: [],
        x: 0,
        y: 0,
        differentPointsCount: 0,
      },
      () => this.props.onReset && this.props.onReset()
    );
    if (this.xInput) {
      this.xInput.focus();
      this.setState({ x: '' });
    }
  };

  // Deletes a row from the list and updates the state
  deleteRow = index => {
    // Saves values from the row to delete
    var row = this.state.samples.filter((el, i) => i === index);

    // Deletes row
    this.setState(
      {
        samples: this.state.samples.filter((el, i) => i !== index),
      },
      () => {
        // Sends status of list to user
        if (this.state.samples.length === this.props.maxPoints)
          Alert.success(this.getMsgMaxPointsReached());
        else if (this.state.samples.length > this.props.maxPoints)
          Alert.error(this.getMsgTooManyPoints(this.state.samples.length));

        // Checks if there is another point with the same x and y values
        if (
          this.state.samples.filter(
            el => el[0] === row[0][0] && el[1] === row[0][1]
          ).length === 0
        )
          // Decreases differentPointsCount when it was the last point of this shaping
          this.setState(
            { differentPointsCount: this.state.differentPointsCount - 1 },
            () => {
              // Sends status of list to user
              if (
                this.state.differentPointsCount ===
                this.props.maxDifferentPoints
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

  // Adds a point to the list
  addPoint = () => {
    const { x, y } = this.state;

    this.setState(
      {
        samples: [...this.state.samples, [Number(x), Number(y)]],
        x: 0,
        y: 0,
      },
      () => {
        // Sends status of list to user
        if (this.state.samples.length > this.props.maxPoints)
          Alert.error(this.getMsgTooManyPoints(this.state.samples.length));
        if (this.state.samples.length === this.props.maxPoints)
          Alert.warning(this.getMsgMaxPointsReached());
        // Checks if the point was the first point of the shaping
        if (
          this.state.samples.filter(
            el =>
              el[0] === Number.parseFloat(x) && el[1] === Number.parseFloat(y)
          ).length === 1
        )
          // Incereases differentPointsCount when it was the first point of this shaping
          this.setState(
            { differentPointsCount: this.state.differentPointsCount + 1 },
            () => {
              // Sends status of list to user
              if (
                this.state.differentPointsCount ===
                this.props.maxDifferentPoints
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

  // Usermessages
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
      ' verschiedenen Punkten wurde mit ' +
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
      ' verschiedenen Punkten wurde erreicht.'
    );
  }

  // View
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
                ref={el => (this.yInput = el)}
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
