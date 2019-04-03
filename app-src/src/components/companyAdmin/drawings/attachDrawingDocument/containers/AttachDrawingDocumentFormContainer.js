import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import AttachDrawingDocument from '../presentational/AttachDrawingDocument';
import createDocument from 'actions/companyAdmin/documents/async/createDocument';

import { HIERARCHY_IDS } from 'constants/companyAdmin/enums';

class AttachDrawingDocumentContainer extends Component {
    render() {
        const { id } = this.props.match.params;
        const backUrl = `/drawings/${id}`;
        return (
            <AttachDrawingDocument
                handleSubmit={this.handleSubmit}
                backUrl={backUrl}
                drawingID={id}
            />
        );
    }

    componentDidUpdate({ postSuccess: prevSuccess }) {
        const { postSuccess, history, match } = this.props;
        const { id } = match.params;
        if (postSuccess && !prevSuccess) {
            history.push(`/drawings/${id}`);
        }
    }

    handleSubmit = postBody => {
        const { createDocument } = this.props;
        const { id } = this.props.match.params;
        createDocument(HIERARCHY_IDS.Drawing, id, postBody);
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
    )(AttachDrawingDocumentContainer)
);
