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
        initialFile: ''
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
                ...restSettings
            }
        } = this.props;
        this.setState({
            ...restSettings,
            colourCode: restSettings.colourCode || '#fff',
            initialFile: logoFile,
            logoFile
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
            // eslint-disable-next-line no-unused-vars
            const { templateUsageRuleOptions, ...postBody } = this.state;
            editCompanySettings(postBody);
        }
    };
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
        filesUploadingReducer: { filesUploading }
    }
}) => ({
    isFetching,
    error,
    companySettings,
    filesUploading,
    postSuccess
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(EditSettingsFormContainer)
);
