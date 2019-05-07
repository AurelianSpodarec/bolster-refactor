import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import createDropdownOption from 'actions/companyAdmin/dropdownOptions/async/createDropdownOption';
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

    handleInputChange = (name, value) => {
        this.setState({ [name]: value });
    };

    handleSubmit = e => {
        e.preventDefault();
        const { hideModal, createDropdownOption, type } = this.props;

        const postBody = {
            ...this.state
        };

        createDropdownOption(type, postBody);
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
    createDropdownOption: (type, postBody) => {
        dispatch(createDropdownOption(type, postBody));
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
