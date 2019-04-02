import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import BuildingPageHeader from '../presentational/BuildingPageHeader';

class BuildingPageHeaderContainer extends Component {
    render() {
        return <BuildingPageHeader building={this.props.building} />;
    }
}

export default withRouter(
    connect(({ companyAdmin: { buildingsReducer } }, ownProps) => ({
        building: buildingsReducer.buildings[ownProps.match.params.id] || {}
    }))(BuildingPageHeaderContainer)
);
