import React, { Component } from 'react';

import Header from 'components/layout/presentational/Header';
import Routes from 'components/dashboard/presentational/Dashboard';

class App extends Component {
    render() {
        return (
            <div className="App">
                <Header />
                <Routes />
            </div>
        );
    }
}

export default App;
