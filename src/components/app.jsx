import React, { Fragment } from 'react';
import { BrowserRouter as Switch, Route } from 'react-router-dom';
import Search from './search';
import Signup from './signup';

const App = () => (
  <Fragment>
    <Switch>
      <Route exact path="/" component={Signup} />
      <Route exact path="/search" component={Search} />
    </Switch>
  </Fragment>
);

export default App;
