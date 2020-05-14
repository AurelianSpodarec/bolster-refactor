import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';

class OptionValueDocumentListContainer extends Component {
    render() {
        const { documents, services, isFetching, error } = this.props;

        return (
            <>
                <BlockContainer
                    error={error}
                    isFetching={isFetching}
                    isEmpty={!documents.length}
                    contentClass="pin-single-history no-horizontal-padding"
                >
                    <BlockHeading>
                        <button className="button green" onClick={this.handleAddDocumentModal}>
                            <i className="fa fa-plus" /> {'Add Document'}
                        </button>
                    </BlockHeading>
                    {/* <PinHistoriesList
            histories={histories}
            historyCount={histories.length}
            selectedHistoryId={selectedHistoryId}
        /> */}
                    {/* Document List List */}
                </BlockContainer>
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

export default withRouter(connect(mapStateToProps)(OptionValueDocumentListContainer));
