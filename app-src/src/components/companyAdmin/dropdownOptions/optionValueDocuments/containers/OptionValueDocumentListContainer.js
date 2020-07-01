import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import OptionValueDocumentsList from '../presentational/OptionValueDocumentsList';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';

class OptionValueDocumentListContainer extends Component {
    render() {
        const {
            documents,
            isFetching,
            error,
            optionValueID,
            isReadOnly,
            manufacturerID,
        } = this.props;

        return !isFetching && !documents.length ? (
            <BlockContainer
                error={error}
                isEmpty={!documents.length}
                noDataMessage="There are no documents attached to this option value."
            />
        ) : (
            <OptionValueDocumentsList
                documents={documents}
                optionValueID={optionValueID}
                isReadOnly={isReadOnly}
                manufacturerID={manufacturerID}
            />
        );
    }
}

const mapStateToProps = (
    {
        companyAdmin: {
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

const mapDispatchToProps = {
    showModal,
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(OptionValueDocumentListContainer),
);
