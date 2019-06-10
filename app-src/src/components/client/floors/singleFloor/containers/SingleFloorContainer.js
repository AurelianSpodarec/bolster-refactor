import React, { Component } from 'react';
import { connect } from 'react-redux';

import fetchSingleFloor from 'actions/client/floors/async/clientFetchSingleFloor';
import fetchAllDrawings from 'actions/companyAdmin/drawings/async/fetchAllDrawings';
import fetchPinStatsForLevel from 'actions/companyAdmin/stats/async/fetchPinStatsForLevel';

import SingleFloor from '../presentational/SingleFloor';
import { getSelectedCompanyForClient } from 'helpers/generic';

class SingleFloorContainer extends Component {
    render() {
        return <SingleFloor />;
    }

    componentDidMount = () => {
        const {
            floorID,
            fetchSingleFloor,
            fetchAllDrawings,
            fetchPinStatsForLevel
        } = this.props;
        const selectedCompanyID = getSelectedCompanyForClient();

        fetchSingleFloor(selectedCompanyID, floorID);
        fetchAllDrawings();
        fetchPinStatsForLevel('floor', floorID);
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
