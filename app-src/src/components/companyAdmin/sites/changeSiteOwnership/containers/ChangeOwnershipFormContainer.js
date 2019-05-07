import React, { Component } from 'react';
import { connect } from 'react-redux';

import { withRouter } from 'react-router-dom';
import ChangeOwnershipForm from '../presentational/ChangeOwnershipForm';
import createTransferSiteRequest from 'actions/companyAdmin/sites/async/createTransferSiteRequest';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import { CONFIRM_SUBMIT } from 'constants/shared/modalTypes';

class ChangeOwnershipFormContainer extends Component {
    state = {
        companyCode: ''
    };

    render = () => (
        <ChangeOwnershipForm
            url={this.props.url}
            companyCode={this.state.companyCode}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmitModal}
        />
    );

    componentDidUpdate = prevProps => {
        const { postSuccess, url, history } = this.props;
        if (postSuccess && !prevProps.postSuccess) {
            history.push(url.replace('/change-ownership', ''));
        }
    };

    handleChange = (name, value) => this.setState({ [name]: value });

    handleSubmitModal = e => {
        e.preventDefault();
        const { companyCode } = this.state;
        const {
            createTransferSiteRequest,
            showModal,
            hideModal,
            id: siteID
        } = this.props;
        const handleSubmit = () => {
            createTransferSiteRequest({ siteID, companyCode });
            hideModal();
        };
        const message = `Are you sure you want to send this request?
             If accepted, you will no longer have write access to this site,
              and the recipient will gain write access.
               You will still have read-only access.`;
        showModal(CONFIRM_SUBMIT, { handleSubmit, hideModal, message });
    };
}

const mapStateToProps = (
    {
        companyAdmin: {
            sitesReducer: { postSuccess }
        }
    },
    { match, location }
) => ({
    postSuccess,
    id: match.params.id,
    url: location.pathname
});

const mapDispatchToProps = dispatch => ({
    createTransferSiteRequest: postbody =>
        dispatch(createTransferSiteRequest(postbody)),
    showModal: (type, props) => dispatch(showModal(type, props)),
    hideModal: () => dispatch(hideModal())
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(ChangeOwnershipFormContainer)
);
