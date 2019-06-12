import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import createFloor from 'actions/companyAdmin/floors/async/createFloor';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';

import AddFloorForm from '../presentational/AddFloorForm';
import updateHierarchyAddState from 'actions/companyAdmin/hierarchy/sync/updateHierarchyAddState';

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
                hideModal={this.props.hideModal}
                handleClose={this.handleClose}
            />
        );
    }

    handleInputChange = (name, value) => {
        this.setState({ [name]: value });
    };

    handleSubmit = e => {
        e.preventDefault();

        const { createFloor, buildingID, hideModal } = this.props;

        createFloor({
            ...this.state,
            buildingID
        });
        hideModal();
    };

    handleClose = () => {
        const { hideModal, updateHierarchyAddState } = this.props;

        hideModal();
        updateHierarchyAddState(false);
    };
}

const mapDispatchToProps = dispatch => ({
    createFloor: postBody => {
        dispatch(createFloor(postBody));
    },
    hideModal: () => {
        dispatch(hideModal());
    },
    updateHierarchyAddState: value => {
        dispatch(updateHierarchyAddState(value));
    }
});

export default withRouter(
    connect(
        null,
        mapDispatchToProps
    )(AddFloorFormContainer)
);
