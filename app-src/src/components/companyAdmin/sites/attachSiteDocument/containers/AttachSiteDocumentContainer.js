import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import AttachSiteDocument from '../presentational/AttachSiteDocument';
import createDocument from 'actions/companyAdmin/documents/async/createDocument';

class AttachSiteDocumentContainer extends Component {
    render() {
        const { id } = this.props.match.params;
        const backUrl = `/sites/${id}`;
        return (
            <AttachSiteDocument
                handleSubmit={this.handleSubmit}
                backUrl={backUrl}
                siteID={id}
            />
        );
    }

    componentDidUpdate({ postSuccess: prevSuccess }) {
        const { postSuccess, history, match } = this.props;
        const { id } = match.params;
        if (postSuccess && !prevSuccess) {
            history.push(`/sites/${id}`);
        }
    }

    handleSubmit = postBody => {
        const { createDocument } = this.props;
        const { id } = this.props.match.params;
        createDocument(1, id, postBody);
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
    )(AttachSiteDocumentContainer)
);
