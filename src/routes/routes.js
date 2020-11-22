import React from "react";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from '../views/Home/Home'
import Details from '../views/Details/Details'

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={ Home } />
      <Route path="/details/:id" component={ Details } />
    </Switch>
  </BrowserRouter>
)

export default Routes;