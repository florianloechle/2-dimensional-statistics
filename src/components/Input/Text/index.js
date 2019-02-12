/** @format */

import React from 'react';
import styles from './Text.module.css';
import PropTypes from 'prop-types';

const TextInput = ({ error, disabled, ...rest }) => (
  <input type="text" className={styles.base} {...rest} />
);

export default TextInput;
