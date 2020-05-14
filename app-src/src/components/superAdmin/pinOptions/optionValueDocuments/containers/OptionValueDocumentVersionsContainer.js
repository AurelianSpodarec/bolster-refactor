import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import PinHistoriesList from '../presentational/PinHistoriesList';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';

class OptionValueDocumentVersionsContainer extends Component {
    render() {
        const { documents, services, isFetching, error } = this.props;

        return (
            <BlockContainer
                error={error}
                isFetching={isFetching}
                isEmpty={!documents.length || !services.length}
                contentClass="pin-single-history no-horizontal-padding"
            >
                <BlockHeading title={'##documents name##'}>
                    <button className="button green" onClick={this.handleAddDocumentModal}>
                        <i className="fa fa-plus" /> {'Add Manufacturer'}
                    </button>
                </BlockHeading>

                {/* <PinHistoriesList
            histories={histories}
            historyCount={histories.length}
            selectedHistoryId={selectedHistoryId}
        /> */}
                {/* Document Versions List */}
            </BlockContainer>
        );
    }

    handleAddDocumentModal = () => {
        // todo redux and modal for adding a document
    };
}

// todo map state to props for object value documents

// export default withRouter(connect(mapStateToProps)(OptionValueDocumentVersionsContainer));
export default OptionValueDocumentVersionsContainer;
