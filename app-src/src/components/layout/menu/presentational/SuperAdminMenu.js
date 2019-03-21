import React from 'react';

import MenuItemContainer from '../containers/MenuItemContainer';
import DropdownMenuItemContainer from '../containers/DropdownMenuItemContainer';

const SuperAdminMenu = () => (
    <>
        <div className="menu-bg" />

        <div className="menu">
            <MenuItemContainer link="/">
                <i className="fa fa-home icon" /> Dashboard
            </MenuItemContainer>

            <MenuItemContainer link="/generation">
                <i className="far fa-file-export icon" /> Generation Queue
            </MenuItemContainer>

            <MenuItemContainer link="/sites">
                <i className="fa fa-building icon" />
            </MenuItemContainer>
            <DropdownMenuItemContainer
                icon="building"
                title={'Site Management'}
                baseUrl="/site-management"
            >
                <MenuItemContainer link="/site-management/demo-requests">
                    User Demo Requests
                </MenuItemContainer>
                <MenuItemContainer link="/site-management/user-enquiries">
                    User Enquiries
                </MenuItemContainer>
                <MenuItemContainer link="/site-management/companies">
                    Companies
                </MenuItemContainer>
                <MenuItemContainer link="/site-management/services">
                    Services
                </MenuItemContainer>
                <MenuItemContainer link="/site-management/settings">
                    Settings
                </MenuItemContainer>
            </DropdownMenuItemContainer>
            <DropdownMenuItemContainer
                icon="pound-sign"
                title={'Financials'}
                baseUrl="/financials"
            >
                <MenuItemContainer link="/financials/orders">
                    Orders
                </MenuItemContainer>
                <MenuItemContainer link="/financials/renewals">
                    Renewals
                </MenuItemContainer>
            </DropdownMenuItemContainer>
            <DropdownMenuItemContainer
                icon="hard-hat"
                title={'Operatives'}
                baseUrl="/opteratives"
            >
                <MenuItemContainer link="/opteratives/all">
                    All Operatives
                </MenuItemContainer>
                <MenuItemContainer link="/opteratives/company-administrators">
                    Company Administrators
                </MenuItemContainer>
                <MenuItemContainer link="/opteratives/headerquarters">
                    Headerquarters
                </MenuItemContainer>
            </DropdownMenuItemContainer>
            <MenuItemContainer link="/reports">
                <i className="fa fa-file icon" /> Reports
            </MenuItemContainer>
        </div>
    </>
);

export default SuperAdminMenu;
