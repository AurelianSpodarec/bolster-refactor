import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import editDropdownOption from 'actions/companyAdmin/dropdownOptions/async/editDropdownOption';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import EditDropdownOptionForm from '../presentational/EditDropdownOptionForm';

class EditDropdownOptionContainer extends Component {
    state = {
        name: ''
    };

    render() {
        return (
            <EditDropdownOptionForm
                {...this.state}
                handleInputChange={this.handleInputChange}
                handleSubmit={this.handleSubmit}
                hideModal={this.props.hideModal}
            />
        );
    }

    componentDidMount = () => {
        const {
            option: { name }
        } = this.props;
        this.setState({
            name
        });
    };

    componentDidUpdate = prevProps => {
        const {
            option: { name, id }
        } = this.props;

        if (!prevProps.option.id && !!id) {
            this.setState({
                name
            });
        }
    };

    handleInputChange = e => {
        e.preventDefault();

        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleSubmit = e => {
        e.preventDefault();
        const {
            hideModal,
            editDropdownOption,
            option: { id, type }
        } = this.props;

        const postBody = {
            ...this.state
        };

        editDropdownOption(id, type, postBody);
        hideModal();
    };
}

const mapDispatchToProps = dispatch => ({
    editDropdownOption: (id, type, postBody) => {
        dispatch(editDropdownOption(id, type, postBody));
    },
    hideModal: () => {
        dispatch(hideModal());
    }
});

export default withRouter(
    connect(
        null,
        mapDispatchToProps
    )(EditDropdownOptionContainer)
);
