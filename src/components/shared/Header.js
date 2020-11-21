import React from 'react';
import { Link } from 'react-router-dom'
import logo from '../../assets/img/logo.png';

const Header = () => (
  <div className="component-header">
    <div className="row">
      <div className="header">
        <div className="col-2 logo">
          <img src={logo} alt="logo"/>
        </div>
        <div className="col menu text-right">
          <span><strong>Michel Luis César Paiva e Silva</strong> Teste de Front-end</span>
        </div>
      </div>
    </div>
  </div>
);

export default Header;
