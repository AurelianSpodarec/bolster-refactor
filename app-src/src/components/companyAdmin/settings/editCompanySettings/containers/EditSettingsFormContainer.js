/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import editCompanySettings from 'actions/companyAdmin/companySettings/async/editCompanySettings';

import EditSettingsForm from '../presentational/EditSettingsForm';

class EditSettingsFormContainer extends Component {
    state = {
        templateUsageRuleOptions: {
            '1': { text: 'Use Only Owner Company', value: 1 },
            '2': { text: 'Use Only Own', value: 2 },
            '3': { text: 'Use Any', value: 3 }
        },
        name: '',
        addressLine1: '',
        addressLine2: '',
        town: '',
        county: '',
        postcode: '',
        logoFile: null,
        colourCode: '#fff',
        isBolsterLogoDark: false,
        telephone: null,
        fax: null,
        labelTelNumber: null,
        labelCompanyName: null,
        hideOnClientList: false,
        defaultTemplateUsageRule: 0,
        initialFile: '',
        timezone: { value: '', label: '' },
        dateFormat: { value: '', label: '' }
    };

    render() {
        const { filesUploading } = this.props;
        const {
            templateUsageRuleOptions,
            defaultTemplateUsageRule,
            timezone,
            dateFormat
        } = this.state;

        return (
            <>
                <EditSettingsForm
                    {...this.state}
                    filesUploading={filesUploading}
                    handleInputChange={this.handleInputChange}
                    handleSubmit={this.handleSubmit}
                    handleFileChange={this.handleFileChange}
                    handleColourSelect={this.handleColourSelect}
                    handleCheckboxChange={this.handleCheckboxChange}
                    templateUsageRules={Object.values(templateUsageRuleOptions)}
                    selectedRule={
                        templateUsageRuleOptions[defaultTemplateUsageRule]
                    }
                    timeZones={this.formatTimezones()}
                    timezone={timezone}
                    handleTimezoneChange={this.handleTimezoneChange}
                    dateFormats={this.formatDateFormats()}
                    dateFormat={dateFormat}
                    handleDateFormatChange={this.handleDateFormatChange}
                />
            </>
        );
    }

    componentDidMount = () => {
        const {
            companySettings: {
                createdOn,
                cultureInfoID,
                id,
                timeZoneID,
                type,
                vatCode,
                vatType,
                logoFile,
                timeZone,
                dateFormat,
                ...restSettings
            }
        } = this.props;
        this.setState({
            ...restSettings,
            colourCode: restSettings.colourCode || '#fff',
            initialFile: logoFile,
            logoFile,
            timezone: {
                label: `${timeZone.name} - ${timeZone.offset}`,
                value: timeZone.id
            },
            dateFormat: {
                label: `${dateFormat.momentDateTimeFormat} - eg. ${
                    dateFormat.example
                }`,
                value: dateFormat.id
            }
        });
    };

    componentDidUpdate = prevProps => {
        const { postSuccess, history } = this.props;
        if (postSuccess && !prevProps.postSuccess) {
            history.push('/company/settings');
        }
    };

    handleInputChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleColourSelect = colour => {
        this.setState({
            colourCode: colour.hex
        });
    };

    handleFileChange = (name, file) => {
        this.setState(prevState => {
            if (prevState.logoFile === file) {
                return { [name]: prevState.initialFile };
            } else {
                return { [name]: file };
            }
        });
    };

    handleTimezoneChange = timezone => this.setState({ timezone });

    handleDateFormatChange = dateFormat => this.setState({ dateFormat });

    handleCheckboxChange = e => {
        const { name } = e.target;
        this.setState(prevState => ({
            [name]: !prevState[name]
        }));
    };

    handleSubmit = e => {
        e.preventDefault();
        const { filesUploading, editCompanySettings } = this.props;
        if (!filesUploading) {
            const {
                templateUsageRuleOptions,
                timezone,
                dateFormat,
                ...postBody
            } = this.state;
            editCompanySettings({
                ...postBody,
                timezone: timezone.value,
                dateFormatID: dateFormat.value
            });
        }
    };

    formatTimezones = () =>
        this.props.timeZones.map(({ id, name, offset }) => ({
            value: id,
            label: `${name} - ${offset}`
        }));

    formatDateFormats = () =>
        this.props.dateFormats.map(({ id, example, momentDateTimeFormat }) => ({
            value: id,
            label: `${momentDateTimeFormat} (eg. ${example})}`
        }));
}

const mapDispatchToProps = dispatch => ({
    editCompanySettings: postBody => {
        dispatch(editCompanySettings(postBody));
    }
});

const mapStateToProps = ({
    companyAdmin: {
        companySettingsReducer: {
            isFetching,
            error,
            companySettings,
            postSuccess
        }
    },
    shared: {
        filesUploadingReducer: { filesUploading },
        timeReducer: { timeZones, dateFormats }
    }
}) => ({
    isFetching,
    error,
    companySettings,
    filesUploading,
    postSuccess,
    timeZones: Object.values(timeZones),
    dateFormats: Object.values(dateFormats)
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(EditSettingsFormContainer)
);
