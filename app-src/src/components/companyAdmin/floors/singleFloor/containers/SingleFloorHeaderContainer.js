import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import SingleFloorHeader from '../presentational/SingleFloorHeader';

const SingleFloorHeaderContainer = ({ floor }) => (
    <SingleFloorHeader floor={floor} />
);

export default withRouter(
    connect(({ companyAdmin: { floorsReducer } }, ownProps) => ({
        floor: floorsReducer.floors[ownProps.match.params.id] || {}
    }))(SingleFloorHeaderContainer)
);
