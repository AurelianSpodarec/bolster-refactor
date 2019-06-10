import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import SingleDrawingHeader from '../presentational/SingleDrawingHeader';
import DrawingBreadcrumbContainer from './DrawingBreadcrumbContainer';
import TabsContainer from 'components/shared/generic/tabs/containers/TabsContainer';

const SingleDrawingHeaderContainer = ({ drawing }) => (
    <SingleDrawingHeader drawing={drawing}>
        <DrawingBreadcrumbContainer>
            <TabsContainer />
        </DrawingBreadcrumbContainer>
    </SingleDrawingHeader>
);

export default withRouter(
    connect(({ client: { drawingsReducer } }, ownProps) => ({
        drawing: drawingsReducer.drawings[ownProps.match.params.id] || {}
    }))(SingleDrawingHeaderContainer)
);
