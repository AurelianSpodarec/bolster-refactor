import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import AddSiteForm from '../presentational/AddSiteForm';
import createSite from 'actions/companyAdmin/sites/async/createSite';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import fetchPinOptionSets from '../../../../../../actions/companyAdmin/pinOptions/async/fetchPinOptionSets';
import fetchPinOptionTypes from '../../../../../../actions/companyAdmin/pinOptions/async/fetchPinOptionTypes';

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
        selectedPinOptionDocumentsTypes: {},
        selectedPinOptionDocumentsSets: {},
    };

    render() {
        const {
            selectedPinOptionTypes,
            selectedPinOptionSets,
            selectedPinOptionDocumentsTypes,
            selectedPinOptionDocumentsSets,
        } = this.state;

        const {
            isUsingBolsterLabels,
            isFetching,
            error,
            isFetchingHierarchies,
            types,
            sets,
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
                    (!set.isDisabled && !set.isHidden)
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
                noWhiteBackground={!isFetching && !error}
            >
                <AddSiteForm
                    {...this.state}
                    handleInputChange={this.handleInputChange}
                    handleDateChange={this.handleDateChange}
                    handlePinOptionTypeChange={this.handlePinOptionTypeChange}
                    handlePinOptionSetChange={this.handlePinOptionSetChange}
                    handlePinOptionDocumentsTypesChange={this.handlePinOptionDocumentsTypesChange}
                    handlePinOptionDocumentsSetsChange={this.handlePinOptionDocumentsSetsChange}
                    handleSubmit={this.handleSubmit}
                    hideModal={this.props.hideModal}
                    isUsingBolsterLabels={isUsingBolsterLabels}
                    isFetching={isFetching}
                    error={error}
                    isFetchingHierarchies={isFetchingHierarchies}
                    types={typesToDisplay}
                    typeSets={typeSets}
                    selectedPinOptionTypes={selectedPinOptionTypes}
                    selectedPinOptionSets={selectedPinOptionSets}
                    selectedPinOptionDocumentsTypes={selectedPinOptionDocumentsTypes}
                    selectedPinOptionDocumentsSets={selectedPinOptionDocumentsSets}
                />
            </BlockContainer>
        );
    }

    componentDidMount() {
        const { fetchPinOptionSets, fetchPinOptionTypes } = this.props;
        fetchPinOptionSets();
        fetchPinOptionTypes();
    }

    componentDidUpdate = (prevProps, prevState) => {
        const { postSuccess, history, updatedSiteID, sets } = this.props;
        const {
            selectedPinOptionTypes,
            selectedPinOptionSets,
            selectedPinOptionDocumentsTypes,
            selectedPinOptionDocumentsSets,
        } = this.state;

        if (postSuccess && !prevProps.postSuccess) {
            history.push(`/company/sites/${updatedSiteID}`);
        }
        if (selectedPinOptionTypes !== prevState.selectedPinOptionTypes) {
            Object.keys(selectedPinOptionTypes).forEach(typeID => {
                if (selectedPinOptionTypes[typeID] && !prevState.selectedPinOptionTypes[typeID]) {
                    const defaultSetIDs = Object.values(sets)
                        .filter(set => set.pinOptionTypeID === +typeID && set.isDefault)
                        .map(set => set.id);
                    this.setState({
                        selectedPinOptionSets: {
                            ...selectedPinOptionSets,
                            [typeID]: defaultSetIDs,
                        },
                    });
                }
            });
        }
        if (selectedPinOptionDocumentsTypes !== prevState.selectedPinOptionDocumentsTypes) {
            Object.keys(selectedPinOptionDocumentsTypes).forEach(typeID => {
                if (
                    selectedPinOptionDocumentsTypes[typeID] &&
                    !prevState.selectedPinOptionDocumentsTypes[typeID]
                ) {
                    const defaultSetIDs = Object.values(sets)
                        .filter(set => set.pinOptionTypeID === +typeID && set.isDefault)
                        .map(set => set.id);
                    this.setState({
                        selectedPinOptionDocumentsSets: {
                            ...selectedPinOptionDocumentsSets,
                            [typeID]: defaultSetIDs,
                        },
                    });
                }
            });
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
        const { selectedPinOptionTypes, selectedPinOptionSets } = this.state;

        this.setState({
            selectedPinOptionTypes: { ...selectedPinOptionTypes, [type]: value },
            selectedPinOptionSets: {
                ...selectedPinOptionSets,
                // resets selected sets if type is un-selected
                [type]: value ? selectedPinOptionSets[type] : [],
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

    handlePinOptionDocumentsTypesChange = (type, value) => {
        const { selectedPinOptionDocumentsTypes, selectedPinOptionDocumentsSets } = this.state;

        this.setState({
            selectedPinOptionDocumentsTypes: {
                ...selectedPinOptionDocumentsTypes,
                [type]: value,
            },
            selectedPinOptionDocumentsSets: {
                ...selectedPinOptionDocumentsSets,
                // resets selected sets if type is un-selected
                [type]: value ? selectedPinOptionDocumentsSets[type] : [],
            },
        });
    };

    handlePinOptionDocumentsSetsChange = (type, value) => {
        this.setState({
            selectedPinOptionDocumentsSets: {
                ...this.state.selectedPinOptionDocumentsSets,
                [type]: value,
            },
        });
    };

    handleSubmit = e => {
        e.preventDefault();
        const { hideModal, createSite } = this.props;
        const {
            name,
            client,
            addressLine1,
            addressLine2,
            postcode,
            selectedPinOptionSets,
            selectedPinOptionDocumentsSets,
        } = this.state;

        const pinOptionSets = Object.entries(selectedPinOptionSets)
            .filter(([, value]) => value.length > 0)
            .map(([key, value]) => ({ pinOptionTypeID: key, pinOptionSetIDs: value }));

        const pinOptionSetDocuments = Object.entries(selectedPinOptionDocumentsSets)
            .filter(([, value]) => value.length > 0)
            .map(([key, value]) => ({ pinOptionTypeID: key, pinOptionSetIDs: value }));

        const postBody = {
            name,
            client,
            addressLine1,
            addressLine2,
            postcode,
            pinOptionSets,
            pinOptionSetDocuments,
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
            companySettings: { isUsingBolsterLabels },
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
    subscriptionServiceIDs,
    sets,
    types,
    isFetchingHierarchies:
        sitesReducer.isFetching || isFetchingBuildings || isFetchingFloors || isFetchingDrawings,
});

const mapDispatchToProps = {
    createSite,
    hideModal,
    fetchPinOptionSets,
    fetchPinOptionTypes,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddSiteFormContainer));
