import React from 'react';

import Table from 'components/shared/generic/tables/presentational/Table';
import NewFeaturesList from './NewFeaturesList';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';

const NewFeaturesTable = ({ newFeatures, headers, error, isFetching, showNewFeaturesModal }) => {
    return (
        <>
            <BlockContainer>
                <BlockHeading title="Recent Updates">
                    <button className="button green" onClick={showNewFeaturesModal}>
                        <i className="fa fa-plus" /> Add New Feature
                    </button>
                </BlockHeading>
                <Table
                    withActions
                    headers={headers}
                    isFetching={isFetching}
                    error={error}
                    noData={!newFeatures.length}
                    noDataMessage="No New Features to display"
                >
                    <NewFeaturesList newFeatures={newFeatures} />
                </Table>
            </BlockContainer>
        </>
    );
};

export default NewFeaturesTable;
