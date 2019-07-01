import React, { Component } from 'react';

import { connect } from 'react-redux';

import SOSGenerationForm from '../presentational/SOSGenerationForm';
import { SUCCESS_MODAL } from 'constants/shared/modalTypes';

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
        const { postSuccess, showModal } = this.props;
        if (!prevProps.postSuccess && postSuccess) {
            showModal(SUCCESS_MODAL, {
                message: ' SOS Code Successfully Generated'
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
        const { generateSOSCode } = this.props;
        generateSOSCode({ description: this.state.description });
    };
}

// const mapStateToProps = ({superAdmin: {sosCodesReducer: {
//     postSuccess
// }}}) => ({
//     postSuccess
// });

// const mapDispatchToProps = {
//     generateSOSCode,
// showModal
// };

export default connect(null)(SOSGenerationFormContainer);
