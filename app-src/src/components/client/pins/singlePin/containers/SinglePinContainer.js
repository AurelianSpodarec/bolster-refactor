import React, { Component } from 'react';
import { connect } from 'react-redux';

import fetchClientSinglePin from 'actions/client/pins/async/clientFetchSinglePin';
import fetchClientPinTemplates from 'actions/client/pins/async/clientFetchPinTemplates';
import clientFetchPinOperatives from 'actions/client/drawings/async/clientFetchPinOperatives';
import SinglePin from '../presentational/SinglePin';
import { getSelectedCompanyForClient, isEmpty } from 'helpers/generic';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import {
    ERROR_MODAL,
    CLIENT_SINGLE_PIN_GENERATE_REPORT_SUCCESS
} from 'constants/shared/modalTypes';

class SinglePinContainer extends Component {
    render() {
        return <SinglePin />;
    }

    componentDidMount = () => {
        const {
            pinID,
            clientFetchPinOperatives,
            fetchClientSinglePin
        } = this.props;
        const selectedCompanyID = getSelectedCompanyForClient();

        fetchClientSinglePin(selectedCompanyID, pinID);
        clientFetchPinOperatives(selectedCompanyID, pinID);
    };

    componentDidUpdate = prevProps => {
        const {
            pinID,
            pins,
            fetchingPins,
            fetchExtraPinData,
            isFetchingReport,
            isReportSuccess,
            isReportError,
            showModal
        } = this.props;
        const selectedCompanyID = getSelectedCompanyForClient();

        if (!fetchingPins && prevProps.fetchingPins && !isEmpty(pins)) {
            fetchExtraPinData(selectedCompanyID, pins[pinID].drawingID);
        }

        if (
            prevProps.isFetchingReport &&
            !isFetchingReport &&
            isReportSuccess
        ) {
            showModal(CLIENT_SINGLE_PIN_GENERATE_REPORT_SUCCESS, {});
        }

        if (prevProps.isFetchingReport && !isFetchingReport && isReportError) {
            showModal(ERROR_MODAL, {
                title: 'Error',
                message: isReportError
            });
        }
    };
}

const mapStateToProps = (
    {
        client: {
            pinsReducer: { pins, isFetching: fetchingPins, error },
            generatePinReportReducer: {
                isFetching: isFetchingReport,
                success: isReportSuccess,
                error: isReportError
            }
        }
    },
    { match: { params } }
) => ({
    pinID: params.id,
    pins,
    fetchingPins,
    error,
    isFetchingReport,
    isReportSuccess,
    isReportError
});

const mapDispatchToProps = dispatch => ({
    fetchClientSinglePin: (companyID, pinID) => {
        dispatch(fetchClientSinglePin(companyID, pinID));
    },
    fetchExtraPinData: (companyID, drawingID) => {
        dispatch(fetchClientPinTemplates(companyID, drawingID));
    },
    clientFetchPinOperatives: (companyID, pinID) => {
        dispatch(clientFetchPinOperatives(companyID, pinID));
    },
    showModal: (type, props) => dispatch(showModal(type, props)),
    hideModal: type => dispatch(hideModal(type))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SinglePinContainer);
