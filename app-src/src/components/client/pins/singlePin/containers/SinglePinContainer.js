import React, { Component } from 'react';
import { connect } from 'react-redux';

import fetchClientSinglePin from 'actions/client/pins/async/clientFetchSinglePin';
import fetchClientPinTemplates from 'actions/client/pins/async/clientFetchPinTemplates';
import fetchDrawingOperatives from 'actions/client/drawings/async/clientFetchDrawingOperatives';
import SinglePin from '../presentational/SinglePin';
import { getSelectedCompanyForClient, isEmpty } from 'helpers/generic';

class SinglePinContainer extends Component {
    render() {
        return <SinglePin />;
    }

    componentDidMount = () => {
        const { pinID, fetchClientSinglePin } = this.props;
        const selectedCompanyID = getSelectedCompanyForClient();

        fetchClientSinglePin(selectedCompanyID, pinID);
    };

    componentDidUpdate = prevProps => {
        const { pinID, pins, fetchingPins, fetchExtraPinData } = this.props;
        const selectedCompanyID = getSelectedCompanyForClient();

        if (!fetchingPins && prevProps.fetchingPins && !isEmpty(pins)) {
            fetchExtraPinData(selectedCompanyID, pins[pinID].drawingID);
        }
    };
}

const mapStateToProps = (
    {
        client: {
            pinsReducer: { pins, isFetching: fetchingPins, error }
        }
    },
    { match: { params } }
) => ({
    pinID: params.id,
    pins,
    fetchingPins,
    error
});

const mapDispatchToProps = dispatch => ({
    fetchClientSinglePin: (companyID, pinID) => {
        dispatch(fetchClientSinglePin(companyID, pinID));
    },
    fetchExtraPinData: (companyID, drawingID) => {
        dispatch(fetchClientPinTemplates(companyID, drawingID));
        dispatch(fetchDrawingOperatives(companyID, drawingID));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SinglePinContainer);
