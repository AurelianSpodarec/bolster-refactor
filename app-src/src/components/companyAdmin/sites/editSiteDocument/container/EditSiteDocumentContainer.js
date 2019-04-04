import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import EditSiteDocument from '../presentational/EditSiteDocument';
import editDocument from 'actions/companyAdmin/documents/async/editDocument';
import fetchSingleDocument from 'actions/companyAdmin/documents/async/fetchSingleDocument';

import { HIERARCHY_IDS } from 'constants/companyAdmin/enums';

class EditSiteDocumentContainer extends Component {
    render() {
        const { id, documentID } = this.props.match.params;
        const backUrl = `/sites/${id}`;

        return (
            <EditSiteDocument
                handleSubmit={this.handleSubmit}
                backUrl={backUrl}
                siteID={id}
                documentID={documentID}
            />
        );
    }
    componentDidMount() {
        const { documentID } = this.props.match.params;
        const { fetchSingleDocument } = this.props;
        fetchSingleDocument(documentID);
    }

    componentDidUpdate({ postSuccess: prevSuccess }) {
        const { postSuccess, history, match } = this.props;
        const { id } = match.params;
        if (postSuccess && !prevSuccess) {
            // ? what redirect route?
            history.push(`/sites/${id}`);
        }
    }

    handleSubmit = body => {
        const { id, documentID } = this.props.match.params;
        const postBody = {
            ...body,
            hierarchyType: HIERARCHY_IDS.Site,
            hierarchyID: id
        };
        this.props.editDocument(documentID, postBody);
    };
}

const mapStateToProps = ({ companyAdmin: { documentsReducer } }) => ({
    postSuccess: documentsReducer.postSuccess
});

const mapDispatchToProps = dispatch => ({
    fetchSingleDocument: ID => {
        dispatch(fetchSingleDocument(ID));
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
