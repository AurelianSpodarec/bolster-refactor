import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import AttachSiteDocument from '../presentational/AttachSiteDocument';
import createDocument from 'actions/companyAdmin/documents/async/createDocument';

class AttachSiteDocumentContainer extends Component {
    render() {
        const { siteID } = this.props.match.params;
        const backUrl = `/sites/${siteID}`;
        return (
            <AttachSiteDocument
                handleSubmit={this.handleSubmit}
                backUrl={backUrl}
                siteID={siteID}
            />
        );
    }

    componentDidUpdate({ postSuccess: prevSuccess }) {
        const { postSuccess, history, match } = this.props;
        const { siteID } = match.params;
        if (postSuccess && !prevSuccess) {
            history.push(`/sites/${siteID}`);
        }
    }

    handleSubmit = postBody => {
        const { createDocument } = this.props;
        const id = this.props.match.params.siteID;
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
