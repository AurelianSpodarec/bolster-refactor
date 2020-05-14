import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import OptionValueDocumentsList from '../presentational/OptionValueDocumentsList';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';

class OptionValueDocumentListContainer extends Component {
    render() {
        const { documents, isFetching, error, optionValueID } = this.props;

        return (
            <>
                <OptionValueDocumentsList documents={documents} optionValueID={optionValueID} />
            </>
        );
    }

    handleAddDocumentModal = () => {
        // todo redux and modal for adding a document
    };
}

const mapStateToProps = (
    {
        superAdmin: {
            optionValueDocumentsReducer: { optionValueDocuments, isFetching, error },
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
    documents: optionValueDocuments[optionValueID]
        ? Object.values(optionValueDocuments[optionValueID])
        : [],
    isFetching,
    error,
});
// todo map state to props for object value documents

const mapDispatchToProps = {
    showModal,
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(OptionValueDocumentListContainer),
);
