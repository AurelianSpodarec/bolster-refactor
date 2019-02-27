import React, { Component } from 'react';

import HeaderContainer from 'components/layout/containers/HeaderContainer';
import Routes from 'components/dashboard/presentational/Dashboard';

class App extends Component {
    render() {
        return (
            <div className="App">
                <HeaderContainer />
                <Routes />
            </div>
        );
    }
}

export default App;
