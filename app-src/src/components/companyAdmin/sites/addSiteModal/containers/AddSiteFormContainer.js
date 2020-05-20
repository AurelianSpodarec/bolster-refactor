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
        optionValues: [],
        selectedOptionValues: [],
        optionValuesOptions: {},
    };

    render() {
        const { isUsingBolsterLabels, isFetching, error, optionValues } = this.props;

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

            this.setState({
                manufacturerOptions,
                selectedManufacturerOptions,
                optionValuesOptions,
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
        } = this.state;
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

        createSite(postBody);
        hideModal();
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
            acc = { ...acc, [manufacturerID]: this.formatOptions(Object.values(options)) };
            return acc;
        }, {});
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
});

const mapDispatchToProps = {
    createSite,
    hideModal,
    fetchManufacturersByPinOptionType,
    fetchAllOptionValues,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddSiteFormContainer));
