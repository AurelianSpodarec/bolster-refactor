import React from 'react';

import { DROPDOWN_OPTIONS } from 'constants/companyAdmin/enums';

import MenuItemContainer from '../containers/MenuItemContainer';
import MenuHeader from './MenuHeader';

const DropdownHeaders = Object.values(DROPDOWN_OPTIONS);

const DropdownMenuItems = () => (
    <>
        <MenuHeader title="Pin Options" />
        {DropdownHeaders.map(({ name, link }) => (
            <MenuItemContainer
                key={name}
                link={`/company/dropdown-options/${link}`}
            >
                {name}
            </MenuItemContainer>
        ))}
    </>
);

export default DropdownMenuItems;
