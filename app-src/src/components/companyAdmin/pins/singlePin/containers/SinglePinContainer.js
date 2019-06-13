import React, { Component } from 'react';
import { connect } from 'react-redux';

import fetchSinglePin from 'actions/companyAdmin/pins/async/fetchSinglePin';
import fetchPinTemplates from 'actions/companyAdmin/pins/async/fetchPinTemplates';
import fetchCompanyUsers from 'actions/companyAdmin/userManagement/async/fetchCompanyUsers';
import SinglePin from '../presentational/SinglePin';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import {
    ERROR_MODAL,
    SINGLE_PIN_GENERATE_REPORT_SUCCESS
} from 'constants/shared/modalTypes';

class SinglePinContainer extends Component {
    render = () => <SinglePin />;

    componentDidMount = () => {
        const { pinId, fetchSinglePinData } = this.props;
        fetchSinglePinData(pinId);
    };

    componentDidUpdate = prevProps => {
        const {
            isFetchingReport,
            isReportSuccess,
            isReportError,
            showModal
        } = this.props;

        if (
            prevProps.isFetchingReport &&
            !isFetchingReport &&
            isReportSuccess
        ) {
            showModal(SINGLE_PIN_GENERATE_REPORT_SUCCESS, {});
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
        companyAdmin: {
            generatePinReportReducer: {
                isFetching: isFetchingReport,
                success: isReportSuccess,
                error: isReportError
            }
        }
    },
    { match: { params } }
) => ({
    pinId: params.id,
    isFetchingReport,
    isReportSuccess,
    isReportError
});

const mapDispatchToProps = dispatch => ({
    fetchSinglePinData: id => {
        dispatch(fetchSinglePin(id));
        dispatch(fetchPinTemplates(id));
        dispatch(fetchCompanyUsers());
    },
    showModal: (type, props) => dispatch(showModal(type, props)),
    hideModal: type => dispatch(hideModal(type))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SinglePinContainer);
