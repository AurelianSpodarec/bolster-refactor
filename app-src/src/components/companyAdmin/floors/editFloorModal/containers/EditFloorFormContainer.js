import React, { Component } from 'react';
import { connect } from 'react-redux';

import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';

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
                hideModal={this.props.hideModal}
            />
        );
    }

    componentDidUpdate = prevProps => {
        const { floor } = this.props;

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

    handleInputChange = (name, value) => {
        this.setState({ [name]: value });
    };

    _setFormDetails = () => {
        const {
            floor: { name }
        } = this.props;

        this.setState({
            name
        });
    };

    handleSubmit = e => {
        e.preventDefault();
        const { floor, editFloor, hideModal } = this.props;

        const postBody = {
            ...this.state
        };

        editFloor(floor.id, postBody);
        hideModal();
    };
}

const mapDispatchToProps = dispatch => ({
    editFloor: (floorID, postBody) => {
        dispatch(editFloor(floorID, postBody));
    },
    hideModal: () => dispatch(hideModal())
});

export default connect(
    null,
    mapDispatchToProps
)(EditFloorFormContainer);
