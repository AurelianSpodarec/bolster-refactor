import React from 'react';

import MenuItemContainer from '../containers/MenuItemContainer';
import MenuHeader from './MenuHeader';

const ClientMenu = ({ dismissMessages, unreadCount }) => (
    <>
        <div className="menu-bg" />
        <div className="menu">
            <MenuHeader title="Dashboard" />
            <MenuItemContainer link="/client" base>
                <i className="far fa-home icon fa-fw" />{' '}
                <span className="menu-text">Dashboard</span>
            </MenuItemContainer>

            <MenuHeader title="My Access" />
            <MenuItemContainer link="/client/sites">
                <i className="far fa-building icon fa-fw" />{' '}
                <span className="menu-text">Sites</span>
            </MenuItemContainer>

            <MenuHeader title="Reports" />
            <MenuItemContainer onClick={dismissMessages} link="/client/reports">
                {/* <MenuItemContainer link="/company/reports"> */}
                {!!unreadCount && <span className="number">{unreadCount}</span>}
                <i className="far fa-file-chart-pie fa-fw icon" />
                <span className={`menu-text ${unreadCount ? 'large' : ''}`}>
                    My Company Reports
                </span>
            </MenuItemContainer>
            <MenuItemContainer link="/client/create-report">
                <i className="far fa-file-edit fa-fw icon" />
                <span className="menu-text">Create Report</span>
            </MenuItemContainer>

            <MenuHeader title="Settings &amp; Tools" />
            <MenuItemContainer link="/client/profile">
                <i className="far fa-user icon fa-fw" />{' '}
                <span className="menu-text">My Profile</span>
            </MenuItemContainer>
            <MenuItemContainer link="/client/companies">
                <i className="far fa-briefcase icon fa-fw" />{' '}
                <span className="menu-text">Switch Company</span>
            </MenuItemContainer>
            <MenuItemContainer link="#" logout={true}>
                <i className="far fa-sign-out-alt icon fa-fw" />{' '}
                <span className="menu-text">Logout</span>
            </MenuItemContainer>
        </div>
    </>
);

export default ClientMenu;
