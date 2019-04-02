import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import addTemplate from 'actions/superAdmin/templateBuilder/sync/addTemplate';
import hideModal from 'actions/generic/modals/sync/hideModal';

import AddTemplateModal from '../presentational/AddTemplateModal';

class AddTemplateModalContainer extends React.Component {
    state = {
        name: ''
    };

    render() {
        return (
            <AddTemplateModal
                name={this.state.name}
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
                handleCancel={this.handleCancel}
            />
        );
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleCancel = e => {
        e.preventDefault();
        const { history, hideModal } = this.props;
        history.goBack();
        hideModal();
    };

    handleSubmit = e => {
        e.preventDefault();
        const { companyID, uuid, addTemplate } = this.props;
        const { name } = this.state;
        const template = {
            companyID,
            uuid,
            name
        };

        addTemplate(template);
    };
}

const mapDispatchToProps = dispatch => ({
    hideModal: () => {
        dispatch(hideModal());
    },
    addTemplate: template => {
        dispatch(addTemplate(template));
        dispatch(hideModal());
    }
});

export default withRouter(
    connect(
        null,
        mapDispatchToProps
    )(AddTemplateModalContainer)
);
