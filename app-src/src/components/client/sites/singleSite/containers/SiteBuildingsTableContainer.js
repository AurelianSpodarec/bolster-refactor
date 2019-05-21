import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import BuildingsTableContainer from 'components/client/buildings/shared/containers/BuildingsTableContainer';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';

const SiteBuildingsTableContainer = ({ site }) => (
    <BlockContainer>
        <BlockHeading title="Buildings" classes="w-table" />
        <BuildingsTableContainer ids={site.buildingIDs || []} />
    </BlockContainer>
);

const mapStateToProps = (
    {
        companyAdmin: {
            sitesReducer,
            buildingsReducer: { error }
        }
    },
    { match }
) => ({
    error,
    site: sitesReducer.sites[match.params.id] || {},
    isFetching: sitesReducer.isFetching,
    siteID: match.params.id
});

export default withRouter(
    connect(mapStateToProps)(SiteBuildingsTableContainer)
);
