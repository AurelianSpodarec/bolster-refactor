import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

import DrawingTableContainer from 'components/companyAdmin/drawings/shared/containers/DrawingTableContainer';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';

const FloorDrawingsTableContainer = ({ floor }) => (
    <BlockContainer>
        <BlockHeading title="Drawings Table" classes="w-table">
            <Link
                className="button"
                to={`/company/drawings/create/${floor.id}`}
            >
                <i className="fa fa-plus" /> Add Drawing
            </Link>
        </BlockHeading>
        <DrawingTableContainer ids={floor.drawingIDs || []} />
    </BlockContainer>
);

export default withRouter(
    connect(({ companyAdmin: { floorsReducer } }, { match }) => ({
        floor: floorsReducer.floors[match.params.id] || {},
        isFetching: floorsReducer.isFetching
    }))(FloorDrawingsTableContainer)
);
