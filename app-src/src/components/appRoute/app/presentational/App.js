import React from 'react';

import ModalRoute from 'components/shared/generic/modals/containers/ModalRoot';
import Routes from '../../routes/presentational';

const App = () => (
    <div className="App">
        <Routes />
        <div className="hidden">hidden</div>
        <div className="clear" />
        <ModalRoute />
    </div>
);

export default App;
