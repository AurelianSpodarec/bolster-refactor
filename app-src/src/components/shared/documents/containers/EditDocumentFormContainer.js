import React, { Component } from 'react';
import { connect } from 'react-redux';

import EditDocumentForm from '../presentational/EditDocumentForm';
import { FILE_STORAGE_URL } from 'config';
import Loading from 'components/shared/generic/misc/presentational/Loading';

class EditDocumentFormContainer extends Component {
    state = {
        // view only, agreement once, agreement daily - radio buttons
        type: '1',
        // textboxes
        name: '',
        file: {},
        // toggles
        isPhotoRequired: false,
        isFileViewRequired: false,
        isSignatureRequired: false,
        isUpsyncForced: false,
        // dropdown
        services: {},
        agreeanceEveryXDays: 0,
        // date selector
        startOn: new Date(),
        endOn: new Date()
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
                handleMultiselect={this.handleMultiselect}
                handleFileChange={this.handleFileChange}
                handleDateChange={this.handleDateChange}
                validateDatePicker={this.validateDatePicker}
                backUrl={this.props.backUrl}
            />
        ) : (
            <Loading />
        );
    }

    componentDidUpdate(prevProps) {
        const {
            isFetching,
            services,
            subscriptions = [],
            document
        } = this.props;
        if (!isFetching && prevProps.isFetching) {
            const { services: documentServices = [] } = document;
            const servicesForState = Object.values(services).reduce(
                (acc, { id, name }) => {
                    acc[id] = {
                        id,
                        name,
                        disabled: !subscriptions.includes(id),
                        // ? is this the right key?
                        checked: documentServices.includes(id)
                    };
                    return acc;
                },
                {}
            );
            this.setState({
                ...document,
                type: String(document.type),
                startOn: new Date(document.startOn),
                endOn: new Date(document.endOn),
                services: servicesForState,
                file: `${FILE_STORAGE_URL}/${document.fileS3Key}`
            });
        }
    }
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
