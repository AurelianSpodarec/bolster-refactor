import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

import BuildingsTableContainer from 'components/companyAdmin/buildings/shared/containers/BuildingsTableContainer';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';

const SiteBuildingsTableContainer = ({ site }) => (
    <BlockContainer>
        <BlockHeading title="Buildings Table" classes="w-table">
            <Link
                className="button"
                to={`/company/buildings/create/${site.id}`}
            >
                <i className="fa fa-plus" /> Add building
            </Link>
        </BlockHeading>
        <BuildingsTableContainer ids={site.buildingIDs || []} />
    </BlockContainer>
);

export default withRouter(
    connect(({ companyAdmin: { sitesReducer } }, { match }) => ({
        site: sitesReducer.sites[match.params.id] || {},
        isFetching: sitesReducer.isFetching
    }))(SiteBuildingsTableContainer)
);
