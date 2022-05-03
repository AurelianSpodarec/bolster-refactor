import React, { Component } from 'react';
import { connect } from 'react-redux';

import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import editFloor from 'actions/companyAdmin/floors/async/editFloor';

import fetchSingleBuilding from 'actions/companyAdmin/buildings/async/fetchSingleBuilding';

import EditFloorForm from '../presentational/EditFloorForm';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';

class EditFloorFormContainer extends Component {
    state = {
        name: '',
    };

    render() {
        const { isUsingBolsterLabels, error } = this.props;
        return (
            <BlockContainer error={error} contentClass="no-padding">
                <EditFloorForm
                    {...this.state}
                    floorID={this.props.floorID}
                    handleInputChange={this.handleInputChange}
                    handleSubmit={this.handleSubmit}
                    hideModal={this.props.hideModal}
                    isUsingBolsterLabels={isUsingBolsterLabels}
                />
            </BlockContainer>
        );
    }

    componentDidUpdate = prevProps => {
        const { floor } = this.props;

        if (!prevProps.floor.id && !!floor.id) {
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

    _setFormDetails = () => {
        const {
            floor: { name },
        } = this.props;

        this.setState({
            name,
        });
    };

    handleSubmit = e => {
        e.preventDefault();
        const { floor, editFloor, hideModal } = this.props;

        const { name } = this.state;
        const postBody = { name };

        editFloor(floor.id, postBody);
        hideModal();
    };
}

const mapStateToProps = ({
    companyAdmin: {
        buildingsReducer: { error: floorError, buildings },
        companySettingsReducer: {
            companySettings: { isUsingBolsterLabels },
        },
        subscriptionsReducer: {
            subscriptions: { serviceIDs: subscriptionServiceIDs },
        },
    },
}) => ({
    isUsingBolsterLabels,
    error: floorError,
    subscriptionServiceIDs,
    building: Object.values(buildings),
});

const mapDispatchToProps = {
    editFloor,
    hideModal,
    fetchSingleBuilding,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditFloorFormContainer);
