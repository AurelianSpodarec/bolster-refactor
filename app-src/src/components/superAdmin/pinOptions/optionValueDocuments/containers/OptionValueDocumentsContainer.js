import React, { Component } from 'react';
import { connect } from 'react-redux';

import { DROPDOWN_OPTION_LOOKUP, DROPDOWN_OPTIONS } from 'constants/companyAdmin/enums';
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
});

const mapDispatchToProps = {
    fetchDocumentsByOptionValue,
    fetchOptionValuesByManufacturer,
    showModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(OptionValueDocumentsContainer);
