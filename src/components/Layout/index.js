/** @format */

import React from 'react';
import Footer from './Footer';
import Header from './Header';
import Container from './Container';
import PropTypes from 'prop-types';
import styles from './Layout.module.css';

/**
 * Layout wrapper component that wraps any of its children
 * in the sites layout.
 * @param {Object} props Children
 */
const Layout = ({ children }) => {
  return (
    <div className={styles.base}>
      <Header />
      <main>
        <div className={styles.sheet}>{children}</div>
      </main>
      <Footer />
    </div>
  );
};

Layout.Container = Container;

export default Layout;

Layout.propTypes = {
  children: PropTypes.any,
};
