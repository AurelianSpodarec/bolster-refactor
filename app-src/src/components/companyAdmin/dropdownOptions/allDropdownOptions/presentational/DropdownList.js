import React from 'react';

import { DROPDOWN_OPTION_MANUFACTURER_ENABLED } from 'constants/companyAdmin/enums';

import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import DropdownListTableContainer from '../containers/DropdownListTableContainer';
import ManufacturerTableContainer from '../containers/ManufacturerTableContainer';

const DropdownList = ({ name, type }) => (
    <>
        <PageHeading title={name} withBackButton />
        {DROPDOWN_OPTION_MANUFACTURER_ENABLED[type] ? (
            <div className="flex-container size-lg-12">
                <div className="flex-item size-lg-6 size-md-12">
                    <DropdownListTableContainer title={name} type={type} />
                </div>
                <div className="flex-item size-lg-6 size-md-12">
                    <ManufacturerTableContainer type={type} />
                </div>
            </div>
        ) : (
            <DropdownListTableContainer title={name} type={type} />
        )}
    </>
);

export default DropdownList;
