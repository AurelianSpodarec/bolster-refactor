import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import setTemplate from 'actions/superAdmin/templateBuilder/sync/setTemplate';
import hideModal from 'actions/shared/generic/modals/sync/hideModal';

import TemplateFormModal from '../presentational/TemplateFormModal';

class TemplateFormModalContainer extends React.Component {
    state = {
        name: ''
    };

    render() {
        return (
            <TemplateFormModal
                title="Add template"
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
        const { companyID, uuid, setTemplate } = this.props;
        const { name } = this.state;
        const template = {
            companyID,
            uuid,
            name
        };

        setTemplate(template);
    };
}

const mapDispatchToProps = dispatch => ({
    hideModal: () => {
        dispatch(hideModal());
    },
    setTemplate: template => {
        dispatch(setTemplate(template));
        dispatch(hideModal());
    }
});

export default withRouter(
    connect(
        null,
        mapDispatchToProps
    )(TemplateFormModalContainer)
);
