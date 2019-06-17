import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import SingleDrawingHeader from '../presentational/SingleDrawingHeader';
import DrawingBreadcrumbContainer from './DrawingBreadcrumbContainer';

const SingleDrawingHeaderContainer = ({ drawing }) => (
    <SingleDrawingHeader drawing={drawing}>
        <DrawingBreadcrumbContainer />
    </SingleDrawingHeader>
);

export default withRouter(
    connect(({ companyAdmin: { drawingsReducer } }, ownProps) => ({
        drawing: drawingsReducer.drawings[ownProps.match.params.id] || {}
    }))(SingleDrawingHeaderContainer)
);
