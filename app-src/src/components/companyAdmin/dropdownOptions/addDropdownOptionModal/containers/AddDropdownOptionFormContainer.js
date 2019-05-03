import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import createSite from 'actions/companyAdmin/sites/async/createSite';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import AddDropdownOptionForm from '../presentational/AddDropdownOptionForm';

class AddDropdownOptionFormContainer extends Component {
    state = {
        name: ''
    };

    render() {
        return (
            <AddDropdownOptionForm
                {...this.state}
                handleInputChange={this.handleInputChange}
                handleSubmit={this.handleSubmit}
                hideModal={this.props.hideModal}
            />
        );
    }

    // componentDidUpdate = prevProps => {
    //     const { postSuccess, history, updatedSiteID } = this.props;

    //     if (postSuccess && !prevProps.postSuccess) {
    //         history.push(`/company/sites/${updatedSiteID}`);
    //     }
    // };

    handleInputChange = e => {
        e.preventDefault();

        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleSubmit = e => {
        e.preventDefault();
        const { hideModal, createSite } = this.props;

        const postBody = {
            ...this.state
        };

        createSite(postBody);
        hideModal();
    };
}

const mapStateToProps = ({
    companyAdmin: {
        dropdownOptionsReducer: { postSuccess, error }
    }
}) => ({
    postSuccess,
    error
});

const mapDispatchToProps = dispatch => ({
    createSite: postBody => {
        dispatch(createSite(postBody));
    },
    hideModal: () => {
        dispatch(hideModal());
    }
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(AddDropdownOptionFormContainer)
);
