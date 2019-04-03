import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import AttachBuildingDocument from '../presentational/AttachBuildingDocument';
import createDocument from 'actions/companyAdmin/documents/async/createDocument';

class AttachBuildingDocumentContainer extends Component {
    render() {
        const { id: buildingID } = this.props.match.params;
        const backUrl = `/buildings/${buildingID}`;
        return (
            <AttachBuildingDocument
                handleSubmit={this.handleSubmit}
                backUrl={backUrl}
                buildingID={buildingID}
            />
        );
    }

    componentDidUpdate({ postSuccess: prevSuccess }) {
        const { postSuccess, history, match } = this.props;
        const { id: buildingID } = match.params;
        if (postSuccess && !prevSuccess) {
            history.push(`/buildings/${buildingID}`);
        }
    }

    handleSubmit = postBody => {
        const { createDocument } = this.props;
        const { id } = this.props.match.params;
        createDocument(2, id, postBody);
    };
}

const mapStateToProps = ({ companyAdmin: { documentsReducer } }) => ({
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
    )(AttachBuildingDocumentContainer)
);
