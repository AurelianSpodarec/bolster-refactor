import React from 'react';

import MenuItemContainer from '../containers/MenuItemContainer';
import DropdownMenuItemContainer from '../containers/DropdownMenuItemContainer';

const SuperAdminMenu = () => (
    <>
        <div className="menu-bg" />

        <div className="menu">
            <MenuItemContainer link="/admin">
                <i className="fa fa-home icon" /> Dashboard
            </MenuItemContainer>

            <MenuItemContainer link="/admin/generation-queue">
                <i className="far fa-file-export icon" /> Generation Queue
            </MenuItemContainer>

            <DropdownMenuItemContainer
                icon="building"
                title={'Site Management'}
                baseUrl="/admin/company/site-management"
            >
                <MenuItemContainer link="/admin/company/site-management/demo-requests">
                    User Demo Requests
                </MenuItemContainer>
                <MenuItemContainer link="/admin/site-management/user-enquiries">
                    User Enquiries
                </MenuItemContainer>
                <MenuItemContainer link="/admin/company/site-management/companies">
                    Companies
                </MenuItemContainer>
                <MenuItemContainer link="/admin/company/site-management/services">
                    Services
                </MenuItemContainer>
                <MenuItemContainer link="/admin/company/site-management/settings">
                    Settings
                </MenuItemContainer>
            </DropdownMenuItemContainer>
            <DropdownMenuItemContainer
                icon="pound-sign"
                title={'Financials'}
                baseUrl="/admin/financials"
            >
                <MenuItemContainer link="/admin/financials/orders">
                    Orders
                </MenuItemContainer>
                <MenuItemContainer link="/admin/financials/renewals">
                    Renewals
                </MenuItemContainer>
            </DropdownMenuItemContainer>
            <DropdownMenuItemContainer
                icon="hard-hat"
                title={'Operatives'}
                baseUrl="/admin/operatives"
            >
                <MenuItemContainer link="/admin/operatives/all">
                    All Operatives
                </MenuItemContainer>
                <MenuItemContainer link="/admin/operatives/company-administrators">
                    Company Administrators
                </MenuItemContainer>
                <MenuItemContainer link="/admin/operatives/headerquarters">
                    Headerquarters
                </MenuItemContainer>
            </DropdownMenuItemContainer>
            <DropdownMenuItemContainer
                icon="hard-hat"
                title={'Logs'}
                baseUrl="/admin/logs"
            >
                <MenuItemContainer link="/admin/logs/all">
                    All Logs
                </MenuItemContainer>
                <MenuItemContainer link="/admin/logs/drawing-credits">
                    Drawing Credit Logs
                </MenuItemContainer>
            </DropdownMenuItemContainer>

            <DropdownMenuItemContainer
                icon="pound-sign"
                title={'SOS'}
                baseUrl="/admin/sos"
            >
                <MenuItemContainer link="/admin/sos/all">
                    <i className="fa fa-file icon" /> All SOS data
                </MenuItemContainer>
                <MenuItemContainer link="/admin/sos/Invoices">
                    <i className="fa fa-file icon" /> Invoices
                </MenuItemContainer>
            </DropdownMenuItemContainer>
            <MenuItemContainer link="/admin/companies">
                <i className="fa fa-users icon" /> Companies
            </MenuItemContainer>
            <MenuItemContainer link="/admin/users">
                <i className="fa fa-user icon" /> Users
            </MenuItemContainer>
            <MenuItemContainer link="/admin/template-builder">
                <i className="fa fa-file icon" /> Template builder
            </MenuItemContainer>
            <MenuItemContainer link="/admin/qr">
                <i className="fa fa-qr icon" /> QR Codes
            </MenuItemContainer>
        </div>
    </>
);

export default SuperAdminMenu;
