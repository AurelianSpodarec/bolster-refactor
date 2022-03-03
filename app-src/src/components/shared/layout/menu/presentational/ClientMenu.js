import React from 'react';

import bolsterLogo from '../../../../../_content/images/footer/powered-by-bolster-white.svg';
import ClientMenuItemContainer from '../containers/ClientMenuItemContainer';

const ClientMenu = ({ clientNavMenuItems, latestAppVersion }) => (
    <div className="menu">
        <div className="nav-wrapper">
            {clientNavMenuItems.map((navItem, index) => (
                <ClientMenuItemContainer key={index} item={navItem} />
            ))}
        </div>

        <div className="footer">
            <img src={bolsterLogo} alt="Powered by Bolster" />
            <p>{latestAppVersion}</p>
        </div>
    </div>
);

export default ClientMenu;
