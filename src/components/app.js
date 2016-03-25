import React from 'react';
import Introduction from './introduction/Introduction';
import Countdown from './countdown/Countdown';
import Template from './app-template';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';

export default () => {
  return (
      <Router history={hashHistory}>
        <Route path="/" component={Template}>
          <IndexRoute component={Introduction}/>
          <Route path="countdown" component={Countdown}/>
        </Route>
      </Router>
  )
}