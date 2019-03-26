import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import AddDrawingForm from '../presentational/AddDrawingForm';

class AddDrawingFormContainer extends Component {
    state = {
        name: '',
        file: {}
    };

    render() {
        return (
            <AddDrawingForm
                {...this.state}
                floorID={this.props.floorID}
                handleInputChange={this.handleInputChange}
                handleFileChange={this.handleFileChange}
                handleSubmit={this.handleSubmit}
            />
        );
    }

    handleInputChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleFileChange = (name, file) => {
        this.setState({ [name]: file });
    };
    handleSubmit = () => {
        console.log(this.state.file);
    };
}

export default withRouter(
    connect((_, { match }) => ({ floorID: match.params['floorID'] }))(
        AddDrawingFormContainer
    )
);
