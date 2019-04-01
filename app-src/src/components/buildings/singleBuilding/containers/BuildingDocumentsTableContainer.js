import React, { Component } from 'react';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';

// import DocumentsTable from 'components/shared/documents/presentational/DocumentsTable';

class DocumentsTableContainer extends Component {
    render() {
        return (
            <BlockContainer>
                <h1 className="heading heading-1 size-lg-12">
                    Building Doc Table
                </h1>
            </BlockContainer>
        );
    }
}

export default DocumentsTableContainer;
