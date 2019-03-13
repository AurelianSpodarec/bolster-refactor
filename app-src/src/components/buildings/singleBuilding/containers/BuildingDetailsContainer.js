import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Stats from 'components/shared/stats/presentational/Stats';

class BuildingDetailsContainer extends Component {
    render() {
        const { building, isFetching } = this.props;

        return <Stats details={building} isFetching={isFetching} />;
    }
}

const mapStateToProps = ({ buildingReducer }, { match }) => ({
    building: buildingReducer.building[match.params.id] || {},
    isFetching: buildingReducer.isFetching,
    error: buildingReducer.error
});

export default withRouter(
    connect(
        mapStateToProps,
        null
    )(BuildingDetailsContainer)
);
