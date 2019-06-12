import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import OperativesAdd from 'components/shared/operatives/presentational/OperativesAdd';

let OperativeAddContainer = ({ floor: { drawingIDs } }) => (
    <BlockContainer>
        <OperativesAdd
            type="floor"
            unavailable={!(drawingIDs && drawingIDs.length)}
        />
    </BlockContainer>
);

const mapStateToProps = (
    {
        companyAdmin: {
            floorsReducer: { floors }
        }
    },
    { match: { params } }
) => ({ floor: floors[params.id] || {} });

export default withRouter(connect(mapStateToProps)(OperativeAddContainer));
