import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import createDrawing from 'actions/drawings/async/createDrawing';
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
        const { createDrawing } = this.props;
        const { name, file, floorID } = this.state;

        createDrawing({ name, file, floorID });
    };
}

const mapStateToProps = (_, { match }) => ({
    floorID: match.params['floorID']
});
const mapDispatchToProps = dispatch => ({
    createDrawing: drawing => {
        dispatch(createDrawing(drawing));
    }
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(AddDrawingFormContainer)
);
