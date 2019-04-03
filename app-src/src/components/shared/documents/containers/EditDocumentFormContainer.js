import React, { Component } from 'react';
import { connect } from 'react-redux';

import EditDocumentForm from '../presentational/EditDocumentForm';
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
        services: [],
        selectedServices: [],
        agreeanceEveryXDays: '0',
        // date selector
        startOn: new Date(),
        endOn: new Date(),
        isFileViewHidden: false
    };

    render() {
        const { document } = this.props;
        return document ? (
            <EditDocumentForm
                {...this.state}
                handleInputChange={this.handleInputChange}
                handleSubmit={this.handleSubmit}
                handleRadioChange={this.handleRadioChange}
                handleCheckboxChange={this.handleCheckboxChange}
                handleCancelUpload={this.handleCancelUpload}
                handleMultiselect={this.handleMultiselect}
                handleFileChange={this.handleFileChange}
                handleDateChange={this.handleDateChange}
                handleHide={this.handleHide}
                validateDatePicker={this.validateDatePicker}
                backUrl={this.props.backUrl}
            />
        ) : (
            <Loading />
        );
    }

    componentDidMount() {
        const { isFetching, services, document } = this.props;
        if (!isFetching) {
            this.setState({
                ...document,
                type: String(document.type),
                startOn: new Date(document.startOn),
                endOn: new Date(document.endOn),
                services: this.getServicesForState(services),
                selectedServices: document.serviceIDs
            });
        }
    }

    componentDidUpdate(prevProps) {
        const { isFetching, services, document } = this.props;
        if (!isFetching && prevProps.isFetching) {
            this.setState({
                ...document,
                type: String(document.type),
                startOn: new Date(document.startOn),
                endOn: new Date(document.endOn),
                services: this.getServicesForState(services),
                selectedServices: document.serviceIDs
            });
        }
    }

    getServicesForState = services =>
        Object.values(services).reduce((acc, { id, name }) => {
            acc.push({
                value: id,
                text: name,
                disabled: !this.props.subscriptions.includes(id)
            });
            return acc;
        }, []);

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

    handleMultiselect = ({ target: { name, value } }) => {
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
        const { handleSubmit } = this.props;
        const {
            selectedServices,
            // eslint-disable-next-line no-unused-vars
            services,
            file,
            fileS3Key,
            ...body
        } = this.state;
        const postBody = {
            ...body,
            serviceIDs: selectedServices,
            file: isObjEmpty(file) ? { s3Key: fileS3Key } : file
        };
        handleSubmit(postBody);
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
    ownProps
) => ({
    isFetching:
        servicesReducer.isFetching ||
        subscriptionsReducer.isFetching ||
        documentsReducer.isFetching,
    services: servicesReducer.services,
    subscriptions: subscriptionsReducer.subscriptions.serviceIDs,
    document: documentsReducer.documents[ownProps.documentID]
});

export default connect(mapStateToProps)(EditDocumentFormContainer);
