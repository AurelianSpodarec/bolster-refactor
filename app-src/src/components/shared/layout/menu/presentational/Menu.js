import React from 'react';

import MenuItemContainer from '../containers/MenuItemContainer';
import DropdownMenuItemContainer from '../containers/DropdownMenuItemContainer';

const Menu = ({ messageCount }) => (
    <>
        <div className="menu-bg" />

        <div className="menu">
            <MenuItemContainer link="/company">
                <i className="fa fa-home icon" /> Dashboard
            </MenuItemContainer>

            <MenuItemContainer link="/company/sites">
                <i className="fa fa-building icon" /> Sites
            </MenuItemContainer>

            <DropdownMenuItemContainer
                icon="users"
                title={'User Management'}
                baseUrl="/company/users-management"
            >
                <MenuItemContainer link="/company/users-management/company-admins">
                    Company Admins
                </MenuItemContainer>
                <MenuItemContainer link="/company/users-management/operatives">
                    Operatives
                </MenuItemContainer>
            </DropdownMenuItemContainer>

            <MenuItemContainer link="/company/reports">
                <i className="fa fa-file icon" /> Reports
            </MenuItemContainer>

            <MenuItemContainer link="/company/message-centre">
                <span className="messages">
                    <i className="far fa-envelope" />
                    <sub>{messageCount}</sub>
                </span>
                Message Centre
            </MenuItemContainer>

            <DropdownMenuItemContainer
                icon="wrench"
                title={'Tools & Resources'}
                baseUrl="/company/tools"
            >
                <MenuItemContainer link="/company/tools/credit-logs">
                    Drawing Credit Log
                </MenuItemContainer>
                <MenuItemContainer link="/company/tools/pin-options">
                    Pin Options
                </MenuItemContainer>
                <MenuItemContainer link="/company/tools/support">
                    Support
                </MenuItemContainer>
                <MenuItemContainer link="/company/tools/generation-queue">
                    Queneration queue
                </MenuItemContainer>
            </DropdownMenuItemContainer>
        </div>
    </>
);

export default Menu;
