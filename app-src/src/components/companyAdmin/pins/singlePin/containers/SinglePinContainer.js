import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import fetchSinglePin from 'actions/companyAdmin/pins/async/fetchSinglePin';
import fetchPinTemplates from 'actions/companyAdmin/pins/async/fetchPinTemplates';
import fetchCompanyUsers from 'actions/companyAdmin/userManagement/async/fetchCompanyUsers';
import SinglePin from '../presentational/SinglePin';
import fetchDrawingTemplates from 'actions/companyAdmin/drawings/async/fetchDrawingTemplates';
import fetchDrawingDropdownOptions from 'actions/companyAdmin/drawings/async/fetchDrawingDropdownOptions';
import fetchAllPinsForDrawing from 'actions/companyAdmin/pins/async/fetchAllPinsForDrawing.js';

class SinglePinContainer extends Component {
    state = { isLoading: true };
    render = () => <SinglePin isLoading={this.state.isLoading} pin={this.props.pin} />;

    componentDidMount = () => {
        const {
            pinId,
            fetchSinglePinData,
            fetchSinglePin,
            fetchPinsForInspectionLog
        } = this.props;

        let drawingID = null;
        fetchSinglePin(pinId)
            .then(({ payload }) => {
                drawingID = payload.pin.drawingID;
                return fetchSinglePinData(pinId, drawingID);
            })
            .then(() => {
                this.setState({ isLoading: false });
                fetchPinsForInspectionLog(drawingID, pinId);
            });
    };
}

const mapStateToProps = (
    { companyAdmin: { pinsReducer: { pins } } },
    { match: { params } }
) => ({
    pinId: params.id,
    pin: pins[params.id]
});

const mapDispatchToProps = dispatch => ({
    fetchSinglePinData: (id, drawingID) => {
        return Promise.all([
            dispatch(fetchPinTemplates(id)),
            dispatch(fetchCompanyUsers()),
            dispatch(fetchDrawingTemplates(drawingID)),
            dispatch(fetchDrawingDropdownOptions(drawingID))
        ]);
    },
    fetchSinglePin: id => dispatch(fetchSinglePin(id)),
    fetchPinsForInspectionLog: (id, pinIDToKeep) =>
        dispatch(fetchAllPinsForDrawing(id, pinIDToKeep))
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(SinglePinContainer)
);
