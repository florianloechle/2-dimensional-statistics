/** @format */

/**
 * This file contians some helper layout components to create a
 * bootstrap grid layout. Columns must be nested in rows, rows must be
 * nested in containers. Container can either be fluid.
 *
 * To see what can be done with these components visit:
 * https://getbootstrap.com/docs/4.3/layout/grid/
 */

import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

/**
 * Bootstrap container component.
 */
export class Container extends React.Component {
  static propTypes = {
    /**
     * Allow the Container to fill all of its available horizontal space.
     */
    fluid: PropTypes.bool,
    /**
     * You can use a custom element for this component
     */
    as: PropTypes.string,
  };

  static defaultProps = {
    as: 'div',
    fluid: false,
  };

  render() {
    const { fluid, as: Component, className, ...props } = this.props;
    return (
      <Component
        {...props}
        className={clsx(className, fluid ? `container-fluid` : 'container')}
      />
    );
  }
}

/**
 * Bootstrap row component.
 */
export class Row extends React.Component {
  static propTypes = {
    /**
     * @default 'row'
     */
    bsPrefix: PropTypes.string.isRequired,

    /** Removes the gutter spacing between `Col`s as well as any added negative margins. */
    noGutters: PropTypes.bool.isRequired,

    /**
     * @default 'div'
     */
    as: PropTypes.string,
  };

  static defaultProps = {
    as: 'div',
    noGutters: false,
    bsPrefix: 'row',
  };

  render() {
    const {
      bsPrefix,
      noGutters,
      as: Component,
      className,
      ...props
    } = this.props;

    return (
      <Component
        {...props}
        className={clsx(className, bsPrefix, noGutters && 'no-gutters')}
      />
    );
  }
}

export class Col extends React.Component {
  static propTypes = {
    /**
     * @default 'col'
     */
    bsPrefix: PropTypes.string,

    /**
     * @default 'div'
     */
    as: PropTypes.string,

    /**
     *
     */
    sm: PropTypes.bool,
  };

  static defaultProps = {
    as: 'div',
    bsPrefix: 'col',
  };

  render() {
    const { bsPrefix, className, as: Component, ...props } = this.props;

    return (
      <Component
        {...props}
        className={clsx(className, className ? null : bsPrefix)}
      />
    );
  }
}
