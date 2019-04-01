import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import FloorEditForm from '../presentational/FloorEditForm';
import editFloor from 'actions/floors/async/editFloor';

class FloorEditFormContainer extends Component {
    state = {
        name: ''
    };

    render() {
        return (
            <FloorEditForm
                {...this.state}
                floorID={this.props.floorID}
                handleInputChange={this.handleInputChange}
                handleSubmit={this.handleSubmit}
            />
        );
    }

    componentDidUpdate = prevProps => {
        const { postSuccess, history, floorID, floor } = this.props;

        if (postSuccess && !prevProps.postSuccess) {
            history.push(`/floors/${floorID}`);
        }
        if (!prevProps.floor.id && !!floor.id) {
            this._setFormDetails();
        }
    };

    componentDidMount = () => {
        const { floor } = this.props;

        if (floor.id > 0) {
            this._setFormDetails();
        }
    };

    handleInputChange = e => {
        e.preventDefault();

        this.setState({
            [e.target.name]: e.target.value
        });
    };

    _setFormDetails = () => {
        const { floor } = this.props;

        this.setState({
            name: floor.name
        });
    };

    handleSubmit = e => {
        e.preventDefault();
        const { floor } = this.props;
        const { name } = this.state;

        const postBody = {
            name: name
        };

        this.props.editFloor(floor.id, postBody);
    };
}

const mapStateToProps = ({ floorsReducer }, ownProps) => ({
    postSuccess: floorsReducer.postSuccess,
    error: floorsReducer.error,
    floor: floorsReducer.floors[ownProps.match.params.id] || {}
});

const mapDispatchToProps = dispatch => ({
    editFloor: (floorID, postBody) => {
        dispatch(editFloor(floorID, postBody));
    }
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(FloorEditFormContainer)
);
