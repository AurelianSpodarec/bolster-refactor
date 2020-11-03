import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import EditDocumentForm from '../presentational/EditDocumentForm';
import editDocument from 'actions/documents/async/editDocument';
import fetchSingleDocument from 'actions/documents/async/fetchSingleDocument';
import Loading from 'components/shared/generic/misc/presentational/Loading';
import { ACCESS_TYPES_VALUES, HIERARCHY_IDS, HIERARCHY_TYPES } from 'constants/companyAdmin/enums';
import fetchOperativesForSite from 'actions/companyAdmin/operatives/async/fetchOperativesForSite';
import fetchOperativesForBuilding from 'actions/companyAdmin/operatives/async/fetchOperativesForBuilding';
import fetchOperativesForFloor from 'actions/companyAdmin/operatives/async/fetchOperativesForFloor';
import fetchOperativesForDrawing from 'actions/companyAdmin/operatives/async/fetchOperativesForDrawing';
import fetchCompanyPermissions from 'actions/companyAdmin/companiesPermissions/async/fetchCompanyPermissions';
const { SITE, BUILDING, FLOOR, DRAWING } = HIERARCHY_IDS;
class EditDocumentFormContainer extends Component {
    state = {
        type: '1',
        name: '',
        file: '',
        isPhotoRequired: false,
        isFileViewRequired: false,
        isSignatureRequired: false,
        isUpsyncForced: false,
        serviceIDs: [],
        agreeanceEveryXDays: '0',
        startOn: undefined,
        endOn: undefined,
        isFileViewHidden: false,
        operativeIDs: [],
    };

    render() {
        const { document, backUrl, documentID, filesUploading, operatives } = this.props;
        const serviceOptions = this._getServicesOptions();
        const operativeOptions = Object.values(operatives).map(
            ({ companyUserID, userFirstName, userLastName, userEmail }) => ({
                value: companyUserID,
                text: `${userFirstName} ${userLastName} <${userEmail}>`,
                label: `${userFirstName} ${userLastName} <${userEmail}>`,
            }),
        );

        return document ? (
            <EditDocumentForm
                {...this.state}
                isOwner={this.checkIsOwner()}
                services={serviceOptions}
                handleInputChange={this.handleInputChange}
                handleSubmit={this.handleSubmit}
                handleCancelUpload={this.handleCancelUpload}
                handleDateChange={this.handleDateChange}
                handleHide={this.handleHide}
                backUrl={backUrl}
                documentID={documentID}
                filesUploading={filesUploading}
                operativeOptions={operativeOptions}
            />
        ) : (
            <Loading />
        );
    }

    componentDidMount() {
        const { documentID } = this.props.match.params;
        const {
            document,
            hierarchyType,
            hierarchyID,
            fetchSingleDocument,
            fetchOperativesForSite,
            fetchOperativesForBuilding,
            fetchOperativesForFloor,
            fetchOperativesForDrawing,
            fetchCompanyPermissions,
        } = this.props;

        if (document && document.type) {
            this.setState({
                ...document,
                type: String(document.type),
                startOn: new Date(document.startOn),
                endOn: new Date(document.endOn),
                serviceIDs: document.serviceIDs.map(key => String(key)),
            });
        }

        fetchSingleDocument(documentID);
        fetchCompanyPermissions(hierarchyType, hierarchyID);

        if (hierarchyType.toLowerCase() === HIERARCHY_TYPES[SITE]) {
            fetchOperativesForSite(hierarchyID);
        } else if (hierarchyType.toLowerCase() === HIERARCHY_TYPES[BUILDING]) {
            fetchOperativesForBuilding(hierarchyID);
        } else if (hierarchyType.toLowerCase() === HIERARCHY_TYPES[FLOOR]) {
            fetchOperativesForFloor(hierarchyID);
        } else if (hierarchyType.toLowerCase() === HIERARCHY_TYPES[DRAWING]) {
            fetchOperativesForDrawing(hierarchyID);
        }
    }

    componentDidUpdate = prevProps => {
        const { postSuccess, history, hierarchyType, match, isFetching, document } = this.props;
        const { id: hierarchyID } = match.params;

        if (!isFetching && prevProps.isFetching) {
            const serviceIDs = document && document.serviceIDs.map(key => String(key));
            this.setState({
                ...document,
                file: document.fileS3Key,
                type: String(document.type),
                startOn: document.startOn ? new Date(document.startOn) : undefined,
                endOn: document.endOn ? new Date(document.endOn) : undefined,
                serviceIDs,
            });
        }

        if (!prevProps.postSuccess && postSuccess) {
            history.replace(`/company/${hierarchyType}s/${hierarchyID}`);
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

    handleHide = () => {
        this.setState({
            isFileViewHidden: true,
        });
    };

    handleCancelUpload = () => {
        this.setState({
            file: '',
            isFileViewHidden: false,
        });
    };

    handleInputChange = (name, value) => this.setState({ [name]: value });

    handleDateChange = (date, name) => {
        this.setState({
            [name]: date,
        });
    };

    handleSubmit = e => {
        e.preventDefault();
        const { editDocument, documentID, hierarchyType, match, filesUploading } = this.props;
        if (!filesUploading) {
            const { id: hierarchyID } = match.params;
            const {
                serviceIDs,
                // eslint-disable-next-line no-unused-vars
                services,
                file,
                ...body
            } = this.state;
            const postBody = {
                ...body,
                serviceIDs: serviceIDs,
                file: file || '',
                hierarchyID,
                hierarchyType,
            };
            editDocument(documentID, postBody);
        }
    };
}

const mapStateToProps = (
    {
        companyAdmin: {
            documentsReducer,
            servicesReducer,
            subscriptionsReducer,
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
    isFetching:
        servicesReducer.isFetching ||
        subscriptionsReducer.isFetching ||
        documentsReducer.isFetching,
    services: Object.values(servicesReducer.services),
    subscriptions: subscriptionsReducer.subscriptions.serviceIDs || [],
    document: documentsReducer.documents[match.params.documentID],
    hierarchyID: match.params.id,
    documentID: match.params.documentID,
    postSuccess: documentsReducer.postSuccess,
    companiesWithPermissions: Object.values(companiesPermissionsReducer.companiesPermissions),
    operatives,
    companyID,
});

const mapDispatchToProps = {
    editDocument,
    fetchCompanyPermissions,
    fetchOperativesForSite,
    fetchOperativesForBuilding,
    fetchOperativesForFloor,
    fetchOperativesForDrawing,
    fetchSingleDocument,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditDocumentFormContainer));
