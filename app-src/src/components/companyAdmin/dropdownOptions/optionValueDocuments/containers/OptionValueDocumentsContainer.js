import React, { Component } from 'react';
import { connect } from 'react-redux';

import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import {
    SUCCESS_MODAL,
    ERROR_MODAL,
    // COMPANY_ADD_DOCUMENT_TO_OPTION_VALUE,
} from 'constants/shared/modalTypes';

import OptionValueDocuments from '../presentational/OptionValueDocuments';
import fetchOptionValuesByManufacturer from 'actions/companyAdmin/manufacturers/async/fetchOptionValuesByManufacturer';
import fetchDocumentsByOptionValue from 'actions/companyAdmin/manufacturers/async/fetchDocumentsByOptionValue';
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
                isReadOnly={optionValues[optionValueID].isDefault}
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
        fetchDocumentsByOptionValue(manufacturerID, optionValueID);
    };

    componentDidUpdate = prevProps => {
        const {
            postSuccess,
            showModal,
            hideModal,
            postError,
            fieldErrors,
            deleteSuccess,
        } = this.props;
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
        if (deleteSuccess && !prevProps.deleteSuccess) {
            showModal(SUCCESS_MODAL, {
                hideModal,
                message: 'Document version deleted successfully.',
            });
        }
    };

    handleAddDocumentModal = () => {
        // const { optionValueID, showModal, optionValues } = this.props;
        // const optionValue = optionValues[optionValueID];
        // showModal(COMPANY_ADD_DOCUMENT_TO_OPTION_VALUE, { optionValue });
        // todo company admin add document to option value redux and documents
    };
}

const mapStateToProps = (
    {
        companyAdmin: {
            manufacturersOptionValuesReducer: { manufacturersOptionValues, isFetching, error },
            optionValueDocumentsReducer: { postSuccess, postError, deleteSuccess },
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
    deleteSuccess,
});

const mapDispatchToProps = {
    fetchDocumentsByOptionValue,
    fetchOptionValuesByManufacturer,
    showModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(OptionValueDocumentsContainer);
