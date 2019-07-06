import React, { Component } from 'react';

import { connect } from 'react-redux';

import SOSGenerationForm from '../presentational/SOSGenerationForm';
import { SUCCESS_MODAL } from 'constants/shared/modalTypes';
import createSOSCode from 'actions/superAdmin/sosManagement/async/createSOSCode';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';

class SOSGenerationFormContainer extends Component {
    state = {
        description: ''
    };

    render() {
        const { description } = this.state;

        return (
            <SOSGenerationForm
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
                description={description}
            />
        );
    }

    componentDidUpdate(prevProps) {
        const { postSuccess, showModal, createdSOSCode } = this.props;
        if (!prevProps.postSuccess && postSuccess) {
            showModal(SUCCESS_MODAL, {
                message: `SOS Code Successfully Generated. Your SOS code is ${createdSOSCode}`
            });
        }
    }

    handleChange = (name, value) => {
        this.setState({
            [name]: value
        });
    };

    handleSubmit = e => {
        e.preventDefault();
        const { createSOSCode } = this.props;
        createSOSCode({ description: this.state.description });
    };
}

const mapStateToProps = ({
    superAdmin: {
        sosCodesReducer: { postSuccess, createdSOSCode }
    }
}) => ({
    postSuccess,
    createdSOSCode
});

const mapDispatchToProps = {
    createSOSCode,
    showModal
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SOSGenerationFormContainer);
