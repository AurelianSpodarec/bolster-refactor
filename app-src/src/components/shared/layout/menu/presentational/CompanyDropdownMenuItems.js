import React from 'react';

import { DROPDOWN_OPTIONS } from 'constants/companyAdmin/enums';

import MenuItemContainer from '../containers/MenuItemContainer';
import CompanyDropdownMenuItemContainer from '../containers/CompanyDropdownMenuItemContainer';

const DropdownHeaders = Object.values(DROPDOWN_OPTIONS);

const DropdownMenuItems = () => (
    <CompanyDropdownMenuItemContainer
        icon="map-marker-alt"
        title={'Pin Options'}
        baseUrl="/company/dropdown-options"
    >
        {DropdownHeaders.map(({ name, link }) => (
            <MenuItemContainer
                key={name}
                link={`/company/dropdown-options/${link}`}
            >
                {name}
            </MenuItemContainer>
        ))}
    </CompanyDropdownMenuItemContainer>
);

export default DropdownMenuItems;
