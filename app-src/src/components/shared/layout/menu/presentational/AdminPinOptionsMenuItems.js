import React from 'react';

import {
    DROPDOWN_OPTIONS,
    DROPDOWN_OPTION_MANUFACTURER_ENABLED,
    DROPDOWN_OPTION_VALS,
    DROPDOWN_OPTION_ENUM,
} from 'constants/companyAdmin/enums';

import MenuItemContainer from '../containers/MenuItemContainer';

const AdminPinOptionsMenuItems = () => {
    const DropdownVals = Object.values(DROPDOWN_OPTION_VALS);

    return DropdownVals.map(option => {
        return DROPDOWN_OPTION_MANUFACTURER_ENABLED[option] ? (
            <MenuItemContainer link={`/admin/pin-options/${DROPDOWN_OPTIONS[option].link}`}>
                <i className="fa fa-wrench icon" />{' '}
                <span className="menu-text">{DROPDOWN_OPTION_ENUM[option]}</span>
            </MenuItemContainer>
        ) : null;
    });
};

export default AdminPinOptionsMenuItems;
