import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import CreateBuildingForm from '../presentational/CreateBuildingForm';
import createBuilding from 'actions/companyAdmin/buildings/async/createBuilding';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import updateHierarchyAddState from 'actions/companyAdmin/hierarchy/sync/updateHierarchyAddState';

class CreateBuildingFormContainer extends Component {
    state = {
        name: '',
        addressLine1: '',
        addressLine2: '',
        postcode: ''
    };

    render = () => (
        <CreateBuildingForm
            {...this.state}
            handleInputChange={this.handleInputChange}
            handleSubmit={this.handleSubmit}
            siteID={this.props.siteID}
            hideModal={this.props.hideModal}
            handleClose={this.handleClose}
        />
    );

    handleInputChange = (name, value) => {
        this.setState({ [name]: value });
    };

    handleSubmit = e => {
        e.preventDefault();
        const { siteID, createBuilding, hideModal } = this.props;
        const postBody = { ...this.state, siteID };
        createBuilding(postBody);
        hideModal();
    };

    handleClose = () => {
        const { hideModal, updateHierarchyAddState } = this.props;

        hideModal();
        updateHierarchyAddState(false);
    };
}

const mapDispatchToProps = dispatch => ({
    createBuilding: postBody => dispatch(createBuilding(postBody)),
    hideModal: () => dispatch(hideModal()),
    updateHierarchyAddState: value => {
        dispatch(updateHierarchyAddState(value));
    }
});

export default withRouter(
    connect(
        null,
        mapDispatchToProps
    )(CreateBuildingFormContainer)
);
