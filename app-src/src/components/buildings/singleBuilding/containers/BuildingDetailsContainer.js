import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Stats from 'components/shared/stats/presentational/Stats';

class BuildingDetailsContainer extends Component {
    render() {
        const { building, isFetching } = this.props;

        return <p>Buidling Details container</p>;
    }
}

const mapStateToProps = ({ buildingReducer }, { match }) => ({
    building: buildingReducer.building[match.params.id] || {},
    isFetching: buildingReducer.isFetching,
    error: buildingReducer.error
});

export default withRouter(
    connect(
        null,
        null
    )(BuildingDetailsContainer)
);
