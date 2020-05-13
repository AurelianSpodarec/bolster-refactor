import React from 'react';

import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import OptionValuesTableContainer from '../containers/OptionValuesTableContainer';

const SingleManufacturer = ({ manufacturers, manufacturerID }) => (
    <>
        <PageHeading title={`${manufacturers[manufacturerID].name} Option Values`} withBackButton />
        <OptionValuesTableContainer />
    </>
);

export default SingleManufacturer;
