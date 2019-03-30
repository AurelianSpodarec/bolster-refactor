import React, { Component } from 'react';
import { connect } from 'react-redux';

import fetchSingleFloor from 'actions/floors/async/fetchSingleFloor';

import FloorEdit from '../presentational/FloorEdit';

class FloorEditContainer extends Component {
    state = {
        floorName: ''
    };

    render() {
        return <FloorEdit floorName={this.state.floorName} />;
    }

    _setFloorName = () => {
        const { floor } = this.props;
        console.log(floor);
        this.setState({
            floorName: floor.name
        });
    };

    componentDidUpdate = prevProps => {
        const { floor } = this.props;

        if (!prevProps.floor.id && floor.id) {
            this._setFloorName();
        }
    };

    componentDidMount = () => {
        const { fetchSingleFloor, floorID, floor } = this.props;

        fetchSingleFloor(floorID);
        if (floor.id) {
            this._setFloorName();
        }
    };
}

const mapStateToProps = ({ floorsReducer }, ownProps) => ({
    floorID: ownProps.match.params.id,
    floor: floorsReducer.floors[ownProps.match.params.id] || {}
});

const mapDispatchToProps = dispatch => ({
    fetchSingleFloor: floorID => {
        dispatch(fetchSingleFloor(floorID));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FloorEditContainer);
