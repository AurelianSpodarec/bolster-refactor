import React from 'react';

import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import ManufacturerTableContainer from '../containers/ManufacturerTableContainer';

const PinOptionsManufacturers = ({ name, type }) => (
    <>
        <PageHeading title={`${name} Manufacturers`} withBackButton />
        <ManufacturerTableContainer title={name} type={type} />
    </>
);

export default PinOptionsManufacturers;
