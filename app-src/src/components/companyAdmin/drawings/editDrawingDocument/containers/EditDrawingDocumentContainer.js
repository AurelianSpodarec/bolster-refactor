import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import editDocument from 'actions/companyAdmin/documents/async/editDocument';
import fetchDocument from 'actions/companyAdmin/documents/async/fetchDocument';
import EditDrawingDocument from '../presentational/EditDrawingDocument';

import { HIERARCHY_IDS } from 'constants/companyAdmin/enums';

class EditDrawingDocumentContainer extends Component {
    render() {
        const { id, documentID } = this.props.match.params;
        const backUrl = `/drawings/${id}`;

        return (
            <EditDrawingDocument
                handleSubmit={this.handleSubmit}
                backUrl={backUrl}
                drawingID={id}
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
        const { id } = match.params;
        if (postSuccess && !prevSuccess) {
            history.push(`/drawings/${id}`);
        }
    }

    handleSubmit = body => {
        const { id, documentID } = this.props.match.params;
        const postBody = {
            ...body,
            hierarchyType: HIERARCHY_IDS.Drawing,
            hierarchyID: id
        };
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
    )(EditDrawingDocumentContainer)
);
