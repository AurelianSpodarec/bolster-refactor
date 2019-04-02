import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import EditSiteDocument from '../presentational/EditSiteDocument';

class EditSiteDocumentContainer extends Component {
    render() {
        const { siteID, documentID } = this.props.match.params;

        return (
            <EditSiteDocument
                handleSubmit={this.handleSubmit}
                siteID={siteID}
                documentID={documentID}
            />
        );
    }

    componentDidUpdate({ postSuccess: prevSuccess }) {
        const { postSuccess, history, match } = this.props;
        const { siteID } = match.params;
        if (postSuccess && !prevSuccess) {
            // ? what redirect route?
        }
    }

    handleSubmit = postBody => {
        const { siteID, documentID } = this.props.match.params;
        editDocument(1, siteID, documentID, postBody);
    };
}

const mapStateToProps = ({ documentsReducer }) => ({
    postSuccess: documentsReducer.postSuccess
});

const mapDispatchToProps = dispatch => ({
    editDocument: (type, siteID, documentID, postBody) => {
        dispatch(editDocument(type, siteID, documentID, postBody));
    }
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(EditSiteDocumentContainer)
);
