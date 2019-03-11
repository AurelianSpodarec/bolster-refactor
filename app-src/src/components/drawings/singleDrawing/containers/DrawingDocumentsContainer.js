import React, { Component } from 'react';

import DocumentsTable from 'components/shared/documents/presentational/DocumentsTable';

class DrawingDocumentsContainer extends Component {
    render() {
        const documents = [
            {
                id: 1,
                name: 'Document 1'
            },
            {
                id: 2,
                name: 'Document 2'
            },
            {
                id: 3,
                name: 'Document 3'
            }
        ];

        return <DocumentsTable documents={documents} />;
    }
}

export default DrawingDocumentsContainer;
