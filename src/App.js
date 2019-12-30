import React, {lazy, Suspense} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Loader from 'react-loader-spinner';

import HomePage from './pages/homePageComponent';
//import AboutPage from './pages/aboutPageComponent';
import './App.css';
const AboutPage = lazy (() => import ('./pages/aboutPageComponent'));

class App extends React.Component {
  render () {
    return (
      <Router>
        <Switch>
          <Route exact path="/" render={props => <HomePage {...props} />} />
          <Route
            exact
            path="/book/:id"
            render={props => (
              <Suspense
                fallback={
                  <div>
                    <Loader
                      type="ThreeDots"
                      color="#acacac"
                      height={100}
                      width={100}
                      visible={true}
                    />
                  </div>
                }
              >
                <AboutPage {...props} />
              </Suspense>
            )}
          />
        </Switch>
      </Router>
    );
  }
}

export default App;
