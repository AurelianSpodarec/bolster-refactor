import React from 'react';
import { connect, batch } from 'react-redux';

import { DRAWING_TABS } from 'constants/shared/tabNames';
import setTabs from 'actions/shared/generic/tabs/sync/setTabs';

import SingleDrawing from '../presentational/SingleDrawing';

import fetchSingleDrawing from 'actions/companyAdmin/drawings/async/fetchSingleDrawing';
import fetchDocuments from 'actions/documents/async/fetchDocuments';
import fetchPins from 'actions/companyAdmin/pins/async/fetchPins';
import fetchClientsForDrawing from 'actions/companyAdmin/clients/async/fetchClientsForDrawing';
import fetchOperativesForDrawing from 'actions/companyAdmin/operatives/async/fetchOperativesForDrawing';
import fetchCompanyUsers from 'actions/companyAdmin/userManagement/async/fetchCompanyUsers';
import fetchPinStatsForLevel from 'actions/companyAdmin/stats/async/fetchPinStatsForLevel';
import fetchHistoricServicesForCompany from 'actions/companyAdmin/services/async/fetchHistoricServicesForCompany';
import { componentDidMount } from 'helpers/generic';
import fetchZonesByDrawingID from 'actions/companyAdmin/zones/async/fetchZonesByDrawingID';
import fetchPinOptionVersions from '../../../../../actions/companyAdmin/pinOptions/async/fetchPinOptionVersions';
import fetchPinOptions from '../../../../../actions/companyAdmin/pinOptions/async/fetchPinOptions';

const SingleDrawingContainer = ({ drawingID, setTabs, fetchDrawingData }) => {
    const tabs = Object.values(DRAWING_TABS);
    componentDidMount(() => {
        setTabs(tabs, DRAWING_TABS.GENERAL_OVERVIEW);
        fetchDrawingData(drawingID);
    });

    return <SingleDrawing />;
};

const mapDispatchToProps = dispatch => ({
    setTabs: (tabs, selectedTab) => dispatch(setTabs(tabs, selectedTab)),
    fetchDrawingData: drawingID => {
        if (drawingID) {
            batch(() => {
                dispatch(fetchSingleDrawing(drawingID));
                dispatch(fetchDocuments('drawing', drawingID));
                dispatch(fetchClientsForDrawing(drawingID));
                dispatch(fetchOperativesForDrawing(drawingID));
                dispatch(fetchPins('drawing', drawingID));
                dispatch(fetchPinStatsForLevel(4, drawingID));
                dispatch(fetchZonesByDrawingID(drawingID));
                dispatch(fetchPinOptions());
                dispatch(fetchPinOptionVersions());
            });
        }
        dispatch(fetchCompanyUsers());
        dispatch(fetchHistoricServicesForCompany());
    },
});

export default connect(
    (_, { match }) => ({ drawingID: match?.params.id }),
    mapDispatchToProps,
)(SingleDrawingContainer);
