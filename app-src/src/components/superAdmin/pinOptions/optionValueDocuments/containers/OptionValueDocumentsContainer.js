import React, { Component } from 'react';
import { connect } from 'react-redux';

import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import {
    SUCCESS_MODAL,
    ERROR_MODAL,
    ADMIN_ADD_DOCUMENT_TO_OPTION_VALUE,
} from 'constants/shared/modalTypes';

import OptionValueDocuments from '../presentational/OptionValueDocuments';
import fetchOptionValuesByManufacturer from 'actions/superAdmin/manufacturers/async/fetchOptionValuesByManufacturer';
import fetchDocumentsByOptionValue from 'actions/superAdmin/manufacturers/async/fetchDocumentsByOptionValue';
import Loading from 'components/shared/generic/misc/presentational/Loading';
import { isObjEmpty } from 'helpers/generic';

class OptionValueDocumentsContainer extends Component {
    render() {
        const { optionValues, isFetching, optionValueID } = this.props;

        const areOptionValuesFetched = optionValues.hasOwnProperty(optionValueID) && !isFetching;

        return !areOptionValuesFetched ? (
            <Loading />
        ) : (
            <OptionValueDocuments
                optionValues={optionValues}
                optionValueID={optionValueID}
                handleAddDocumentModal={this.handleAddDocumentModal}
            />
        );
    }

    componentDidMount = () => {
        const {
            fetchDocumentsByOptionValue,
            fetchOptionValuesByManufacturer,
            optionValueID,
            manufacturerID,
        } = this.props;
        fetchOptionValuesByManufacturer(manufacturerID);
        fetchDocumentsByOptionValue(optionValueID);
    };

    componentDidUpdate = prevProps => {
        const { postSuccess, showModal, hideModal, postError, fieldErrors } = this.props;
        if (postSuccess && !prevProps.postSuccess) {
            showModal(SUCCESS_MODAL, {
                hideModal,
                message: 'Documents list updated successfully.',
            });
        }
        if (postError && !prevProps.postError && isObjEmpty(fieldErrors)) {
            showModal(ERROR_MODAL, {
                hideModal,
                title: 'Error',
                message:
                    postError.message ||
                    'There was an error processing your request, please try again later.',
            });
        }
    };

    handleAddDocumentModal = () => {
        const { optionValueID, showModal, optionValues } = this.props;
        const optionValue = optionValues[optionValueID];

        showModal(ADMIN_ADD_DOCUMENT_TO_OPTION_VALUE, { optionValue });
    };
}

const mapStateToProps = (
    {
        superAdmin: {
            manufacturersOptionValuesReducer: { manufacturersOptionValues, isFetching, error },
            optionValueDocumentsReducer: { postSuccess, postError },
        },
    },
    {
        match: {
            params: { optionValueID, id },
        },
    },
) => ({
    manufacturerID: id,
    optionValueID,
    optionValues: manufacturersOptionValues[id] ? manufacturersOptionValues[id] : [],
    isFetching,
    error,
    postSuccess,
    postError,
});

const mapDispatchToProps = {
    fetchDocumentsByOptionValue,
    fetchOptionValuesByManufacturer,
    showModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(OptionValueDocumentsContainer);
