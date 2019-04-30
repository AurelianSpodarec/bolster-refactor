import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import CreateBuildingForm from '../presentational/CreateBuildingForm';
import createBuilding from 'actions/companyAdmin/buildings/async/createBuilding';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';

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
        />
    );

    handleInputChange = ({ target: { name, value } }) => {
        this.setState({ [name]: value });
    };

    handleSubmit = e => {
        e.preventDefault();
        const { siteID, createBuilding, hideModal } = this.props;
        const postBody = { ...this.state, siteID };
        createBuilding(postBody);
        hideModal();
    };
}

const mapDispatchToProps = dispatch => ({
    createBuilding: postBody => dispatch(createBuilding(postBody)),
    hideModal: () => dispatch(hideModal())
});

export default withRouter(
    connect(
        null,
        mapDispatchToProps
    )(CreateBuildingFormContainer)
);
