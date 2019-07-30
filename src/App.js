import React, { Component } from 'react';

import { BrowserRouter, Route} from 'react-router-dom';
//Components
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';


class App extends React.Component{
  render() {

    return (
      <React.Fragment>
        
        <BrowserRouter>
          <Route exact path="/" component={SignIn} />
          <Route path="/signup" component={SignUp} />
        </BrowserRouter>
       
      </React.Fragment>
    )

  }
}

export default App;
