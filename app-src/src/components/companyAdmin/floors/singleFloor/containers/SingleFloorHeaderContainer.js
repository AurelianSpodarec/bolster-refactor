import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import SingleFloorHeader from '../presentational/SingleFloorHeader';
import FloorBreadcrumbContainer from './FloorBreadcrumbContainer';
import TabsContainer from 'components/shared/generic/tabs/containers/TabsContainer';

const SingleFloorHeaderContainer = ({ floor }) => (
    <SingleFloorHeader floor={floor}>
        <FloorBreadcrumbContainer>
            <TabsContainer />
        </FloorBreadcrumbContainer>
    </SingleFloorHeader>
);

export default withRouter(
    connect(({ companyAdmin: { floorsReducer } }, ownProps) => ({
        floor: floorsReducer.floors[ownProps.match.params.id] || {}
    }))(SingleFloorHeaderContainer)
);
