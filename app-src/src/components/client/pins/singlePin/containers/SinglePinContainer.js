import React, { Component } from 'react';
import { connect } from 'react-redux';

import fetchClientSinglePin from 'actions/client/pins/async/clientFetchSinglePin';
import fetchClientPinTemplates from 'actions/client/pins/async/clientFetchPinTemplates';
import clientFetchPinOperatives from 'actions/client/drawings/async/clientFetchPinOperatives';
import SinglePin from '../presentational/SinglePin';
import { getSelectedCompanyForClient, isEmpty } from 'helpers/generic';
import clientFetchServicesForDrawing from 'actions/client/services/async/clientFetchServicesForDrawing';

class SinglePinContainer extends Component {
    state = { isLoading: true };
    render() {
        return <SinglePin isLoading={this.state.isLoading} />;
    }

    componentDidMount = () => {
        const {
            pinID,
            clientFetchPinOperatives,
            fetchClientSinglePin,
            clientFetchServicesForDrawing,
        } = this.props;
        const selectedCompanyID = getSelectedCompanyForClient();

        fetchClientSinglePin(selectedCompanyID, pinID)
            .then(
                ({
                    payload: {
                        pin: { drawingID },
                    },
                }) => {
                    clientFetchServicesForDrawing(drawingID);
                },
            )
            .then(() => {
                this.setState({ isLoading: false });
            });
        clientFetchPinOperatives(selectedCompanyID, pinID);
    };

    componentDidUpdate = prevProps => {
        const { pinID, pins, fetchingPins, fetchExtraPinData } = this.props;
        const selectedCompanyID = getSelectedCompanyForClient();

        if (!fetchingPins && prevProps.fetchingPins && !isEmpty(pins)) {
            fetchExtraPinData(selectedCompanyID, pinID);
        }
    };
}

const mapStateToProps = (
    {
        client: {
            pinsReducer: { pins, isFetching: fetchingPins, error },
        },
    },
    { match: { params } },
) => ({
    pinID: params.id,
    pins,
    fetchingPins,
    error,
});

const mapDispatchToProps = dispatch => ({
    fetchClientSinglePin: (companyID, pinID) => {
        return dispatch(fetchClientSinglePin(companyID, pinID));
    },
    fetchExtraPinData: (companyID, drawingID) => {
        return dispatch(fetchClientPinTemplates(companyID, drawingID));
    },
    clientFetchPinOperatives: (companyID, pinID) => {
        return dispatch(clientFetchPinOperatives(companyID, pinID));
    },
    clientFetchServicesForDrawing: drawingID => {
        return dispatch(clientFetchServicesForDrawing(drawingID));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(SinglePinContainer);
