import React from 'react';

import bolsterLogo from '../../../../../_content/images/footer/powered-by-bolster-white.svg';
import ClientMenuItemContainer from '../containers/ClientMenuItemContainer';

const ClientMenu = ({ clientNavMenuItems }) => (
    <div className="menu">
        <div className="nav-wrapper">
            {clientNavMenuItems.map((navItem, index) => (
                <ClientMenuItemContainer key={index} item={navItem} />
            ))}
        </div>

        <img src={bolsterLogo} alt="Bolster Logo" className="logo" />
    </div>
);

export default ClientMenu;
