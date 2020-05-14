import React, { Component } from 'react';

import DocumentVersionsList from '../presentational/DocumentVersionsList';

class DocumentVersionsListContainer extends Component {
    render() {
        const versions = Object.values(this.props.document.versions);
        return <DocumentVersionsList versions={versions} />;
    }
}

export default DocumentVersionsListContainer;
