import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import AttachDocumentForm from '../presentational/AttachDocumentForm';
import createDocument from 'actions/documents/async/createDocument';
import fetchCompaniesPermissions from 'actions/companyAdmin/companiesPermissions/async/fetchCompanyPermissions';

class AttachDocumentFormContainer extends Component {
    state = {
        // view only, agreement once, agreement daily - radio buttons
        type: '1',
        // textboxes
        name: '',
        file: '',
        // toggles
        isPhotoRequired: false,
        isFileViewRequired: false,
        isSignatureRequired: false,
        isUpsyncForced: false,
        // dropdown
        serviceIDs: [],
        agreeanceEveryXDays: 0,
        // date selector
        startOn: undefined,
        endOn: undefined,
        documentVisibility: null,
    };
    render = () => {
        const { filesUploading, backUrl, companyID, companiesWithPermissions } = this.props;
        const serviceOptions = this._getServicesOptions();
        const showMoreServicesMesssage = serviceOptions.some(option => option.disabled === true);
        console.warn({ companyID, companiesWithPermissions });
        console.warn({ companyID, companiesWithPermissions });
        console.warn({ companyID, companiesWithPermissions });

        return (
            <AttachDocumentForm
                {...this.state}
                isOwner={this.checkIsOwner()}
                services={serviceOptions}
                handleInputChange={this.handleInputChange}
                handleSubmit={this.handleSubmit}
                handleRadioChange={this.handleRadioChange}
                handleCheckboxChange={this.handleCheckboxChange}
                handleMultiselectChange={this.handleMultiselectChange}
                handleDateChange={this.handleDateChange}
                validateDatePicker={this.validateDatePicker}
                backUrl={backUrl}
                filesUploading={filesUploading}
                showMoreServicesMesssage={showMoreServicesMesssage}
            />
        );
    };
    componentDidMount = () => {
        const { fetchCompaniesPermissions, hierarchyType, hierarchyID } = this.props;

        fetchCompaniesPermissions(hierarchyType, hierarchyID);
    };

    componentDidUpdate = prevProps => {
        const { postSuccess, history, hierarchyType, hierarchyID } = this.props;

        if (!prevProps.postSuccess && postSuccess) {
            history.replace(`/company/${hierarchyType}s/${hierarchyID}`);
        }
    };
    checkIsOwner = () => {
        const { companiesWithPermissions, companyID } = this.props;

        const filteredThisCompany = companiesWithPermissions.filter(
            company => company.companyID === companyID,
        );

        if (filteredThisCompany.length > 0) {
            return true;
        } else {
            return false;
        }
    };

    _getServicesOptions = () => {
        const { services, subscriptions } = this.props;
        return services.map(({ id, name }) => ({
            value: id,
            text: name,
            disabled: !subscriptions.includes(id),
        }));
    };

    handleCheckboxChange = name => {
        this.setState(prevState => ({
            [name]: !prevState[name],
        }));
    };

    handleInputChange = (name, value) => this.setState({ [name]: value });

    handleDateChange = (date, name) => this.setState({ [name]: date });

    handleSubmit = e => {
        e.preventDefault();
        const { createDocument, hierarchyType, hierarchyID, filesUploading } = this.props;
        if (!filesUploading) {
            const {
                serviceIDs,
                // eslint-disable-next-line no-unused-vars
                services,
                ...body
            } = this.state;
            const postBody = {
                ...body,
                serviceIDs: serviceIDs,
            };
            createDocument(hierarchyType, hierarchyID, postBody);
        }
    };
}

const mapStateToProps = (
    {
        companyAdmin: {
            servicesReducer,
            subscriptionsReducer,
            documentsReducer,
            companiesPermissionsReducer,
        },
        shared: {
            filesUploadingReducer: { filesUploading },
            decodeJWTReducer: { jwtData: companyID },
        },
    },
    { match },
) => ({
    filesUploading,
    isFetching: servicesReducer.isFetching || subscriptionsReducer.isFetching,
    services: Object.values(servicesReducer.services),
    subscriptions: subscriptionsReducer.subscriptions.serviceIDs || [],
    hierarchyID: match.params.id,
    postSuccess: documentsReducer.postSuccess,
    companyID: companyID.companyID,
    companiesWithPermissions: Object.values(companiesPermissionsReducer.companiesPermissions),
});

const mapDispatchToProps = dispatch => ({
    createDocument: (type, id, postBody) => {
        dispatch(createDocument(type, id, postBody));
    },
    fetchCompaniesPermissions: (type, id) => {
        dispatch(fetchCompaniesPermissions(type, id));
    },
});

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(AttachDocumentFormContainer),
);
