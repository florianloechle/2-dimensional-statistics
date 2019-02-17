/** @format */

import React from 'react';
import styles from './Toggle.module.css';
import Layout from '../Layout';

class SelectionToggle extends React.Component {
  state = {
    active: false,
  };

  onChange = newState => {
    this.setState(
      {
        active: newState,
      },
      () => this.props.onChange(this.state.active)
    );
  };

  render() {
    return (
      <Layout.Container>
        <div className={styles.base}>
          <span className="custom-control custom-radio">
            <input
              type="radio"
              checked={this.state.active === false}
              id="checkDotSequence"
              name="radioInput"
              className="custom-control-input"
              onChange={_ => this.onChange(false)}
            />
            <label className="custom-control-label" htmlFor="checkDotSequence">
              Punktfolge
            </label>
          </span>

          <span> &nbsp; &nbsp; &nbsp; </span>

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
              Kontigenztafel
            </label>
          </span>
        </div>
      </Layout.Container>
    );
  }
}

export default SelectionToggle;
