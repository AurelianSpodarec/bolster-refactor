import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import EditDocumentForm from '../presentational/EditDocumentForm';
import editDocument from 'actions/companyAdmin/documents/async/editDocument';
import fetchSingleDocument from 'actions/companyAdmin/documents/async/fetchSingleDocument';
import Loading from 'components/shared/generic/misc/presentational/Loading';
import { isObjEmpty } from 'helpers/generic';

class EditDocumentFormContainer extends Component {
    state = {
        // view only, agreement once, agreement daily - radio buttons
        type: '1',
        // textboxes
        name: '',
        fileS3Key: '',
        file: {},
        // toggles
        isPhotoRequired: false,
        isFileViewRequired: false,
        isSignatureRequired: false,
        isUpsyncForced: false,
        // dropdown
        serviceIDs: [],
        agreeanceEveryXDays: '0',
        // date selector
        startOn: new Date(),
        endOn: new Date(),
        isFileViewHidden: false
    };

    render() {
        const { document } = this.props;
        const serviceOptions = this._getServicesOptions();

        return document ? (
            <EditDocumentForm
                {...this.state}
                services={serviceOptions}
                handleInputChange={this.handleInputChange}
                handleSubmit={this.handleSubmit}
                handleRadioChange={this.handleRadioChange}
                handleCheckboxChange={this.handleCheckboxChange}
                handleCancelUpload={this.handleCancelUpload}
                handleMultiselectChange={this.handleMultiselectChange}
                handleFileChange={this.handleFileChange}
                handleDateChange={this.handleDateChange}
                handleHide={this.handleHide}
                validateDatePicker={this.validateDatePicker}
                backUrl={this.props.backUrl}
                documentID={this.props.documentID}
            />
        ) : (
            <Loading />
        );
    }

    componentDidMount() {
        const { documentID } = this.props.match.params;
        const {
            isFetching,
            services,
            document,
            fetchSingleDocument
        } = this.props;

        if (!isFetching) {
            this.setState({
                ...document,
                type: String(document.type),
                startOn: new Date(document.startOn),
                endOn: new Date(document.endOn),
                services: this._getServicesOptions,
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
            hierarchyID,
            isFetching,
            document
        } = this.props;

        if (!isFetching && prevProps.isFetching) {
            const serviceIDs =
                document && document.serviceIDs.map(key => String(key));
            this.setState({
                ...document,
                type: String(document.type),
                startOn: new Date(document.startOn),
                endOn: new Date(document.endOn),
                services: this._getServicesOptions,
                serviceIDs
            });
        }

        if (!prevProps.postSuccess && postSuccess) {
            history.replace(`/${hierarchyType}s/${hierarchyID}`);
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
            file: {},
            isFileViewHidden: false
        });
    };
    handleRadioChange = e => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    handleInputChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleFileChange = (name, file) => {
        this.setState({ [name]: file });
    };

    handleDateChange = (date, name) => {
        this.setState({
            [name]: date
        });
    };

    handleMultiselectChange = ({ target: { name, value } }) => {
        const checkedValues = this.state[name];
        const newValues = checkedValues.includes(value)
            ? checkedValues.filter(val => val !== value)
            : [...checkedValues, value];

        this.setState({ [name]: newValues });
    };

    handleCheckboxChange = e => {
        const { name } = e.target;
        this.setState(prevState => ({
            [name]: !prevState[name]
        }));
    };

    handleSubmit = e => {
        e.preventDefault();
        const { editDocument, hierarchyType, hierarchyID } = this.props;
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
            file: isObjEmpty(file) ? { s3Key: fileS3Key } : file
        };
        editDocument(hierarchyID, postBody);
    };
}

const mapStateToProps = (
    {
        companyAdmin: {
            documentsReducer,
            servicesReducer,
            subscriptionsReducer
        }
    },
    { match },
    ownProps
) => ({
    isFetching:
        servicesReducer.isFetching ||
        subscriptionsReducer.isFetching ||
        documentsReducer.isFetching,
    services: Object.values(servicesReducer.services),
    subscriptions: subscriptionsReducer.subscriptions.serviceIDs || [],
    document: documentsReducer.documents[match.params.documentID],
    documentID: match.params.documentID,
    postSuccess: documentsReducer.postSuccess
});

const mapDispatchToProps = dispatch => ({
    fetchSingleDocument: ID => {
        dispatch(fetchSingleDocument(ID));
    },
    editDocument: (documentID, postBody) => {
        dispatch(editDocument(documentID, postBody));
    }
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(EditDocumentFormContainer)
);
