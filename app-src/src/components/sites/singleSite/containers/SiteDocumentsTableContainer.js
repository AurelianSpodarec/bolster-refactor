import React, { Component } from 'react';
import { connect } from 'react-redux';

import DocumentsTable from 'components/shared/documents/presentational/DocumentsTable';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';

class DocumentsTableContainer extends Component {
    render() {
        const { props } = this;

        return (
            <BlockContainer>
                <DocumentsTable
                    documents={props.documents}
                    isFetching={props.isFetching}
                    error={props.error}
                />
            </BlockContainer>
        );
    }
}

const mapStateToProps = ({ documentsReducer }) => ({
    documents: Object.values(documentsReducer.documents),
    isFetching: documentsReducer.isFetching,
    error: documentsReducer.error
});

export default connect(mapStateToProps)(DocumentsTableContainer);
