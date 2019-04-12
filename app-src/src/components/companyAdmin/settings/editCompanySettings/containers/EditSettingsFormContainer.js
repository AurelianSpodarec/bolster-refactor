import React, { Component } from 'react';
import { connect } from 'react-redux';

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
        defaultTemplateUsageRule: 0
    };

    render() {
        const { filesUploading } = this.props;
        const {
            templateUsageRuleOptions,
            defaultTemplateUsageRule
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
                />
            </>
        );
    }

    componentDidMount = () => {
        // eslint-disable-next-line no-unused-vars
        const {
            createdOn,
            cultureInfoID,
            id,
            timeZoneID,
            type,
            vatCode,
            vatType,
            ...restCompanySettings
        } = this.props;
        this.setState({
            ...restCompanySettings,
            colourCode: restCompanySettings.colourCode || '#fff'
        });
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
        this.setState({ [name]: file });
    };

    handleCheckboxChange = e => {
        const { name } = e.target;
        this.setState(prevState => ({
            [name]: !prevState[name]
        }));
    };

    handleSubmit = e => {
        e.preventDefault();
        const { filesUploading } = this.props;
        if (!filesUploading) {
            //do something
        }
    };
}

const mapStateToProps = ({
    companyAdmin: {
        companySettingsReducer: { isFetching, error, companySettings }
    },
    shared: {
        filesUploadingReducer: { filesUploading }
    }
}) => ({
    isFetching,
    error,
    companySettings,
    filesUploading
});

export default connect(mapStateToProps)(EditSettingsFormContainer);
