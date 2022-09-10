import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import BuildingPageHeader from '../presentational/BuildingPageHeader';
import BuildingBreadcrumbContainer from './BuildingBreadcrumbContainer';
import TabsContainer from 'components_DEPRECATED/shared/generic/tabs/containers/TabsContainer';
class BuildingPageHeaderContainer extends Component {
    render() {
        return (
            <BuildingPageHeader building={this.props.building}>
                <TabsContainer classes="hierarchy-tabs" />
                <BuildingBreadcrumbContainer></BuildingBreadcrumbContainer>
            </BuildingPageHeader>
        );
    }
}

export default withRouter(
    connect(({ companyAdmin: { buildingsReducer } }, ownProps) => ({
        building: buildingsReducer.buildings[ownProps.match.params.id] || {},
    }))(BuildingPageHeaderContainer),
);
