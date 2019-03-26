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
            <DropdownMenuItemContainer
                icon="hard-hat"
                title={'Logs'}
                baseUrl="/logs"
            >
                <MenuItemContainer link="/logs/all">All Logs</MenuItemContainer>
                <MenuItemContainer link="/logs/drawing-credits">
                    Drawing Credit Logs
                </MenuItemContainer>
            </DropdownMenuItemContainer>

            <DropdownMenuItemContainer
                icon="pound-sign"
                title={'SOS'}
                baseUrl="/sos"
            >
                <MenuItemContainer link="/sos/all">
                    <i className="fa fa-file icon" /> All SOS data
                </MenuItemContainer>
                <MenuItemContainer link="/sos/Invoices">
                    <i className="fa fa-file icon" /> Invoices
                </MenuItemContainer>
            </DropdownMenuItemContainer>
            <MenuItemContainer link="/companies">
                <i className="fa fa-users icon" /> Companies
            </MenuItemContainer>
            <MenuItemContainer link="/admin/users">
                <i className="fa fa-user icon" /> Users
            </MenuItemContainer>
            <MenuItemContainer link="/template-builder">
                <i className="fa fa-file icon" /> Template builder
            </MenuItemContainer>
            <MenuItemContainer link="/qr">
                <i className="fa fa-qr icon" /> QR Codes
            </MenuItemContainer>
        </div>
    </>
);

export default SuperAdminMenu;
