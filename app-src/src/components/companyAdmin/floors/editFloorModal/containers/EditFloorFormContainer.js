import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import EditFloorForm from '../presentational/EditFloorForm';
import editFloor from 'actions/companyAdmin/floors/async/editFloor';

class EditFloorFormContainer extends Component {
    state = {
        name: ''
    };

    render() {
        return (
            <EditFloorForm
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
            history.push(`/company/floors/${floorID}`);
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

const mapStateToProps = ({ companyAdmin: { floorsReducer } }, ownProps) => ({
    postSuccess: floorsReducer.postSuccess,
    error: floorsReducer.error,
    floorID: ownProps.match.params.id,
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
    )(EditFloorFormContainer)
);
