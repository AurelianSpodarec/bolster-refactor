import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import AddSiteForm from '../presentational/AddSiteForm';
import createSite from 'actions/companyAdmin/sites/async/createSite';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import fetchPinOptionSets from '../../../../../actions/companyAdmin/pinOptions/async/fetchPinOptionSets';
import fetchPinOptionTypes from '../../../../../actions/companyAdmin/pinOptions/async/fetchPinOptionTypes';

class AddSiteFormContainer extends Component {
    state = {
        name: '',
        client: '',
        addressLine1: '',
        addressLine2: '',
        postcode: '',
        isAlertShowing: false,
        message: '',
        dateToSend: '',
        selectedPinOptionTypes: {},
        selectedPinOptionSets: {},
    };

    render() {
        const {
            isUsingBolsterLabels,
            isFetching,
            error,
            manufacturers,
            isFetchingHierarchies,
            types,
            sets,
            isCostingEnabled,
            subscriptionServiceIDs,
        } = this.props;

        const typesToDisplay = Object.values(types).filter(type => type.hasSiteLinks);
        const typeIDs = typesToDisplay.map(type => type.id);
        const typeSets = Object.values(sets)
            .filter(set => typeIDs.includes(set.pinOptionTypeID))
            .reduce((acc, set) => {
                // only services company has access to
                if (
                    set.serviceIDs &&
                    !set.serviceIDs.some(id => subscriptionServiceIDs.includes(id))
                ) {
                    return acc;
                }
                if (
                    this.state.selectedPinOptionSets[set.pinOptionTypeID]?.includes(set.ID) ||
                    !set.isDisabled
                ) {
                    acc[set.pinOptionTypeID] = (acc[set.pinOptionTypeID] || []).concat(set);
                }
                return acc;
            }, {});

        return (
            <BlockContainer
                isEmpty={isFetching}
                isFetching={isFetching}
                error={error}
                contentClass="no-padding no-border"
            >
                <AddSiteForm
                    {...this.state}
                    handleInputChange={this.handleInputChange}
                    handleDateChange={this.handleDateChange}
                    handlePinOptionTypeChange={this.handlePinOptionTypeChange}
                    handlePinOptionSetChange={this.handlePinOptionSetChange}
                    handleSubmit={this.handleSubmit}
                    hideModal={this.props.hideModal}
                    isUsingBolsterLabels={isUsingBolsterLabels}
                    isFetching={isFetching}
                    error={error}
                    manufacturers={manufacturers}
                    isFetchingHierarchies={isFetchingHierarchies}
                    types={typesToDisplay}
                    typeSets={typeSets}
                    selectedPinOptionTypes={this.state.selectedPinOptionTypes}
                    selectedPinOptionSets={this.state.selectedPinOptionSets}
                    isCostingEnabled={isCostingEnabled}
                />
            </BlockContainer>
        );
    }

    componentDidMount() {
        const { fetchPinOptionSets, fetchPinOptionTypes } = this.props;
        fetchPinOptionSets();
        fetchPinOptionTypes();
    }

    componentDidUpdate = prevProps => {
        const { postSuccess, history, updatedSiteID } = this.props;

        if (postSuccess && !prevProps.postSuccess) {
            history.push(`/company/sites/${updatedSiteID}`);
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

    handlePinOptionTypeChange = (type, value) => {
        this.setState({
            selectedPinOptionTypes: { ...this.state.selectedPinOptionTypes, [type]: value },
            selectedPinOptionSets: {
                ...this.state.selectedPinOptionSets,
                // resets selected sets if type is un-selected
                [type]: value ? this.state.selectedPinOptionSets[type] : [],
            },
        });
    };

    handlePinOptionSetChange = (type, value) => {
        this.setState({
            selectedPinOptionSets: {
                ...this.state.selectedPinOptionSets,
                [type]: value,
            },
        });
    };

    handleSubmit = e => {
        e.preventDefault();
        const { hideModal, createSite } = this.props;
        const { name, client, addressLine1, addressLine2, postcode, selectedPinOptionSets } =
            this.state;
        const pinOptionSets = Object.entries(selectedPinOptionSets)
            .filter(([, value]) => value.length > 0)
            .map(([key, value]) => ({ pinOptionTypeID: key, pinOptionSetIDs: value }));

        const postBody = {
            name,
            client,
            addressLine1,
            addressLine2,
            postcode,
            pinOptionSets,
        };

        createSite(postBody);
        hideModal();
    };
}

const mapStateToProps = ({
    companyAdmin: {
        sitesReducer,
        buildingsReducer: { isFetching: isFetchingBuildings },
        floorsReducer: { isFetching: isFetchingFloors },
        drawingsReducer: { isFetching: isFetchingDrawings },
        companySettingsReducer: {
            companySettings: { isUsingBolsterLabels, useManufacturingByDefault, isCostingEnabled },
        },
        pinOptionSetsReducer: { isFetching: isFetchingPinOptionSets, sets },
        pinOptionTypesReducer: { isFetching: isFetchingPinOptionTypes, types },
        subscriptionsReducer: {
            subscriptions: { serviceIDs: subscriptionServiceIDs },
        },
    },
}) => ({
    isUsingBolsterLabels,
    postSuccess: sitesReducer.postSuccess,
    error: sitesReducer.error,
    updatedSiteID: sitesReducer.updatedSiteID,
    isFetching: isFetchingPinOptionSets || isFetchingPinOptionTypes,
    useManufacturingByDefault,
    subscriptionServiceIDs,
    sets,
    types,
    isFetchingHierarchies:
        sitesReducer.isFetching || isFetchingBuildings || isFetchingFloors || isFetchingDrawings,
    isCostingEnabled,
});

const mapDispatchToProps = {
    createSite,
    hideModal,
    fetchPinOptionSets,
    fetchPinOptionTypes,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddSiteFormContainer));
