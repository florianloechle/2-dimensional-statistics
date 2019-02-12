/** @format */

import React from 'react';
import styles from './Footer.module.css';

const Footer = props => {
  return (
    <footer className={styles.base}>
      <a href="https://github.com/schottilol/2-dimensional-statistics">
        <img
          alt="GitHub Stars"
          src="https://img.shields.io/github/stars/schottilol/2-dimensional-statistics.svg?label=Github&logoColor=red&style=social"
        />
      </a>
    </footer>
  );
};

export default Footer;
