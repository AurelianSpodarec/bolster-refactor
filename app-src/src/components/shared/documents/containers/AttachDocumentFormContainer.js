import React, { Component } from 'react';
import { connect } from 'react-redux';

import AttachDocumentForm from '../presentational/AttachDocumentForm';

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
        services: [],
        selectedServices: [],
        agreeanceEveryXDays: 0,
        // date selector
        startOn: undefined,
        endOn: undefined
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
    componentDidMount() {
        const { isFetching, services } = this.props;
        if (!isFetching) {
            this.setState({ services: this.getServicesForState(services) });
        }
    }
    componentDidUpdate(prevProps) {
        const { isFetching, services } = this.props;
        if (!isFetching && prevProps.isFetching) {
            this.setState({ services: this.getServicesForState(services) });
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

    handleMultiselect = ({ target: { name, value } }) => {
        const checkedValues = this.state[name];
        const newValues = checkedValues.includes(value)
            ? checkedValues.filter(val => val !== value)
            : [...checkedValues, value];

        this.setState({ [name]: newValues });
    };

    handleSubmit = e => {
        e.preventDefault();
        const { handleSubmit } = this.props;
        const {
            selectedServices,
            // eslint-disable-next-line no-unused-vars
            services,
            ...body
        } = this.state;
        const postBody = {
            ...body,
            serviceIDs: selectedServices
        };
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
