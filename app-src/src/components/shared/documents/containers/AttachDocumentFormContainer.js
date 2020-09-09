import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import AttachDocumentForm from '../presentational/AttachDocumentForm';
import createDocument from 'actions/documents/async/createDocument';
import fetchCompaniesPermissions from 'actions/companyAdmin/companiesPermissions/async/fetchCompanyPermissions';
import { ACCESS_TYPES_VALUES } from 'constants/companyAdmin/enums';

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
        const { filesUploading, backUrl } = this.props;
        const serviceOptions = this._getServicesOptions();
        const showMoreServicesMesssage = serviceOptions.some(option => option.disabled);
        const showClientServicesMessage = serviceOptions.some(option => option.hideClientAccess);
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
                showClientServicesMessage={showClientServicesMessage}
            />
        );
    };
    componentDidMount = () => {
        const { fetchCompaniesPermissions, hierarchyType, hierarchyID } = this.props;

        fetchCompaniesPermissions(hierarchyType, hierarchyID);
    };

    componentDidUpdate = prevProps => {
        const {
            postSuccess,
            history,
            hierarchyType,
            hierarchyID,
            companiesWithPermissions,
        } = this.props;
        if (
            companiesWithPermissions.length > 0 &&
            prevProps.companiesWithPermissions.length === 0
        ) {
            if (this.checkIsOwner()) {
                this.setState({
                    documentVisibility: 1,
                });
            }
        }
        if (!prevProps.postSuccess && postSuccess) {
            history.replace(`/company/${hierarchyType}s/${hierarchyID}`);
        }
    };
    checkIsOwner = () => {
        const { companiesWithPermissions, companyID } = this.props;

        const filteredThisCompany = companiesWithPermissions.filter(
            company => company.companyID === companyID,
        );

        if (
            filteredThisCompany.length > 0 &&
            filteredThisCompany[0].accessType === ACCESS_TYPES_VALUES.OWNER
        ) {
            return true;
        } else {
            return false;
        }
    };

    _getServicesOptions = () => {
        const { services, subscriptions, companiesWithPermissions, companyID } = this.props;
        const relevantPermissions = companiesWithPermissions.filter(
            perm => perm.companyID === companyID,
        );

        return services.map(({ id, name }) => {
            const hasSub = subscriptions.includes(id);
            // relevant service match or null, which implies all access
            const hasAccess = !!relevantPermissions.find(
                perm => perm.serviceID === id || perm.serviceID === null,
            );
            return {
                value: id,
                text: name,
                disabled: !(hasSub && hasAccess),
                hideClientAccess: !hasAccess,
            };
        });
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
            decodeJWTReducer: {
                jwtData: { companyID },
            },
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
    companyID,
    companiesWithPermissions: Object.values(companiesPermissionsReducer.companiesPermissions),
});

const mapDispatchToProps = { createDocument, fetchCompaniesPermissions };

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(AttachDocumentFormContainer),
);
