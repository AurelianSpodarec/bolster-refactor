import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import AttachSiteDocument from '../presentational/AttachSiteDocument';

class AttachSiteDocumentContainer extends Component {
    render() {
        const { siteId } = this.props.match.params;
        const backUrl = `/sites/${siteId}`;
        return (
            <AttachSiteDocument
                handleSubmit={this.handleSubmit}
                x
                backUrl={backUrl}
            />
        );
    }

    handleSubmit = e => {
        e.preventDefault();
    };
}

// const mapStateToProps = state => ({});

// const mapDispatchToProps = {};

export default withRouter(connect()(AttachSiteDocumentContainer));
