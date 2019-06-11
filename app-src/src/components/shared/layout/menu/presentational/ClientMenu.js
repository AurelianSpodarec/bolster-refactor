import React from 'react';

import MenuItemContainer from '../containers/MenuItemContainer';

const ClientMenu = () => (
    <>
        <div className="menu-bg" />
        <div className="menu">
            <MenuItemContainer link="/client" base>
                <i className="fa fa-home icon" />{' '}
                <span className="menu-text">Dashboard</span>
            </MenuItemContainer>

            <MenuItemContainer link="/client/sites">
                <i className="fa fa-building icon" />{' '}
                <span className="menu-text">Sites</span>
            </MenuItemContainer>
        </div>
    </>
);

export default ClientMenu;
