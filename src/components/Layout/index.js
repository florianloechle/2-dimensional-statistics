/** @format */

import React from 'react';
import Footer from './Footer';
import Header from './Header';
import PropTypes from 'prop-types';
import styles from './Layout.module.css';

const Layout = ({ children }) => {
  return (
    <div className={styles.base}>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;

Layout.propTypes = {
  children: PropTypes.any,
};
