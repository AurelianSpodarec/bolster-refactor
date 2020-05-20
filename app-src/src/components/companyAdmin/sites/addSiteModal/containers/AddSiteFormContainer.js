import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import moment from 'moment';

import AddSiteForm from '../presentational/AddSiteForm';
import createSite from 'actions/companyAdmin/sites/async/createSite';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import fetchManufacturersByPinOptionType from 'actions/companyAdmin/manufacturers/async/fetchManufacturersByPinOptionType';
import {
    DROPDOWN_OPTION_MANUFACTURER_ENABLED,
    DROPDOWN_OPTIONS,
} from 'constants/companyAdmin/enums';
import fetchAllOptionValues from 'actions/companyAdmin/manufacturers/async/fetchAllOptionValues';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import { isObjEmpty } from 'helpers/generic';

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
        setManufacturersForSite: this.props.useManufacturingByDefault,
        manufacturerOptions: [],
        selectedManufacturerOptions: [],
        selectedOptionValues: [],
        optionValuesOptions: {},
    };

    render() {
        const { isUsingBolsterLabels, isFetching, error, manufacturers } = this.props;

        return (
            <BlockContainer
                // isEmpty={true}
                isFetching={isFetching}
                error={error}
                contentClass="no-padding"
            >
                <AddSiteForm
                    {...this.state}
                    handleInputChange={this.handleInputChange}
                    handleDateChange={this.handleDateChange}
                    handleSubmit={this.handleSubmit}
                    hideModal={this.props.hideModal}
                    isUsingBolsterLabels={isUsingBolsterLabels}
                    isFetching={isFetching}
                    error={error}
                    manufacturers={manufacturers}
                />
            </BlockContainer>
        );
    }

    async componentDidMount() {
        const { fetchManufacturersByPinOptionType, fetchAllOptionValues } = this.props;

        // ** Only do a fetch for the manufacturers of a specific type if manufacturing is enabled. Wait for them to resolve before adding a site.
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
    }

    componentDidUpdate = prevProps => {
        const { postSuccess, history, updatedSiteID, isFetching } = this.props;

        if (postSuccess && !prevProps.postSuccess) {
            history.push(`/company/sites/${updatedSiteID}`);
        }

        if (prevProps.isFetching && !isFetching) {
            const manufacturerOptions = this.createManufacturerOptionList();
            const selectedManufacturerOptions = manufacturerOptions.reduce((acc, manufacturer) => {
                if (manufacturer.isEnabled) {
                    acc.push(String(manufacturer.value));
                }

                return acc;
            }, []);
            const optionValuesOptions = this.createOptionValuesList();
            let selectedOptionValues = [];
            Object.values(optionValuesOptions).forEach(optionList => {
                const optionListSelectedIDs = optionList.reduce((acc, optionValue) => {
                    if (optionValue.isEnabled) {
                        acc.push(String(optionValue.value));
                    }

                    return acc;
                }, []);
                selectedOptionValues = selectedOptionValues.concat(optionListSelectedIDs);
            });

            this.setState({
                manufacturerOptions,
                selectedManufacturerOptions,
                optionValuesOptions,
                selectedOptionValues,
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

    handleSubmit = e => {
        e.preventDefault();
        const { hideModal, createSite } = this.props;
        const {
            name,
            client,
            addressLine1,
            addressLine2,
            postcode,
            message,
            dateToSend,
            isAlertShowing,
            selectedOptionValues,
        } = this.state;

        const filteredOptionValues = this.removeUnusedManufacturerDefaults();

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
            };
        } else {
            postBody = {
                name,
                client,
                addressLine1,
                addressLine2,
                postcode,
            };
        }

        // createSite(postBody);
        // hideModal();
    };

    createManufacturerOptionList = () => {
        const { manufacturers } = this.props;
        if (!isObjEmpty(manufacturers)) {
            return Object.values(DROPDOWN_OPTIONS).reduce((acc, { reduxKey }) => {
                if (manufacturers[reduxKey]) {
                    const manufacturerOptions = this.formatOptions(
                        Object.values(manufacturers[reduxKey]),
                    );

                    acc = [...acc, ...manufacturerOptions];
                }

                return acc;
            }, []);
        }
        return [];
    };

    formatOptions = options => {
        return options.map(option => {
            return {
                ...option,
                text: option.name,
                value: option.id,
                isEnabled: option.isEnabled,
            };
        });
    };

    createOptionValuesList = () => {
        const { optionValues } = this.props;

        return Object.entries(optionValues).reduce((acc, [manufacturerID, options]) => {
            const formattedOptionValues = this.formatOptions(Object.values(options));
            const filteredOptionValues = formattedOptionValues.filter(option =>
                this.shouldOptionValueBeIncluded(option.serviceIDs),
            );
            acc = { ...acc, [manufacturerID]: filteredOptionValues };
            return acc;
        }, {});
    };

    shouldOptionValueBeIncluded = serviceIDs => {
        const { subscriptionServiceIDs } = this.props;
        return serviceIDs.some(id => subscriptionServiceIDs.includes(id));
    };

    removeUnusedManufacturerDefaults = () => {
        const {
            selectedOptionValues,
            optionValuesOptions,
            selectedManufacturerOptions,
            setManufacturersForSite,
        } = this.state;

        if (setManufacturersForSite) {
            const possibleOptionValues = Object.entries(optionValuesOptions).reduce(
                (acc, [manufacturerID, optionList]) => {
                    if (selectedManufacturerOptions.includes(manufacturerID)) {
                        const optionsToInclude = optionList.map(option => option.id);
                        acc = [...acc, ...optionsToInclude];
                    }
                    return acc;
                },
                [],
            );

            return selectedOptionValues.filter(option =>
                possibleOptionValues.includes(Number(option)),
            );
        } else {
            return [];
        }
    };
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
    createSite,
    hideModal,
    fetchManufacturersByPinOptionType,
    fetchAllOptionValues,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddSiteFormContainer));
