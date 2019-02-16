/** @format */

import React from 'react';
import styles from './Container.module.css';

const Container = props => {
  return <div className={styles.base}>{props.children}</div>;
};

export default Container;
