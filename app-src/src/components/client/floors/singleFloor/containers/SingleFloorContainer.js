import React, { Component } from 'react';
import { connect } from 'react-redux';

import fetchSingleFloor from 'actions/client/floors/async/clientFetchSingleFloor';
import fetchAllDrawings from 'actions/client/drawings/async/clientFetchAllDrawings';
import fetchClientPinStatsForLevel from 'actions/client/stats/async/fetchClientPinStatsForLevel';

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
            fetchClientPinStatsForLevel
        } = this.props;
        const selectedCompanyID = getSelectedCompanyForClient();

        fetchSingleFloor(selectedCompanyID, floorID);
        fetchAllDrawings(selectedCompanyID);
        fetchClientPinStatsForLevel(selectedCompanyID, 'floor', floorID);
    };
}

const mapStateToProps = (_, { match }) => ({
    floorID: match.params['id']
});

const mapDispatchToProps = dispatch => ({
    fetchSingleFloor: (companyID, floorId) => {
        dispatch(fetchSingleFloor(companyID, floorId));
    },
    fetchAllDrawings: companyID => {
        dispatch(fetchAllDrawings(companyID));
    },
    fetchClientPinStatsForLevel: (selectedCompanyID, hierarchyType, siteID) => {
        dispatch(
            fetchClientPinStatsForLevel(
                selectedCompanyID,
                hierarchyType,
                siteID
            )
        );
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SingleFloorContainer);
