import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';

class BuildingPageHeaderContainer extends Component {
    render() {
        return <PageHeading title={'Building: #Building Name#'} />;
    }
}

export default withRouter(
    connect(({ buildingsReducer }, ownProps) => ({
        building: buildingsReducer.buildings[ownProps.match.params.id] || {}
    }))(BuildingPageHeaderContainer)
);
