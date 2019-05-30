import React from 'react';

import { DROPDOWN_OPTIONS } from 'constants/companyAdmin/enums';

import MenuItemContainer from '../containers/MenuItemContainer';

const DropdownHeaders = Object.values(DROPDOWN_OPTIONS);

const DropdownMenuItems = () => (
    <div className={'item open always'}>
        <a disabled>
            <i className={'fa fa-filter icon'} />
            {'Dropdown Options'}
        </a>

        <div className="sub-menu">
            {DropdownHeaders.map(({ name, link }) => (
                <MenuItemContainer
                    key={name}
                    link={`/company/dropdown-options/${link}`}
                >
                    {name}
                </MenuItemContainer>
            ))}
        </div>
    </div>
);

export default DropdownMenuItems;
