import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import BuildingPageHeader from '../presentational/BuildingPageHeader';
import BuildingBreadcrumbContainer from './BuildingBreadcrumbContainer';

class BuildingPageHeaderContainer extends Component {
    render() {
        return (
            <BuildingPageHeader building={this.props.building}>
                <BuildingBreadcrumbContainer />
            </BuildingPageHeader>
        );
    }
}

export default withRouter(
    connect(({ client: { buildingsReducer } }, ownProps) => ({
        building: buildingsReducer.buildings[ownProps.match.params.id] || {}
    }))(BuildingPageHeaderContainer)
);
