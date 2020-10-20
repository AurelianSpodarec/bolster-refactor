import React from 'react';

import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import OptionValuesTableContainer from '../containers/OptionValuesTableContainer';

const SingleManufacturer = ({ manufacturers, manufacturerID, isSorting, toggleIsSorting }) => (
    <>
        <PageHeading title={`${manufacturers[manufacturerID].name} Option Values`} withBackButton>
            {isSorting ? (
                <button className="button green" onClick={toggleIsSorting}>
                    <i className="far fa-check" /> Finish Sorting
                </button>
            ) : (
                <button className="button" onClick={toggleIsSorting}>
                    <i className="far fa-sort" /> Sort Mode
                </button>
            )}
        </PageHeading>
        <OptionValuesTableContainer />
    </>
);

export default SingleManufacturer;
