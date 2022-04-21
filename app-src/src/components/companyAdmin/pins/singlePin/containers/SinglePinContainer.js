import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import fetchSinglePin from 'actions/companyAdmin/pins/async/fetchSinglePin';
import fetchPinTemplates from 'actions/companyAdmin/pins/async/fetchPinTemplates';
import fetchCompanyUsers from 'actions/companyAdmin/userManagement/async/fetchCompanyUsers';
import SinglePin from '../presentational/SinglePin';
import fetchDrawingTemplates from 'actions/companyAdmin/drawings/async/fetchDrawingTemplates';
import fetchDrawingDropdownOptions from 'actions/companyAdmin/drawings/async/fetchDrawingDropdownOptions';
import fetchAllPinsForDrawing from 'actions/companyAdmin/pins/async/fetchAllPinsForDrawing';
import fetchAllOptionValues from 'actions/companyAdmin/manufacturers/async/fetchAllOptionValues';
import fetchZonesByDrawingID from 'actions/companyAdmin/zones/async/fetchZonesByDrawingID';
import fetchPinOptions from '../../../../../actions/companyAdmin/pinOptions/async/fetchPinOptions';
import fetchPinOptionVersions from '../../../../../actions/companyAdmin/pinOptions/async/fetchPinOptionVersions';

class SinglePinContainer extends Component {
    state = { isLoading: true };
    render = () => (
        <SinglePin
            isLoading={this.state.isLoading}
            pin={this.props.pin}
            pinTasks={this.formatPinTasks}
        />
    );

    componentDidMount = () => {
        const { fetchPinOptions, fetchPinOptionVersions } = this.props;
        fetchPinOptions();
        fetchPinOptionVersions();
        this.fetchPin();
    };

    componentDidUpdate = prevProps => {
        const { pinId } = this.props;

        if (prevProps.pinId !== pinId && pinId) {
            this.fetchPin();
        }
    };

    fetchPin = () => {
        const {
            pinId,
            fetchSinglePinData,
            fetchSinglePin,
            fetchPinsForInspectionLog,
            fetchAllOptionValues,
            fetchZonesByDrawingID,
        } = this.props;

        let drawingID = null;

        fetchAllOptionValues();

        fetchSinglePin(pinId)
            .then(({ payload }) => {
                drawingID = payload.pin.drawingID;
                if (drawingID) {
                    fetchZonesByDrawingID(drawingID);
                    fetchPinsForInspectionLog(drawingID, pinId);
                    return fetchSinglePinData(pinId, drawingID);
                }
            })
            .then(() => {
                this.setState({ isLoading: false });
                if (drawingID) {
                    fetchPinsForInspectionLog(drawingID, pinId);
                }
            });
    };

    formatPinTasks = () => {
        const { singlePinTasks } = this.props;
        if (singlePinTasks) {
            return singlePinTasks.map(task => {
                return {
                    ...task,
                    taskType: task.taskType.replace('_', ' '),
                    taskStatus: task.taskStatus.replace('_', ' '),
                };
            });
        }
    };
}

const mapStateToProps = (
    {
        companyAdmin: {
            pinsReducer: { pins },
        },
    },
    { match: { params } },
) => ({
    pinId: params.id,
    pin: pins[params.id],
});

const mapDispatchToProps = dispatch => ({
    fetchSinglePinData: (id, drawingID) => {
        return Promise.all([
            dispatch(fetchPinTemplates(id)),
            dispatch(fetchCompanyUsers()),
            dispatch(fetchDrawingTemplates(drawingID)),
            dispatch(fetchDrawingDropdownOptions(drawingID)),
            dispatch(fetchZonesByDrawingID(drawingID)),
        ]);
    },
    fetchSinglePin: id => dispatch(fetchSinglePin(id)),
    fetchPinsForInspectionLog: (id, pinIDToKeep) =>
        dispatch(fetchAllPinsForDrawing(id, pinIDToKeep)),
    fetchAllOptionValues: () => dispatch(fetchAllOptionValues()),
    fetchZonesByDrawingID: drawingID => fetchZonesByDrawingID(drawingID),
    fetchPinOptions: () => dispatch(fetchPinOptions()),
    fetchPinOptionVersions: () => dispatch(fetchPinOptionVersions()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SinglePinContainer));
