import React, { Component } from 'react';
import { connect } from 'react-redux';

import fetchSingleBuilding from 'actions/companyAdmin/buildings/async/fetchSingleBuilding';
import fetchDocuments from 'actions/documents/async/fetchDocuments';
import fetchAllFloors from 'actions/companyAdmin/floors/async/fetchAllFloors';
import fetchAllDrawings from 'actions/companyAdmin/drawings/async/fetchAllDrawings';
import fetchPinStatsForLevel from 'actions/companyAdmin/stats/async/fetchPinStatsForLevel';
import fetchHistoricServicesForCompany from 'actions/companyAdmin/services/async/fetchHistoricServicesForCompany';

import SingleBuilding from '../presentational/SingleBuilding';
import setTabs from 'actions/shared/generic/tabs/sync/setTabs';
import { BUILDING_TABS } from 'constants/shared/tabNames';

class SingleBuildingContainer extends Component {
    render() {
        return <SingleBuilding />;
    }

    componentDidMount = () => {
        const {
            fetchSingleBuilding,
            fetchAllDrawings,
            fetchAllFloors,
            fetchDocuments,
            buildingID,
            fetchPinStatsForLevel,
            fetchHistoricServicesForCompany,
            setTabs
        } = this.props;

        setTabs(Object.values(BUILDING_TABS), BUILDING_TABS.GENERAL_OVERVIEW);
        fetchSingleBuilding(buildingID).then(() => {
            fetchPinStatsForLevel('building', buildingID);
            fetchAllDrawings();
            fetchAllFloors();
            fetchDocuments('building', buildingID);
            fetchHistoricServicesForCompany();
        });
    };
}

const mapDispatchToProps = {
    fetchSingleBuilding,
    fetchAllDrawings,
    fetchAllFloors,
    fetchDocuments,
    fetchPinStatsForLevel,
    fetchHistoricServicesForCompany,
    setTabs
};

export default connect(
    (_, { match }) => ({ buildingID: match.params['id'] }),
    mapDispatchToProps
)(SingleBuildingContainer);
