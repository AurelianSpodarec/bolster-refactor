import React, { Component } from 'react';
import { connect } from 'react-redux';

import fetchSingleFloor from 'actions/companyAdmin/floors/async/fetchSingleFloor';
import fetchAllDrawings from 'actions/companyAdmin/drawings/async/fetchAllDrawings';
import fetchPinStatsForLevel from 'actions/companyAdmin/stats/async/fetchPinStatsForLevel';

import SingleFloor from '../presentational/SingleFloor';

class SingleFloorContainer extends Component {
    render() {
        return <SingleFloor />;
    }

    componentDidMount = () => {
        const {
            floorID,
            fetchSingleFloor,
            fetchAllDrawings,
            // fetchClients,
            fetchPinStatsForLevel
        } = this.props;

        fetchSingleFloor(floorID);
        fetchAllDrawings();
        fetchPinStatsForLevel('floor', floorID);
        // fetch Clients hooked up to mock data
    };
}

const mapStateToProps = (_, { match }) => ({
    floorID: match.params['id']
});

const mapDispatchToProps = dispatch => ({
    fetchSingleFloor: id => {
        dispatch(fetchSingleFloor(id));
    },
    fetchAllDrawings: () => {
        dispatch(fetchAllDrawings());
    },

    fetchPinStatsForLevel: (hierarchyType, levelID) => {
        dispatch(fetchPinStatsForLevel(hierarchyType, levelID));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SingleFloorContainer);
