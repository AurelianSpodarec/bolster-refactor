import React, { Component } from 'react';

import { connect } from 'react-redux';

import SOSGenerationForm from '../presentational/SOSGenerationForm';

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

// const mapDispatchToProps = {
//     generateSOSCode
// };

export default connect(null)(SOSGenerationFormContainer);
