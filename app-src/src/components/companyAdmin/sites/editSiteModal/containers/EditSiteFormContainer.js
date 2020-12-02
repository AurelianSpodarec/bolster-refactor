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
import editSite from 'actions/companyAdmin/sites/async/editSite';
import {
    DROPDOWN_OPTIONS,
    DROPDOWN_OPTION_MANUFACTURER_ENABLED,
} from 'constants/companyAdmin/enums';
import fetchAllOptionValues from 'actions/companyAdmin/manufacturers/async/fetchAllOptionValues';
import fetchManufacturersByPinOptionType from 'actions/companyAdmin/manufacturers/async/fetchManufacturersByPinOptionType';

import EditSiteForm from '../presentational/EditSiteForm';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import { createPreselectedItemOptionValuesList, formatDropdownOptions } from 'helpers/itemTypes';
import fetchSingleSiteDropdownOptions from 'actions/companyAdmin/dropdownOptions/async/fetchSingleSiteDropdownOptions';

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
        setDropdownOptions: false,
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
        const {
            site,
            fetchManufacturersByPinOptionType,
            fetchAllOptionValues,
            fetchSingleSiteDropdownOptions,
        } = this.props;

        // ** Only do a fetch for the manufacturers of a specific type if manufacturing is enabled. Wait for them to resolve before editing a site.
        const pinOptionTypes = Object.keys(DROPDOWN_OPTIONS).filter(option => {
            return DROPDOWN_OPTION_MANUFACTURER_ENABLED[option];
        });

        const fn = function fetchManufacturers(pinOptionType) {
            return fetchManufacturersByPinOptionType(pinOptionType);
        };

        const actions = pinOptionTypes.map(fn);

        await fetchSingleSiteDropdownOptions(2, site.id);

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
            singleSiteDropdownOptions,
        } = this.props;

        if (prevProps.isFetching && !isFetching) {
            const initialOptions = {
                setManufacturersForHierarchy: site.isManufacturingEnabled,
                manufacturerOptions: [],
                selectedManufacturerOptions: [],
                selectedOptionValues: [],
                optionValuesOptions: {},
                areOptionsLoaded: true,
            };

            const dropdownOptions = {
                setDropdownOptions: site.isDropDownOptionsEnabled,
                selectedDropdownOptions: [],
                dropdownOptions: {},
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
            dropdownOptions.dropdownOptions = formatDropdownOptions(singleSiteDropdownOptions);

            dropdownOptions.selectedDropdownOptions = createPreselectedItemOptionValuesList(
                site.dropDownOptionIDs,
            );

            this.setState(initialOptions);
            this.setState(dropdownOptions);
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
            setDropdownOptions,
            selectedDropdownOptions,
        } = this.state;

        const manufacturingEnabledOptions = {
            isManufacturingEnabled: setManufacturersForHierarchy,
            optionValueIDs: removeUnusedManufacturerDefaults(this.state),
        };

        const dropdownEnabledOptions = {
            isDropDownOptionEnabled: setDropdownOptions,
            DropDownOptionIDs: selectedDropdownOptions.map(id => +id),
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
                ...dropdownEnabledOptions,
            };
        } else {
            postBody = {
                name,
                client,
                addressLine1,
                addressLine2,
                postcode,
                ...manufacturingEnabledOptions,
                ...dropdownEnabledOptions,
            };
        }
        editSite(id, postBody);
        hideModal();
    };
}

const mapStateToProps = ({
    companyAdmin: {
        sitesReducer,
        companySettingsReducer: {
            companySettings: { isUsingBolsterLabels, useManufacturingByDefault },
        },
        dropdownOptionsReducer: {
            singleSiteDropdownOptions,
            isFetching: isFetchingDropdownOptions,
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
    isFetching: isFetchingManufacturers || isFetchingOptionValues || isFetchingDropdownOptions,
    useManufacturingByDefault,
    subscriptionServiceIDs,
    singleSiteDropdownOptions,
});

const mapDispatchToProps = {
    editSite,
    hideModal,
    fetchManufacturersByPinOptionType,
    fetchAllOptionValues,
    fetchSingleSiteDropdownOptions,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditSiteFormContainer);
