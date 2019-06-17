import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import EditDocumentForm from '../presentational/EditDocumentForm';
import editDocument from 'actions/documents/async/editDocument';
import fetchSingleDocument from 'actions/documents/async/fetchSingleDocument';
import Loading from 'components/shared/generic/misc/presentational/Loading';

class EditDocumentFormContainer extends Component {
    state = {
        // view only, agreement once, agreement daily - radio buttons
        type: '1',
        // textboxes
        name: '',
        fileS3Key: '',
        file: '',
        // toggles
        isPhotoRequired: false,
        isFileViewRequired: false,
        isSignatureRequired: false,
        isUpsyncForced: false,
        // dropdown
        serviceIDs: [],
        agreeanceEveryXDays: '0',
        // date selector
        startOn: undefined,
        endOn: undefined,
        isFileViewHidden: false
    };

    render() {
        const { document, backUrl, documentID, filesUploading } = this.props;
        const serviceOptions = this._getServicesOptions();

        return document ? (
            <EditDocumentForm
                {...this.state}
                services={serviceOptions}
                handleInputChange={this.handleInputChange}
                handleSubmit={this.handleSubmit}
                handleCancelUpload={this.handleCancelUpload}
                handleDateChange={this.handleDateChange}
                handleHide={this.handleHide}
                backUrl={backUrl}
                documentID={documentID}
                filesUploading={filesUploading}
            />
        ) : (
            <Loading />
        );
    }

    componentDidMount() {
        const { documentID } = this.props.match.params;
        const { document, fetchSingleDocument } = this.props;

        if (document && document.type) {
            this.setState({
                ...document,
                type: String(document.type),
                startOn: new Date(document.startOn),
                endOn: new Date(document.endOn),
                serviceIDs: document.serviceIDs.map(key => String(key))
            });
        }

        fetchSingleDocument(documentID);
    }

    componentDidUpdate = prevProps => {
        const {
            postSuccess,
            history,
            hierarchyType,
            match,
            isFetching,
            document
        } = this.props;
        const { id: hierarchyID } = match.params;

        if (!isFetching && prevProps.isFetching) {
            const serviceIDs =
                document && document.serviceIDs.map(key => String(key));
            this.setState({
                ...document,
                type: String(document.type),
                startOn: document.startOn
                    ? new Date(document.startOn)
                    : undefined,
                endOn: document.endOn ? new Date(document.endOn) : undefined,
                serviceIDs
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
            disabled: !subscriptions.includes(id)
        }));
    };

    handleHide = () => {
        this.setState({
            isFileViewHidden: true
        });
    };

    handleCancelUpload = () => {
        this.setState({
            file: '',
            isFileViewHidden: false
        });
    };

    handleInputChange = (name, value) => this.setState({ [name]: value });

    handleDateChange = (date, name) => {
        this.setState({
            [name]: date
        });
    };

    handleSubmit = e => {
        e.preventDefault();
        const {
            editDocument,
            documentID,
            hierarchyType,
            match,
            filesUploading
        } = this.props;
        if (!filesUploading) {
            const { id: hierarchyID } = match.params;
            const {
                serviceIDs,
                // eslint-disable-next-line no-unused-vars
                services,
                file,
                fileS3Key,
                ...body
            } = this.state;
            const postBody = {
                ...body,
                serviceIDs: serviceIDs,
                file: file.length ? file : fileS3Key,
                hierarchyID,
                hierarchyType
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
            subscriptionsReducer
        },
        shared: {
            filesUploadingReducer: { filesUploading }
        }
    },
    { match }
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
    postSuccess: documentsReducer.postSuccess
});

const mapDispatchToProps = dispatch => ({
    fetchSingleDocument: ID => dispatch(fetchSingleDocument(ID)),
    editDocument: (id, postBody) => dispatch(editDocument(id, postBody))
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(EditDocumentFormContainer)
);
