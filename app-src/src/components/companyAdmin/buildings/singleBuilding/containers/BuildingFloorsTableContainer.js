import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import FloorTableContainer from 'components/companyAdmin/floors/shared/containers/FloorTableContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';

const BuildingsFloorsTableContainer = ({ building }) => (
    <BlockContainer>
        <BlockHeading title="Floors Table" classes="w-table">
            <Link
                className="button"
                to={`/company/floors/create/${building.id}`}
            >
                <i className="fa fa-plus" /> Add floor
            </Link>
        </BlockHeading>
        <FloorTableContainer ids={building.floorIDs || []} />
    </BlockContainer>
);

export default withRouter(
    connect(({ companyAdmin: { buildingsReducer } }, ownProps) => ({
        building: buildingsReducer.buildings[ownProps.match.params.id] || {},
        isFetching: buildingsReducer.isFetching
    }))(BuildingsFloorsTableContainer)
);
