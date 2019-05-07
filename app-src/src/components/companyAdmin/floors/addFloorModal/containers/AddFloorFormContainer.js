import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import createFloor from 'actions/companyAdmin/floors/async/createFloor';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';

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
                hideModal={this.props.hideModal}
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
}

const mapDispatchToProps = dispatch => ({
    createFloor: postBody => {
        dispatch(createFloor(postBody));
    },
    hideModal: () => {
        dispatch(hideModal());
    }
});

export default withRouter(
    connect(
        null,
        mapDispatchToProps
    )(AddFloorFormContainer)
);
