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
    };

    render() {
        const { isUsingBolsterLabels } = this.props;
        return (
            <AddSiteForm
                {...this.state}
                handleInputChange={this.handleInputChange}
                handleDateChange={this.handleDateChange}
                handleSubmit={this.handleSubmit}
                hideModal={this.props.hideModal}
                isUsingBolsterLabels={isUsingBolsterLabels}
            />
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
}

const mapStateToProps = ({
    companyAdmin: {
        sitesReducer,
        companySettingsReducer: {
            companySettings: { isUsingBolsterLabels },
        },
    },
}) => ({
    isUsingBolsterLabels,
    postSuccess: sitesReducer.postSuccess,
    error: sitesReducer.error,
    updatedSiteID: sitesReducer.updatedSiteID,
});

const mapDispatchToProps = {
    createSite,
    hideModal,
    fetchManufacturersByPinOptionType,
    fetchAllOptionValues,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddSiteFormContainer));
