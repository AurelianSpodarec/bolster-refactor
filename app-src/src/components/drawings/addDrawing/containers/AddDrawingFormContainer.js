import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import AddDrawingForm from '../presentational/AddDrawingForm';

class AddDrawingFormContainer extends Component {
    state = {
        name: '',
        fileString: ''
    };

    render() {
        return (
            <AddDrawingForm
                {...this.state}
                floorID={this.props.floorID}
                handleInputChange={this.handleInputChange}
                handleSubmit={this.handleSubmit}
            />
        );
    }

    handleInputChange = e => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        });
    };

    handleSubmit = () => {
        console.log('submitting...');
    };
}

export default withRouter(
    connect((_, { match }) => ({ floorID: match.params['floorID'] }))(
        AddDrawingFormContainer
    )
);
