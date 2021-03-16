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
import editFloor from 'actions/companyAdmin/floors/async/editFloor';

import fetchSingleBuilding from 'actions/companyAdmin/buildings/async/fetchSingleBuilding';

import EditFloorForm from '../presentational/EditFloorForm';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import {
    createPreselectedItemOptionValuesList,
    formatDropdownOptions,
    getPreselectedItemTypes,
} from 'helpers/itemTypes';
import fetchAllDropdownOptions from 'actions/companyAdmin/dropdownOptions/async/fetchAllDropdownOptions';

class EditFloorFormContainer extends Component {
    state = {
        name: '',
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
        showManufacturingOptions: true,
        manufacturingInheritedFrom: '',
        showDropdownOptions: true,
        isDropdownOptionsInherited: false,
        setDropdownOptionsForHierarchy: false,
        selectedDropdownOptions: [],
        dropdownOptions: [],
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
                <EditFloorForm
                    {...this.state}
                    floorID={this.props.floorID}
                    handleInputChange={this.handleInputChange}
                    handleDateChange={this.handleDateChange}
                    handleSubmit={this.handleSubmit}
                    hideModal={this.props.hideModal}
                    isUsingBolsterLabels={isUsingBolsterLabels}
                    handleShowManufacturingOptions={this.handleShowManufacturingOptions}
                    handleShowDropdownOptions={this.handleShowDropdownOptions}
                />
            </BlockContainer>
        );
    }

    componentDidMount = async () => {
        const {
            floor,
            fetchManufacturersByPinOptionType,
            fetchAllOptionValues,
            fetchAllDropdownOptions,
            building,
        } = this.props;
        // ** Only do a fetch for the manufacturers of a specific type if manufacturing is enabled. Wait for them to resolve before editing a floor
        const pinOptionTypes = Object.keys(DROPDOWN_OPTIONS).filter(option => {
            return DROPDOWN_OPTION_MANUFACTURER_ENABLED[option];
        });

        const fn = function fetchManufacturers(pinOptionType) {
            return fetchManufacturersByPinOptionType(pinOptionType);
        };

        const actions = pinOptionTypes.map(fn);

        await fetchAllDropdownOptions(2, building[0].siteID);
        await Promise.all(actions).then(() => {
            fetchAllOptionValues();
        });

        if (floor.id > 0) {
            this._setFormDetails();
        }
    };

    componentDidUpdate = prevProps => {
        const {
            floor,
            isFetching,
            optionValues,
            subscriptionServiceIDs,
            manufacturers,
            dropdownOptions,
        } = this.props;

        if (prevProps.isFetching && !isFetching) {
            const initialOptions = {
                isManufacturingInherited: floor.isManufacturingInherited,
                setManufacturersForHierarchy: floor.isManufacturingEnabled,
                manufacturerOptions: [],
                selectedManufacturerOptions: [],
                selectedOptionValues: [],
                optionValuesOptions: {},
                areOptionsLoaded: true,
                manufacturingInheritedFrom: floor.manufacturingInheritedFrom,
            };

            const initialDropdownOptions = {
                isDropdownOptionsInherited: floor.isDropDownOptionsInherited,
                setDropdownOptionsForHierarchy: floor.isDropDownOptionsEnabled,
                selectedDropdownOptions: [],
                dropdownOptions: [],
                isDropDownOptionsInheritedFrom: floor.isDropDownOptionsInheritedFrom,
            };

            initialOptions.optionValuesOptions = createOptionValuesList(
                optionValues,
                subscriptionServiceIDs,
            );
            initialOptions.manufacturerOptions = createManufacturerOptionList(manufacturers);

            if (floor.isManufacturingEnabled) {
                // prefill options from floor already saved
                initialOptions.selectedOptionValues = floor.optionValueIDs.map(id => String(id));

                initialOptions.selectedManufacturerOptions = createHierarchyPreselectedManufacturersList(
                    initialOptions.manufacturerOptions,
                    optionValues,
                    initialOptions.selectedOptionValues,
                );
                if (floor.manufacturingInheritedFrom) {
                    this.setState({ showManufacturingOptions: false });
                }
            } else {
                //prefill from company settings in anticipation of isManufacturingEnabled being set to true
                initialOptions.selectedOptionValues = createPreselectedOptionValuesList(
                    initialOptions.optionValuesOptions,
                );
                initialOptions.selectedManufacturerOptions = createPreselectedManufacturersList(
                    initialOptions.manufacturerOptions,
                );
            }
            //dropdown options
            initialDropdownOptions.selectedDropdownOptions = floor.dropDownOptionIDs
                ? createPreselectedItemOptionValuesList(floor.dropDownOptionIDs)
                : getPreselectedItemTypes(this.props.dropdownOptions);

            initialDropdownOptions.dropdownOptions = formatDropdownOptions(dropdownOptions);

            if (floor.isDropDownOptionsInheritedFrom) {
                this.setState({ showDropdownOptions: false });
            }

            this.setState(initialOptions);
            this.setState(initialDropdownOptions);
        }

        if (!prevProps.floor.id && !!floor.id) {
            this._setFormDetails();
        }
    };
    handleShowManufacturingOptions = () => {
        this.setState({ showManufacturingOptions: true });
    };

    handleShowDropdownOptions = () => {
        this.setState({ showDropdownOptions: true });
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
        const { floor, editFloor, hideModal, isAlertShowing, message, dateToSend } = this.props;

        const {
            name,
            setManufacturersForHierarchy,
            isManufacturingInherited,
            isDropdownOptionsInherited,
            setDropdownOptionsForHierarchy,
            selectedDropdownOptions,
        } = this.state;

        const manufacturingEnabledOptions = isManufacturingInherited
            ? {}
            : {
                  isManufacturingEnabled: setManufacturersForHierarchy,
                  optionValueIDs: removeUnusedManufacturerDefaults(this.state),
              };
        const dropdownEnabledOptions = isDropdownOptionsInherited
            ? {}
            : {
                  isDropDownOptionsEnabled: setDropdownOptionsForHierarchy,
                  dropDownOptionIDs: selectedDropdownOptions,
              };
        let postBody = {};

        if (isAlertShowing) {
            postBody = {
                name,
                message,
                dateToSend: moment(dateToSend).format(),
                ...manufacturingEnabledOptions,
                ...dropdownEnabledOptions,
            };
        } else {
            postBody = {
                name,
                ...manufacturingEnabledOptions,
                ...dropdownEnabledOptions,
            };
        }

        editFloor(floor.id, postBody);
        hideModal();
    };
}

const mapStateToProps = ({
    companyAdmin: {
        buildingsReducer: { error: floorError, buildings },
        companySettingsReducer: {
            companySettings: { isUsingBolsterLabels, useManufacturingByDefault },
        },
        dropdownOptionsReducer: { dropdownOptions, isFetching: isFetchingDropdownOptions },
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
    error: floorError || manufacturersError || optionValuesError,
    manufacturers,
    optionValues: manufacturersOptionValues,
    isFetching: isFetchingManufacturers || isFetchingOptionValues || isFetchingDropdownOptions,
    useManufacturingByDefault,
    subscriptionServiceIDs,
    building: Object.values(buildings),
    dropdownOptions: Object.values(dropdownOptions),
});

const mapDispatchToProps = {
    editFloor,
    hideModal,
    fetchManufacturersByPinOptionType,
    fetchAllOptionValues,
    fetchAllDropdownOptions,
    fetchSingleBuilding,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditFloorFormContainer);
