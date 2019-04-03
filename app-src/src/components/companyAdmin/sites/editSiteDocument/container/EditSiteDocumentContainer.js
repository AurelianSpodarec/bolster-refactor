import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import EditSiteDocument from '../presentational/EditSiteDocument';
import editDocument from 'actions/companyAdmin/documents/async/editDocument';
import fetchDocument from 'actions/companyAdmin/documents/async/fetchDocument';

class EditSiteDocumentContainer extends Component {
    render() {
        const { siteID, documentID } = this.props.match.params;
        const backUrl = `/sites/${siteID}`;

        return (
            <EditSiteDocument
                handleSubmit={this.handleSubmit}
                backUrl={backUrl}
                siteID={siteID}
                documentID={documentID}
            />
        );
    }
    componentDidMount() {
        const { documentID } = this.props.match.params;
        const { fetchDocument } = this.props;
        fetchDocument(documentID);
    }

    componentDidUpdate({ postSuccess: prevSuccess }) {
        const { postSuccess, history, match } = this.props;
        const { siteID } = match.params;
        if (postSuccess && !prevSuccess) {
            // ? what redirect route?
            history.push(`/sites/${siteID}`);
        }
    }

    handleSubmit = body => {
        const { siteID, documentID } = this.props.match.params;
        const postBody = { ...body, hierarchyType: '1', hierarchyID: siteID };
        this.props.editDocument(documentID, postBody);
    };
}

const mapStateToProps = ({ companyAdmin: { documentsReducer } }) => ({
    postSuccess: documentsReducer.postSuccess
});

const mapDispatchToProps = dispatch => ({
    fetchDocument: ID => {
        dispatch(fetchDocument(ID));
    },
    editDocument: (documentID, postBody) => {
        dispatch(editDocument(documentID, postBody));
    }
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(EditSiteDocumentContainer)
);
