import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import createDocument from 'actions/companyAdmin/documents/async/createDocument';
import AttachFloorDocument from '../presentational/AttachFloorDocument';

import { HIERARCHY_IDS } from 'constants/companyAdmin/enums';

class AttachFloorDocumentContainer extends Component {
    render() {
        const { id } = this.props.match.params;
        const backUrl = `/floors/${id}`;
        return (
            <AttachFloorDocument
                handleSubmit={this.handleSubmit}
                backUrl={backUrl}
                floorID={id}
            />
        );
    }

    componentDidUpdate({ postSuccess: prevSuccess }) {
        const { postSuccess, history, match } = this.props;
        const { id } = match.params;
        if (postSuccess && !prevSuccess) {
            history.push(`/floors/${id}`);
        }
    }

    handleSubmit = postBody => {
        const { createDocument } = this.props;
        const { id } = this.props.match.params;
        createDocument(HIERARCHY_IDS.Floor, id, postBody);
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
    )(AttachFloorDocumentContainer)
);
