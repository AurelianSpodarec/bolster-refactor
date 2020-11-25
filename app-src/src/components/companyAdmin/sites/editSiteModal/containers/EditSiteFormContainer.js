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
    formatOptions,
} from 'helpers/manufacturers';
import editSite from 'actions/companyAdmin/sites/async/editSite';
import {
    DROPDOWN_OPTIONS,
    DROPDOWN_OPTION_MANUFACTURER_ENABLED,
} from 'constants/companyAdmin/enums';
import fetchAllOptionValues from 'actions/companyAdmin/manufacturers/async/fetchAllOptionValues';
import fetchManufacturersByPinOptionType from 'actions/companyAdmin/manufacturers/async/fetchManufacturersByPinOptionType';

import EditSiteForm from '../presentational/EditSiteForm';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import DropdownList from 'components/companyAdmin/dropdownOptions/allDropdownOptions/presentational/DropdownList';

class EditSiteFormContainer extends Component {
    state = {
        name: '',
        client: '',
        addressLine1: '',
        addressLine2: '',
        postcode: '',
        isAlertShowing: false,
        message: '',
        dateToSend: '',
        setManufacturersForHierarchy: false,
        manufacturerOptions: [],
        selectedManufacturerOptions: [],
        selectedOptionValues: [],
        optionValuesOptions: {},
        areOptionsLoaded: false,
        setDropDownTypes: false,
        selectedDropDownTypes: [],
        dropDownTypes: [],
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
                <EditSiteForm
                    {...this.state}
                    handleInputChange={this.handleInputChange}
                    handleDateChange={this.handleDateChange}
                    handleSubmit={this.handleSubmit}
                    siteID={this.props.siteID}
                    hideModal={this.props.hideModal}
                    isUsingBolsterLabels={isUsingBolsterLabels}
                />
            </BlockContainer>
        );
    }

    componentDidMount = async () => {
        const { site, fetchManufacturersByPinOptionType, fetchAllOptionValues } = this.props;

        // ** Only do a fetch for the manufacturers of a specific type if manufacturing is enabled. Wait for them to resolve before editing a site.
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

        if (site.id > 0) {
            this._setFormDetails();
        }
    };

    componentDidUpdate = prevProps => {
        const {
            site,
            isFetching,
            optionValues,
            subscriptionServiceIDs,
            manufacturers,
        } = this.props;

        if (prevProps.isFetching && !isFetching) {
            const initialOptions = {
                setManufacturersForHierarchy: site.isManufacturingEnabled,
                manufacturerOptions: [],
                selectedManufacturerOptions: [],
                selectedOptionValues: [],
                optionValuesOptions: {},
                areOptionsLoaded: true,
                dropDownTypes: [],
                selectedDropDownTypes: [],
                dropDownTypeOptions: {},
            };

            initialOptions.optionValuesOptions = createOptionValuesList(
                optionValues,
                subscriptionServiceIDs,
            );
            initialOptions.manufacturerOptions = createManufacturerOptionList(manufacturers);

            if (site.isManufacturingEnabled) {
                // prefill options from site already saved
                initialOptions.selectedOptionValues = site.optionValueIDs.map(id => String(id));

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
            initialOptions.dropDownTypes = formatOptions(site.dropDownOptions);
            initialOptions.dropDownTypes = this.sortTypes(initialOptions.dropDownTypes);
            initialOptions.selectedDropDownTypes = this.createPreselectedDropDownTypesList(
                initialOptions.dropDownTypes,
            );

            this.setState(initialOptions);
        }
        if (!prevProps.site.id && !!site.id) {
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
            site: { name, client, addressLine1, addressLine2, postcode },
        } = this.props;

        this.setState({
            name,
            client,
            addressLine1,
            addressLine2,
            postcode,
        });
    };

    //write a "helper" function that will update state with site details.
    //if !site.id is empty/unidentified (!site.id is equal to unidentified, which is a falsey) and now no longer empty

    handleSubmit = e => {
        e.preventDefault();
        const {
            site: { id },
            editSite,
            hideModal,
        } = this.props;

        const {
            name,
            client,
            addressLine1,
            addressLine2,
            postcode,
            message,
            dateToSend,
            isAlertShowing,
            setManufacturersForHierarchy,
            setDropDownTypes,
            selectedDropDownTypes,
        } = this.state;

        const manufacturingEnabledOptions = {
            isManufacturingEnabled: setManufacturersForHierarchy,
            optionValueIDs: removeUnusedManufacturerDefaults(this.state),
        };

        let postBody = {};
        if (isAlertShowing) {
            postBody = {
                name,
                client,
                addressLine1,
                addressLine2,
                postcode,
                message: message,
                dateToSend: moment(dateToSend).format(),
                ...manufacturingEnabledOptions,
            };
        }
        if (setDropDownTypes) {
            postBody = {
                name,
                client,
                addressLine1,
                addressLine2,
                postcode,
                message: message,
                dropDownOptions: selectedDropDownTypes,
                ...manufacturingEnabledOptions,
            };
        } else {
            postBody = {
                name,
                client,
                addressLine1,
                addressLine2,
                postcode,
                ...manufacturingEnabledOptions,
            };
        }
        console.log(postBody);
        editSite(id, postBody);
        hideModal();
    };

    // This did sort the list but now doesn't because of the sortTypes method, needs tweaking
    createPreselectedDropDownTypesList(dropDownTypeList) {
        console.log(dropDownTypeList);
        return dropDownTypeList.reduce((acc, dropDownType) => {
            if (!dropDownType.isDisabled) {
                acc.push(String(dropDownType.value));
            }

            return acc;
        }, []);
    }

    // Sorts dorpdown options so it can be sorted by ENUM.
    sortTypes(dropDownTypesList) {
        const frRatings = [];
        const itemTypes = [];
        const installationTypes = [];

        dropDownTypesList.forEach(dropDownType => {
            if (dropDownType.type === 1) {
                frRatings.push(dropDownType);
            }
            if (dropDownType.type === 2) {
                itemTypes.push(dropDownType);
            }
            if (dropDownType.type === 3) {
                installationTypes.push(dropDownType);
            }
        });

        const sortedDropDownTypes = { 1: frRatings, 2: itemTypes, 3: installationTypes };

        return sortedDropDownTypes;
    }
}

const mapStateToProps = ({
    companyAdmin: {
        sitesReducer,
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
    postSuccess: sitesReducer.postSuccess,
    error: sitesReducer.error || manufacturersError || optionValuesError,
    updatedSiteID: sitesReducer.updatedSiteID,
    manufacturers,
    optionValues: manufacturersOptionValues,
    isFetching: isFetchingManufacturers || isFetchingOptionValues,
    useManufacturingByDefault,
    subscriptionServiceIDs,
});

const mapDispatchToProps = {
    editSite,
    hideModal,
    fetchManufacturersByPinOptionType,
    fetchAllOptionValues,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditSiteFormContainer);
