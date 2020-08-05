import React from 'react';

import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import OptionValuesTableContainer from '../containers/OptionValuesTableContainer';

const SingleManufacturer = ({
    manufacturers,
    manufacturerID,
    handleSortChange,
    selectedSortValue,
}) => (
    <>
        <PageHeading title={`${manufacturers[manufacturerID].name} Option Values`} withBackButton />
        <OptionValuesTableContainer
            handleSortChange={handleSortChange}
            selectedSortValue={selectedSortValue}
        />
    </>
);

export default SingleManufacturer;
