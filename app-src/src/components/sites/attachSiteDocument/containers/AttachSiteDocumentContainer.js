import React, { Component } from 'react';
import { connect } from 'react-redux';
import AttachSiteDocument from '../presentational/AttachSiteDocument';

class AttachSiteDocumentContainer extends Component {
    render() {
        return <AttachSiteDocument handleSubmit={this.handleSubmit} />;
    }

    handleSubmit = e => {
        e.preventDefault();
    };
}

// const mapStateToProps = state => ({});

// const mapDispatchToProps = {};

export default connect()(AttachSiteDocumentContainer);
