import React, { Component } from 'react';
import CreateOperativeAlert from '../presentational/CreateOperativeAlert';

export default class CreateOperativeAlertContainer extends Component {
    state = { message: '' };

    render() {
        return <CreateOperativeAlert message={this.state.message} />;
    }

    handleChange = (name, value) => this.setState({ [name]: value });

    handleSubmit = () => {
        const { message } = this.state;

        const postBody = { message };
    };
}
