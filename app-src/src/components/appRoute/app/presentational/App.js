import React from 'react';

import ModalRoute from 'components/shared/generic/modals/containers/ModalRoot';
import Routes from '../../routes/presentational';
import OAndMTsAndCsModalContainer from 'components/shared/generic/modals/containers/OAndMTsAndCsModalContainer';

const App = () => (
    <div className="App">
        <Routes />
        {/* hidden field potentially for version no. */}
        <div className="hidden">hidden</div>
        <div className="clear" />
        <ModalRoute />
        <OAndMTsAndCsModalContainer />
    </div>
);

export default App;
