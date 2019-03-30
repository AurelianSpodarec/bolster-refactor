import React, { Component } from 'react';
import { connect } from 'react-redux';

import fetchSingleBuilding from 'actions/buildings/async/fetchSingleBuilding';

import BuildingEdit from '../presentational/BuildingEdit';

class BuildingEditContainer extends Component {
    state = {
        buildingName: ''
    };

    render() {
        return <BuildingEdit buildingName={this.state.buildingName} />;
    }

    _setBuildingName = () => {
        const { building } = this.props;

        this.setState({
            buildingName: building.name
        });
    };

    componentDidUpdate = prevProps => {
        const { building } = this.props;

        if (!prevProps.building.id && !!building.id) {
            this._setBuildingName();
        }
    };

    componentDidMount = () => {
        const { fetchSingleBuilding, buildingID } = this.props;

        fetchSingleBuilding(buildingID);
    };
}

const mapStateToProps = ({ buildingsReducer }, ownProps) => ({
    buildingID: ownProps.match.params.id,
    building: buildingsReducer.buildings[ownProps.match.params.id] || {}
});

const mapDispatchToProps = dispatch => ({
    fetchSingleBuilding: buildingID => {
        dispatch(fetchSingleBuilding(buildingID));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BuildingEditContainer);
