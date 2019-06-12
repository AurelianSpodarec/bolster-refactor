import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import BuildingsTableContainer from 'components/client/buildings/shared/containers/BuildingsTableContainer';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';

const SiteBuildingsTableContainer = ({ site }) => (
    <BlockContainer>
        <div className="size-lg-12">
            <BlockHeading title="Buildings" classes="w-table" />
            <BuildingsTableContainer ids={site.buildingIDs || []} />
        </div>
    </BlockContainer>
);

const mapStateToProps = (
    {
        client: {
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
