import React from 'react';
import useColourTheme from '../../../../hooks/useColourTheme';

import ModalRoute from 'components/shared/generic/modals/containers/ModalRoot';
import Routes from '../../routes/presentational';
import OAndMTsAndCsModalContainer from 'components/shared/generic/modals/containers/OAndMTsAndCsModalContainer';

const App = () => {
    const colourTheme = useColourTheme();
    return (
        <div className="App" data-theme={colourTheme}>
            <Routes />
            {/* hidden field potentially for version no. */}
            <div className="hidden">hidden</div>
            <div className="clear" />
            <ModalRoute />
            <OAndMTsAndCsModalContainer />
        </div>
    );
};

export default App;
