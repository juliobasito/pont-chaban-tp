import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom';
import HomePage from './pages/home';
import SinglePage from './pages/single';
import Page404 from './pages/page404';

class App extends Component {

    render() {

        return (
            <Router>
              <div>

                <Route exact path="/error-404" component={Page404} />
                <Route path="/:id" component={SinglePage}/>
                <Route exact path="/" component={HomePage} />
              </div>
            </Router>
        );
    }
}

export default App;
