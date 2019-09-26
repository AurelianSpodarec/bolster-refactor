import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import withUpdateOnChange from '../hocs/withUpdateOnChange';
import fetchSingleFloor from 'actions/companyAdmin/floors/async/fetchSingleFloor';
import fetchSingleBuilding from 'actions/companyAdmin/buildings/async/fetchSingleBuilding';
import fetchSingleSite from 'actions/companyAdmin/sites/async/fetchSingleSite';
import fetchSingleDrawing from 'actions/companyAdmin/drawings/async/fetchSingleDrawing';

class DrawingPickerContainer extends Component {
    render() {
        return <DrawingPicker />;
    }
}

//get each drawing for each level
const mapStateToProps = ({
    companyAdmin: {
        sitesReducer,
        buildingsReducer,
        floorsReducer,
        drawingsReducer,
        reportsReducer: {
            filters: { siteID, floorID, buildingID }
        }
    }
}) => ({
    siteID,
    floorID,
    buildingID,
    isFetching:
        sitesReducer.isFetching ||
        buildingsReducer.isFetching ||
        floorsReducer.isFetching ||
        drawingsReducer.isFetching
});

const mapDispatchToProps = {
    fetchSingleDrawing,
    fetchSingleFloor,
    fetchSingleBuilding,
    fetchSingleSite
};

export default withRouter(
    withUpdateOnChange(
        connect(
            mapStateToProps,
            mapDispatchToProps
        )(DrawingPickerContainer)
    )
);
