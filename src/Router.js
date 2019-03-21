import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Index from './index/Upload';
import Hello from './hello/Hello';


const BasicRoute = () => (
  <BrowserRouter>
      <Switch>
          <Route exact path="/" component={Index}/>
          <Route exact path="/hello" component={Hello}/>
      </Switch>
  </BrowserRouter>
);
export default BasicRoute;