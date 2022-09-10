import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import BlockContainer from 'components_DEPRECATED/shared/generic/block/containers/BlockContainer';
import ClientInvite from 'components_DEPRECATED/shared/clients/presentational/ClientInvite';

let FloorInviteClientContainer = ({ floor: { drawingIDs } }) => (
    <BlockContainer>
        <ClientInvite type="floor" unavailable={!(drawingIDs && drawingIDs.length)} />
    </BlockContainer>
);

const mapStateToProps = (
    {
        companyAdmin: {
            floorsReducer: { floors },
        },
    },
    { match: { params } },
) => ({
    floor: floors[params.id] || {},
});

export default withRouter(connect(mapStateToProps)(FloorInviteClientContainer));
