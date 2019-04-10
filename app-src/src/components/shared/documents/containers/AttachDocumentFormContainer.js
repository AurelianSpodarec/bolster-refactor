import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import AttachDocumentForm from '../presentational/AttachDocumentForm';
import createDocument from 'actions/documents/async/createDocument';

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
        endOn: undefined
    };

    render = () => {
        const serviceOptions = this._getServicesOptions();

        return (
            <AttachDocumentForm
                {...this.state}
                services={serviceOptions}
                handleInputChange={this.handleInputChange}
                handleSubmit={this.handleSubmit}
                handleRadioChange={this.handleRadioChange}
                handleCheckboxChange={this.handleCheckboxChange}
                handleMultiselectChange={this.handleMultiselectChange}
                handleFileChange={this.handleFileChange}
                handleDateChange={this.handleDateChange}
                validateDatePicker={this.validateDatePicker}
                backUrl={this.props.backUrl}
            />
        );
    };

    componentDidUpdate = prevProps => {
        const { postSuccess, history, hierarchyType, hierarchyID } = this.props;

        if (!prevProps.postSuccess && postSuccess) {
            history.replace(`company/${hierarchyType}s/${hierarchyID}`);
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

    handleInputChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleFileChange = (name, s3Key) => {
        const { [name]: file } = this.state;
        this.setState({ [name]: file === s3Key ? '' : s3Key });
    };

    handleDateChange = (date, name) => {
        this.setState({
            [name]: date
        });
    };

    handleRadioChange = e => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    handleSubmit = e => {
        e.preventDefault();
        const { createDocument, hierarchyType, hierarchyID } = this.props;

        const {
            serviceIDs,
            // eslint-disable-next-line no-unused-vars
            services,
            ...body
        } = this.state;
        const postBody = {
            ...body,
            serviceIDs: serviceIDs
        };
        createDocument(hierarchyType, hierarchyID, postBody);
    };
}

const mapStateToProps = (
    {
        companyAdmin: {
            servicesReducer,
            subscriptionsReducer,
            documentsReducer
        }
    },
    { match }
) => ({
    isFetching: servicesReducer.isFetching || subscriptionsReducer.isFetching,
    services: Object.values(servicesReducer.services),
    subscriptions: subscriptionsReducer.subscriptions.serviceIDs || [],
    hierarchyID: match.params.id,
    postSuccess: documentsReducer.postSuccess
});

const mapDispatchToProps = dispatch => ({
    createDocument: (type, id, postBody) => {
        dispatch(createDocument(type, id, postBody));
    }
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(AttachDocumentFormContainer)
);
