import React, { Component } from 'react';
import { connect } from 'react-redux';

import fetchSingleClientBuilding from 'actions/client/buildings/async/clientFetchSingleBuilding';
import fetchAllClientFloors from 'actions/client/floors/async/clientFetchAllFloors';
import fetchAllClientDrawings from 'actions/client/drawings/async/clientFetchAllDrawings';
import fetchClientPinStatsForLevel from 'actions/client/stats/async/fetchClientPinStatsForLevel';

import SingleBuilding from '../presentational/SingleBuilding';

import { getSelectedCompanyForClient } from 'helpers/generic';

class SingleBuildingContainer extends Component {
    render() {
        return <SingleBuilding />;
    }

    componentDidMount = () => {
        const {
            fetchSingleClientBuilding,
            fetchAllClientDrawings,
            fetchAllClientFloors,
            buildingID,
            fetchClientPinStatsForLevel
        } = this.props;

        const selectedCompanyID = getSelectedCompanyForClient();

        fetchSingleClientBuilding(selectedCompanyID, buildingID).then(() => {
            fetchClientPinStatsForLevel(
                selectedCompanyID,
                'building',
                buildingID
            );
            fetchAllClientDrawings(selectedCompanyID);
            fetchAllClientFloors(selectedCompanyID);
        });
    };
}

const mapDispatchToProps = dispatch => ({
    fetchSingleClientBuilding: (companyID, buildingID) => {
        return dispatch(fetchSingleClientBuilding(companyID, buildingID));
    },
    fetchAllClientDrawings: companyID => {
        dispatch(fetchAllClientDrawings(companyID));
    },
    fetchAllClientFloors: companyID => {
        dispatch(fetchAllClientFloors(companyID));
    },
    fetchClientPinStatsForLevel: (companyID, hierarchyType, levelID) => {
        dispatch(
            fetchClientPinStatsForLevel(companyID, hierarchyType, levelID)
        );
    }
});

export default connect(
    (_, { match }) => ({ buildingID: match.params['id'] }),
    mapDispatchToProps
)(SingleBuildingContainer);
