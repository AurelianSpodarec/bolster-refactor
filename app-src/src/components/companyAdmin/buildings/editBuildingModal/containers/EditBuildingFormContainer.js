import React, { Component } from 'react';
import { connect } from 'react-redux';

import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import editBuilding from 'actions/companyAdmin/buildings/async/editBuilding';

import BuildingEditForm from '../presentational/EditBuildingForm';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';

class BuildingEditFormContainer extends Component {
    state = {
        name: '',
        location: '',
    };

    render() {
        const { isUsingBolsterLabels, error } = this.props;
        return (
            <BlockContainer error={error} contentClass="no-padding">
                <BuildingEditForm
                    {...this.state}
                    handleInputChange={this.handleInputChange}
                    handleDateChange={this.handleDateChange}
                    handleSubmit={this.handleSubmit}
                    buildingID={this.props.buildingID}
                    hideModal={this.props.hideModal}
                    isUsingBolsterLabels={isUsingBolsterLabels}
                />
            </BlockContainer>
        );
    }

    componentDidMount = async () => {
        const { building } = this.props;
        if (building.id > 0) {
            this._setFormDetails();
        }
    };

    componentDidUpdate = prevProps => {
        const { building } = this.props;

        if (!prevProps.building.id && !!building.id) {
            this._setFormDetails();
        }
    };

    handleInputChange = (name, value) => {
        this.setState({ [name]: value });
    };

    handleDateChange = date => {
        this.setState({
            dateToSend: date,
        });
    };

    //_ <-- used because this helper function is only for this class - not shared or used within the children
    _setFormDetails = () => {
        const {
            building: { name, location },
        } = this.props;

        this.setState({
            name,
            location,
        });
    };

    //write a "helper" function that will update state with building details.
    //if !building.id is empty/unidentified (!building.id is equal to unidentified, which is a falsey) and now no longer empty

    handleSubmit = e => {
        e.preventDefault();
        const { building, editBuilding, hideModal } = this.props;

        const { name, location } = this.state;

        const postBody = { name, location };
        editBuilding(building.id, postBody);
        hideModal();
    };
}

const mapStateToProps = ({
    companyAdmin: {
        buildingsReducer: { error: buildingError },
        companySettingsReducer: {
            companySettings: { isUsingBolsterLabels, useManufacturingByDefault },
        },

        subscriptionsReducer: {
            subscriptions: { serviceIDs: subscriptionServiceIDs },
        },
    },
}) => ({
    isUsingBolsterLabels,
    error: buildingError,
    useManufacturingByDefault,
    subscriptionServiceIDs,
});

const mapDispatchToProps = {
    editBuilding,
    hideModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(BuildingEditFormContainer);
