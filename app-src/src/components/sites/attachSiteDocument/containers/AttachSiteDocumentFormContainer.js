import React, { Component } from 'react';
import { connect } from 'react-redux';

import AttachDocumentFormContainer from 'components/shared/documents/containers/AttachDocumentFormContainer';

class AttachSiteDocumentFormContainer extends Component {
    render() {
        return <AttachDocumentFormContainer handleSubmit={this.handleSubmit} />;
    }

    handleSubmit = e => {};
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect()(AttachSiteDocumentFormContainer);
