import React from 'react';
import './style.scss';
import { Link } from 'react-router-dom';

const NavigationBar = () => {
  return (
    <div className="navigation-bar">
      <Link to="/">Recipedia</Link>
    </div>
  );
};

export default NavigationBar;
