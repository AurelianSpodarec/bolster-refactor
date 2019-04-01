import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import AttachSiteDocument from '../presentational/AttachSiteDocument';
import createDocument from 'actions/documents/async/createDocument';

class AttachSiteDocumentContainer extends Component {
    render() {
        const { siteId } = this.props.match.params;
        const backUrl = `/sites/${siteId}`;
        return (
            <AttachSiteDocument
                handleSubmit={this.handleSubmit}
                backUrl={backUrl}
                siteID={siteId}
            />
        );
    }

    handleSubmit = postBody => {
        const { createDocument } = this.props;
        const id = this.props.match.params.siteId;
        createDocument(1, id, postBody);
    };
}

const mapStateToProps = ({ documentsReducer }) => ({
    postSuccess: documentsReducer.postSuccess
});

const mapDispatchToProps = dispatch => ({
    createDocument: (type, id, postBody) => {
        dispatch(createDocument(type, id, postBody));
    }
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(AttachSiteDocumentContainer)
);
