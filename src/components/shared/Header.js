import React from 'react';
import logo from '../../assets/img/logo.png';

const Header = () => (
  <div className="component-header">
    <div className="row">
      <div className="header">
        <div className="col-12 col-sm-3 col-md-2 logo">
          <img src={logo} alt="logo"/>
        </div>
        <div className="col-12 col-sm-9 col-md-10 menu">
          <span><strong>Michel Luis César Paiva e Silva</strong> Teste de Front-end</span>
        </div>
      </div>
    </div>
  </div>
);

export default Header;
