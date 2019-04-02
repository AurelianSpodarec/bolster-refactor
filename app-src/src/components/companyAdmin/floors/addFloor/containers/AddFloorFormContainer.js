import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import createFloor from 'actions/floors/async/createFloor';

import AddFloorForm from '../presentational/AddFloorForm';

class AddFloorFormContainer extends Component {
    state = {
        name: ''
    };
    render() {
        return (
            <AddFloorForm
                {...this.state}
                buildingID={this.props.buildingID}
                handleInputChange={this.handleInputChange}
                handleSubmit={this.handleSubmit}
            />
        );
    }

    componentDidUpdate = prevProps => {
        const { postSuccess, updatedFloorID, history } = this.props;

        if (!prevProps.postSuccess && postSuccess) {
            return history.push(`/floors/${updatedFloorID}`);
        }
    };

    handleInputChange = e => {
        e.preventDefault();

        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        });
    };

    handleSubmit = e => {
        e.preventDefault();

        const { createFloor, buildingID } = this.props;
        const { name } = this.state;

        createFloor({
            buildingID,
            name
        });
    };
}

const mapStateToProps = ({ floorsReducer }, { match }) => ({
    postSuccess: floorsReducer.postSuccess,
    updatedFloorID: floorsReducer.updatedFloorID,
    buildingID: match.params.buildingID
});

const mapDispatchToProps = dispatch => ({
    createFloor: postBody => {
        dispatch(createFloor(postBody));
    }
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(AddFloorFormContainer)
);
