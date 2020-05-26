import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import {
    createManufacturerOptionList,
    createOptionValuesList,
    createPreselectedManufacturersList,
    createPreselectedOptionValuesList,
    createHierarchyPreselectedManufacturersList,
    removeUnusedManufacturerDefaults,
} from 'helpers/manufacturers';
import {
    DROPDOWN_OPTIONS,
    DROPDOWN_OPTION_MANUFACTURER_ENABLED,
} from 'constants/companyAdmin/enums';
import fetchAllOptionValues from 'actions/companyAdmin/manufacturers/async/fetchAllOptionValues';
import fetchManufacturersByPinOptionType from 'actions/companyAdmin/manufacturers/async/fetchManufacturersByPinOptionType';
import editBuilding from 'actions/companyAdmin/buildings/async/editBuilding';

import BuildingEditForm from '../presentational/EditBuildingForm';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';

class BuildingEditFormContainer extends Component {
    state = {
        name: '',
        location: '',
        isAlertShowing: false,
        message: '',
        dateToSend: '',
        isManufacturingInherited: false,
        setManufacturersForHierarchy: false,
        manufacturerOptions: [],
        selectedManufacturerOptions: [],
        selectedOptionValues: [],
        optionValuesOptions: {},
        areOptionsLoaded: false,
    };

    render() {
        const { isUsingBolsterLabels, error } = this.props;
        const { areOptionsLoaded } = this.state;
        return (
            <BlockContainer
                isEmpty={!areOptionsLoaded}
                isFetching={!areOptionsLoaded}
                error={error}
                contentClass="no-padding"
            >
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
        const { building, fetchManufacturersByPinOptionType, fetchAllOptionValues } = this.props;

        // ** Only do a fetch for the manufacturers of a specific type if manufacturing is enabled. Wait for them to resolve before editing a building
        const pinOptionTypes = Object.keys(DROPDOWN_OPTIONS).filter(option => {
            return DROPDOWN_OPTION_MANUFACTURER_ENABLED[option];
        });

        const fn = function fetchManufacturers(pinOptionType) {
            return fetchManufacturersByPinOptionType(pinOptionType);
        };

        const actions = pinOptionTypes.map(fn);

        await Promise.all(actions).then(() => {
            fetchAllOptionValues();
        });

        if (building.id > 0) {
            this._setFormDetails();
        }
    };

    componentDidUpdate = prevProps => {
        const {
            building,
            isFetching,
            optionValues,
            subscriptionServiceIDs,
            manufacturers,
        } = this.props;

        if (prevProps.isFetching && !isFetching) {
            const initialOptions = {
                isManufacturingInherited: building.isManufacturingInherited,
                setManufacturersForHierarchy: building.isManufacturingEnabled,
                manufacturerOptions: [],
                selectedManufacturerOptions: [],
                selectedOptionValues: [],
                optionValuesOptions: {},
                areOptionsLoaded: true,
            };

            initialOptions.optionValuesOptions = createOptionValuesList(
                optionValues,
                subscriptionServiceIDs,
            );
            initialOptions.manufacturerOptions = createManufacturerOptionList(manufacturers);

            if (building.isManufacturingEnabled) {
                // prefill options from building already saved
                initialOptions.selectedOptionValues = building.optionValueIDs.map(id => String(id));

                initialOptions.selectedManufacturerOptions = createHierarchyPreselectedManufacturersList(
                    initialOptions.manufacturerOptions,
                    optionValues,
                    initialOptions.selectedOptionValues,
                );
            } else {
                //prefill from company settings in anticipation of isManufacturingEnabled being set to true
                initialOptions.selectedOptionValues = createPreselectedOptionValuesList(
                    initialOptions.optionValuesOptions,
                );
                initialOptions.selectedManufacturerOptions = createPreselectedManufacturersList(
                    initialOptions.manufacturerOptions,
                );
            }

            this.setState(initialOptions);
        }

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

        const { name, location, isAlertShowing, message, dateToSend } = this.state;

        let postBody = {};
        if (isAlertShowing) {
            postBody = {
                name,
                location,
                message: message,
                dateToSend: moment(dateToSend).format(),
            };
        } else {
            postBody = {
                name,
                location,
            };
        }
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
        manufacturersReducer: {
            manufacturers,
            isFetching: isFetchingManufacturers,
            error: manufacturersError,
        },
        manufacturersOptionValuesReducer: {
            manufacturersOptionValues,
            isFetching: isFetchingOptionValues,
            error: optionValuesError,
        },
        subscriptionsReducer: {
            subscriptions: { serviceIDs: subscriptionServiceIDs },
        },
    },
}) => ({
    isUsingBolsterLabels,
    error: buildingError || manufacturersError || optionValuesError,
    manufacturers,
    optionValues: manufacturersOptionValues,
    isFetching: isFetchingManufacturers || isFetchingOptionValues,
    useManufacturingByDefault,
    subscriptionServiceIDs,
});

const mapDispatchToProps = {
    editBuilding,
    hideModal,
    fetchManufacturersByPinOptionType,
    fetchAllOptionValues,
};

export default connect(mapStateToProps, mapDispatchToProps)(BuildingEditFormContainer);
