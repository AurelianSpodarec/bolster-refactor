import React, { Component } from 'react';
import { connect } from 'react-redux';

import AttachDocumentForm from '../presentational/AttachDocumentForm';
import { updateObj } from 'helpers/generic';

class AttachDocumentFormContainer extends Component {
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

    render = () => {
        return (
            <AttachDocumentForm
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
        );
    };

    componentDidUpdate(prevProps) {
        const { isFetching, services, subscriptions } = this.props;
        if (!isFetching && prevProps.isFetching) {
            const servicesForState = Object.values(services).reduce(
                (acc, { id, name }) => {
                    acc[id] = {
                        id,
                        name,
                        disabled: !subscriptions.includes(id),
                        checked: false
                    };
                    return acc;
                },
                {}
            );
            this.setState({ services: servicesForState });
        }
    }

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

    handleFileChange = (name, file) => {
        this.setState({ [name]: file });
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

    handleMultiselect = e => {
        const serviceID = e.target.id;
        const id = serviceID.split('_')[1];
        this.setState(prevState => {
            const { services } = prevState;
            const service = services[id];
            return {
                services: {
                    ...services,
                    [id]: updateObj(service, 'checked', !service.checked)
                }
            };
        });
    };

    handleSubmit = e => {
        e.preventDefault();
        const { handleSubmit } = this.props;
        const { services, ...body } = this.state;

        const serviceIDs = Object.values(services).reduce((acc, service) => {
            if (service.checked) acc.push(String(service.id));
            return acc;
        }, []);
        const postBody = { ...body, serviceIDs };
        handleSubmit(postBody);
    };
}

const mapStateToProps = ({
    companyAdmin: { servicesReducer, subscriptionsReducer }
}) => ({
    isFetching: servicesReducer.isFetching || subscriptionsReducer.isFetching,
    services: servicesReducer.services,
    subscriptions: subscriptionsReducer.subscriptions.serviceIDs
});

export default connect(mapStateToProps)(AttachDocumentFormContainer);
