import React from 'react';

import MenuItemContainer from '../containers/MenuItemContainer';
import DropdownMenuItemContainer from '../containers/DropdownMenuItemContainer';

const CompanyMenu = ({ isFromHeadquarters }) => (
    <>
        <div className="menu-bg" />
        <div className="menu">
            <MenuItemContainer link="/company">
                <i className="fa fa-home icon" /> Dashboard
            </MenuItemContainer>
            {isFromHeadquarters && (
                <DropdownMenuItemContainer
                    icon="city"
                    title={'Headquarters'}
                    baseUrl="/company/headquarters"
                >
                    <MenuItemContainer link="/company/headquarters">
                        Companies
                    </MenuItemContainer>
                </DropdownMenuItemContainer>
            )}

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
                {/* <MenuItemContainer link="/company/reports"> */}
                <i className="fa fa-file icon" /> Reports
            </MenuItemContainer>

            <MenuItemContainer link="/company/message-centre">
                <i className="far fa-envelope icon" />
                Message Centre
            </MenuItemContainer>

            <DropdownMenuItemContainer
                icon="wrench"
                title={'Tools & Resources'}
                baseUrl="/company/tools"
            >
                <MenuItemContainer link="/company/tools/operative-alerts">
                    Operative Alerts
                </MenuItemContainer>
                <MenuItemContainer link="/company/tools/credit-logs">
                    Drawing Credit Log
                </MenuItemContainer>
                <MenuItemContainer link="/company/tools/templates">
                    My Templates
                </MenuItemContainer>
                <MenuItemContainer link="/company/tools/support">
                    Support
                </MenuItemContainer>
                <MenuItemContainer link="/company/tools/create-report">
                    Create Report
                </MenuItemContainer>
                <MenuItemContainer link="/company/tools/transfer-requests">
                    Pending Requests
                </MenuItemContainer>
            </DropdownMenuItemContainer>
            <DropdownMenuItemContainer
                title={'Dropdown Options'}
                icon="filter"
                baseUrl="/company/dropdown-options"
            >
                <MenuItemContainer link="/company/dropdown-options/item-types">
                    Item Types
                </MenuItemContainer>
                <MenuItemContainer link="/company/dropdown-options/installation-types">
                    Installation Types
                </MenuItemContainer>
            </DropdownMenuItemContainer>
        </div>
    </>
);

export default CompanyMenu;
