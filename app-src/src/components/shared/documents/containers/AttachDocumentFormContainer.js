import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import AttachDocumentForm from '../presentational/AttachDocumentForm';
import createDocument from 'actions/documents/async/createDocument';
import fetchCompaniesPermissions from 'actions/companyAdmin/companiesPermissions/async/fetchCompanyPermissions';
import {
    ACCESS_TYPES_VALUES,
    DOCUMENT_TYPES,
    DOCUMENT_VISIBILITY,
    HIERARCHY_IDS,
    HIERARCHY_TYPES,
} from 'constants/companyAdmin/enums';
import fetchOperativesForDrawing from 'actions/companyAdmin/operatives/async/fetchOperativesForDrawing';
import fetchOperativesForBuilding from 'actions/companyAdmin/operatives/async/fetchOperativesForBuilding';
import fetchOperativesForFloor from 'actions/companyAdmin/operatives/async/fetchOperativesForFloor';
import fetchOperativesForSite from 'actions/companyAdmin/operatives/async/fetchOperativesForSite';
const { SITE, BUILDING, FLOOR, DRAWING } = HIERARCHY_IDS;

class AttachDocumentFormContainer extends Component {
    state = {
        type: DOCUMENT_TYPES.VIEW_ONLY,
        name: '',
        file: '',
        isPhotoRequired: false,
        isFileViewRequired: false,
        isSignatureRequired: false,
        isUpsyncForced: false,
        serviceIDs: [],
        agreeanceEveryXDays: 0,
        startOn: undefined,
        endOn: undefined,
        documentVisibility: null,
        operativeIDs: [],
    };
    render = () => {
        const { filesUploading, backUrl, operatives } = this.props;
        const serviceOptions = this._getServicesOptions();
        const showMoreServicesMesssage = serviceOptions.some(option => option.disabled);
        const showClientServicesMessage = serviceOptions.some(option => option.hideClientAccess);
        const operativeOptions = Object.values(operatives).map(
            ({ id, userFirstName, userLastName, userEmail }) => ({
                value: id,
                text: `${userFirstName} ${userLastName} <${userEmail}>`,
                label: `${userFirstName} ${userLastName} <${userEmail}>`,
            }),
        );
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
                operativeOptions={operativeOptions}
            />
        );
    };
    componentDidMount = () => {
        const {
            fetchCompaniesPermissions,
            hierarchyType,
            hierarchyID,
            fetchOperativesForSite,
            fetchOperativesForBuilding,
            fetchOperativesForFloor,
            fetchOperativesForDrawing,
        } = this.props;

        fetchCompaniesPermissions(hierarchyType, hierarchyID);
        if (hierarchyType === HIERARCHY_TYPES[SITE]) {
            fetchOperativesForSite(hierarchyID);
        } else if (hierarchyType === HIERARCHY_TYPES[BUILDING]) {
            fetchOperativesForBuilding(hierarchyID);
        } else if (hierarchyType === HIERARCHY_TYPES[FLOOR]) {
            fetchOperativesForFloor(hierarchyID);
        } else if (hierarchyType === HIERARCHY_TYPES[DRAWING]) {
            fetchOperativesForDrawing(hierarchyID);
        }
    };

    componentDidUpdate = (prevProps, prevState) => {
        const {
            postSuccess,
            history,
            hierarchyType,
            hierarchyID,
            companiesWithPermissions,
        } = this.props;
        const { documentVisibility } = this.state;
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

        if (
            +prevState.documentVisibility === DOCUMENT_VISIBILITY.VISIBLE_TO_SELECT_OPERATIVES &&
            +documentVisibility !== DOCUMENT_VISIBILITY.VISIBLE_TO_SELECT_OPERATIVES
        ) {
            this.setState({ operativeIDs: [] });
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
            const postBody = {
                ...this.state,
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
            operativesReducer: { operatives },
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
    operatives,
});

const mapDispatchToProps = {
    createDocument,
    fetchCompaniesPermissions,
    fetchOperativesForDrawing,
    fetchOperativesForBuilding,
    fetchOperativesForFloor,
    fetchOperativesForSite,
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(AttachDocumentFormContainer),
);
