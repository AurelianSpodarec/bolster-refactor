/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import editCompanySettings from 'actions/companyAdmin/companySettings/async/editCompanySettings';

import EditSettingsForm from '../presentational/EditSettingsForm';
import { sortTimezones, isObjEmpty, enumFormat } from 'helpers/generic';
import { DEFAULT_SITES_SORT, DEFAULT_SITES_SORT_NAMES } from 'constants/companyAdmin/enums';
import { vatOptions } from 'constants/shared/vatTypes';

class EditSettingsFormContainer extends Component {
    state = {
        templateUsageRuleOptions: {
            1: { label: 'Use Only Owner Company', value: 1 },
            2: { label: 'Use Only Own', value: 2 },
            3: { label: 'Use Any', value: 3 },
        },
        name: '',
        addressLine1: '',
        addressLine2: '',
        town: '',
        county: '',
        postcode: '',
        country: '',
        logoFile: null,
        colourCode: null,
        isBolsterLogoDark: false,
        telephone: null,
        fax: null,
        labelTelNumber: null,
        labelCompanyName: null,
        defaultTemplateUsageRule: undefined,
        initialFile: '',
        timeZone: '',
        dateFormat: { value: '', label: '' },
        isUsingBolsterLabels: false,
        vatCode: null,
        vatType: null,
        timeZoneOptions: [],
        dateFormatOptions: [],
        isEditButtonDisabled: false,
        deafultSitesSort: DEFAULT_SITES_SORT.CUSTOM,
        // defaultDropdownSorting: DEFAULT_PIN_OPTIONS_SORT.CUSTOM,
        shouldDeleteReportsAfterDownload: false,
        enableQRCodes: false,
        useManufacturingByDefault: false,
        unsyncedCompanyNotificationDays: '',
        unsyncedOperativeWarningDays: '',
    };

    render() {
        const { filesUploading } = this.props;
        const {
            defaultTemplateUsageRule,
            timeZone,
            dateFormat,
            timeZoneOptions,
            dateFormatOptions,
            unsyncedCompanyNotificationDays,
            unsyncedOperativeWarningDays,
        } = this.state;

        const templateUsageRuleOptions = {
            1: { text: 'Use Only Owner Company', value: 1 },
            2: { text: 'Use Only Own', value: 2 },
            3: { text: 'Use Any', value: 3 },
        };

        const siteSortOptions = enumFormat(DEFAULT_SITES_SORT_NAMES);

        return (
            <EditSettingsForm
                {...this.state}
                filesUploading={filesUploading}
                handleInputChange={this.handleInputChange}
                handleSubmit={this.handleSubmit}
                handleColourSelect={this.handleColourSelect}
                handleCheckboxChange={this.handleCheckboxChange}
                templateUsageRules={Object.values(templateUsageRuleOptions)}
                selectedRule={templateUsageRuleOptions[defaultTemplateUsageRule]}
                timeZoneOptions={timeZoneOptions}
                timeZone={timeZone}
                dateFormatOptions={dateFormatOptions}
                dateFormat={dateFormat}
                handleDateFormatChange={this.handleDateFormatChange}
                vatOptions={vatOptions}
                siteSortOptions={siteSortOptions}
                unsyncedCompanyNotificationDays={unsyncedCompanyNotificationDays}
                unsyncedOperativeWarningDays={unsyncedOperativeWarningDays}
            />
        );
    }

    componentDidMount = () => {
        const {
            companySettings: {
                createdOn,
                cultureInfoID,
                id,
                type,
                logoFile,
                timeZone,
                timeZones,
                dateFormat,
                colourCode,
                enableQRCodes,
                ...restSettings
            },
        } = this.props;
        this.setState({
            ...restSettings,
            initialFile: logoFile,
            logoFile,
            colourCode: colourCode,
            timeZone: timeZone.id,
            timeZoneOptions: this.formatTimezones(),
            dateFormat: dateFormat.id,
            dateFormatOptions: this.formatDateFormats(),
            enableQRCodes,
        });
    };

    componentDidUpdate = prevProps => {
        const { postSuccess, history, timeZones, dateFormats } = this.props;
        if (postSuccess && !prevProps.postSuccess) {
            history.push('/company/settings');
        }
        if (isObjEmpty(prevProps.timeZones) && !isObjEmpty(timeZones)) {
            this.setState({ timeZoneOptions: this.formatTimezones() });
        }
        if (isObjEmpty(prevProps.dateFormats) && !isObjEmpty(dateFormats)) {
            this.setState({ dateFormatOptions: this.formatDateFormats() });
        }
    };

    handleInputChange = (name, value) => {
        if (name === 'vatType' && value >= 3) {
            // * clear the vatCode field if the company admin no longer has vat code
            this.setState({ [name]: value, vatCode: null });
        } else {
            // * otherwise set the state in the usual way
            this.setState({ [name]: value });
        }
    };

    handleSubmit = e => {
        e.preventDefault();
        const { filesUploading, editCompanySettings } = this.props;
        if (!filesUploading) {
            const { dateFormat, ...postBody } = this.state;

            localStorage.setItem('colourCode', postBody.colourCode);

            editCompanySettings({
                ...postBody,
                dateFormatID: dateFormat,
            });
        }
    };

    formatTimezones = () =>
        sortTimezones(this.props.timeZones).map(({ id, name, offset }) => ({
            value: id,
            label: `${name} - ${offset}`,
        }));

    formatDateFormats = () =>
        this.props.dateFormats.map(({ id, example, momentDateTimeFormat }) => ({
            value: id,
            label: `${momentDateTimeFormat} (eg. ${example})}`,
        }));
}

const mapDispatchToProps = { editCompanySettings };

const mapStateToProps = ({
    companyAdmin: {
        companySettingsReducer: { companySettings, postSuccess },
    },
    shared: {
        filesUploadingReducer: { filesUploading },
        timeReducer: { timeZones, dateFormats },
    },
}) => ({
    companySettings,
    filesUploading,
    postSuccess,
    timeZones: Object.values(timeZones),
    dateFormats: Object.values(dateFormats),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditSettingsFormContainer));
