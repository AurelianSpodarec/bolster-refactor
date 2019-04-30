import React, { Component } from 'react';
import { connect } from 'react-redux';

import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';

import BuildingEditForm from '../presentational/EditBuildingForm';
import editBuilding from 'actions/companyAdmin/buildings/async/editBuilding';

class BuildingEditFormContainer extends Component {
    state = {
        name: '',
        addressLine1: '',
        addressLine2: '',
        postcode: ''
    };

    render() {
        return (
            <BuildingEditForm
                {...this.state}
                handleInputChange={this.handleInputChange}
                handleSubmit={this.handleSubmit}
                buildingID={this.props.buildingID}
                hideModal={this.props.hideModal}
            />
        );
    }

    componentDidUpdate = prevProps => {
        const { building } = this.props;

        if (!prevProps.building.id && !!building.id) {
            this._setFormDetails();
        }
    };

    componentDidMount = () => {
        const { building } = this.props;

        if (building.id > 0) {
            this._setFormDetails();
        }
    };

    handleInputChange = e => {
        e.preventDefault();

        this.setState({
            [e.target.name]: e.target.value
        });
    };

    //_ <-- used because this helper function is only for this class - not shared or used within the children
    _setFormDetails = () => {
        const {
            building: { name, addressLine1, addressLine2, postcode }
        } = this.props;

        this.setState({
            name,
            addressLine1,
            addressLine2,
            postcode
        });
    };

    //write a "helper" function that will update state with building details.
    //if !building.id is empty/unidentified (!building.id is equal to unidentified, which is a falsey) and now no longer empty

    handleSubmit = e => {
        e.preventDefault();
        const { building, editBuilding, hideModal } = this.props;

        const postBody = {
            ...this.state
        };
        editBuilding(building.id, postBody);
        hideModal();
    };
}

const mapDispatchToProps = dispatch => ({
    editBuilding: (buildingID, postBody) => {
        dispatch(editBuilding(buildingID, postBody));
    },
    hideModal: () => dispatch(hideModal())
});

export default connect(
    null,
    mapDispatchToProps
)(BuildingEditFormContainer);
