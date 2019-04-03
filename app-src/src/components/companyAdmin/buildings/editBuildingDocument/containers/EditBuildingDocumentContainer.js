import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import EditBuildingDocument from '../presentational/EditBuildingDocument';
import editDocument from 'actions/companyAdmin/documents/async/editDocument';
import fetchDocument from 'actions/companyAdmin/documents/async/fetchDocument';

class EditBuildingDocumentContainer extends Component {
    render() {
        const { id: buildingID, documentID } = this.props.match.params;
        const backUrl = `/buildings/${buildingID}`;

        return (
            <EditBuildingDocument
                handleSubmit={this.handleSubmit}
                backUrl={backUrl}
                buildingID={buildingID}
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
        const { id: buildingID } = match.params;
        if (postSuccess && !prevSuccess) {
            history.push(`/buildings/${buildingID}`);
        }
    }

    handleSubmit = body => {
        const { id: buildingID, documentID } = this.props.match.params;
        const postBody = {
            ...body,
            hierarchyType: '2',
            hierarchyID: buildingID
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
    )(EditBuildingDocumentContainer)
);
