import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import AddHeadquartersCompanyForm from '../presentational/AddHeadquartersCompanyForm';
import { VAT_TYPES } from 'constants/companyAdmin/enums';
import createHeadquartersCompany from 'actions/companyAdmin/headquarters/async/createHeadquartersCompany';
import fetchTimezones from 'actions/shared/time/async/fetchTimezones';
import fetchDateFormats from 'actions/shared/time/async/fetchDateFormats';

class AddHeadquartersCompanyFormContainer extends Component {
    state = {
        user: {
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
            password: '',
            confirmPassword: ''
        },
        company: {
            name: '',
            addressLine1: '',
            town: '',
            postcode: '',
            vatCode: '',
            vatType: { label: 'GB', value: VAT_TYPES.GB },
            timezone: {
                label:
                    'Europe/London - (UTC+00:00) Dublin, Edinburgh, Lisbon, London)',
                value: 'Europe/London'
            },
            dateFormat: { label: 'DD/MM/YYYY HH: mm', value: 1 }
        }
    };
    render() {
        const vatOptions = [
            { label: 'GB', value: VAT_TYPES.GB },
            { label: 'EU', value: VAT_TYPES.EU },
            { label: 'Outside EU', value: VAT_TYPES.OUTSIDEEU }
        ];
        return (
            <AddHeadquartersCompanyForm
                {...this.state}
                vatOptions={vatOptions}
                handleUserChange={this.handleUserChange}
                handleCompanyChange={this.handleCompanyChange}
                handleVatTypeChange={this.handleVatTypeChange}
                handleDateFormatChange={this.handleDateFormatChange}
                handleTimezoneChange={this.handleTimezoneChange}
                handleSubmit={this.handleSubmit}
                dateFormats={this.formatDateFormats()}
                timeZones={this.formatTimezones()}
                validateConfirmPassword={this.validateConfirmPassword}
            />
        );
    }
    // lifecycle methods
    componentDidMount = () => {
        const { fetchDateTimeData } = this.props;
        fetchDateTimeData();
    };

    componentDidUpdate = prevProps => {
        const { postSuccess, history } = this.props;
        if (postSuccess && !prevProps.postSuccess) {
            history.push('/company/headquarters/companies');
        }
    };

    // change handlers
    handleUserChange = ({ target: { name, value } }) => {
        const { user } = this.state;
        this.setState({ user: { ...user, [name]: value } });
    };

    handleCompanyChange = ({ target: { name, value } }) => {
        const { company } = this.state;
        this.setState({ company: { ...company, [name]: value } });
    };

    handleDateFormatChange = dateFormat => {
        const company = { ...this.state.company, dateFormat };
        this.setState({ company });
    };

    handleTimezoneChange = timezone => {
        const company = { ...this.state.company, timezone };
        this.setState({ company });
    };

    handleVatTypeChange = vatType => {
        const company = { ...this.state.company, vatType };
        this.setState({ company });
    };

    // submit handler
    handleSubmit = () => {
        const { createHeadquartersCompany } = this.props;
        const {
            // eslint-disable-next-line no-unused-vars
            user: { confirmPassword, ...user },
            company: {
                vatType: { value: vatType },
                timezone: { value: timezone },
                dateFormat: { value: dateFormatID },
                ...company
            }
        } = this.state;
        const postBody = {
            user,
            company: { ...company, vatType, timezone, dateFormatID }
        };
        createHeadquartersCompany(postBody);
    };

    // utilities
    formatTimezones = () =>
        this.props.timeZones.map(({ id, name, offset }) => ({
            value: id,
            label: `${name} - ${offset}`
        }));

    formatDateFormats = () =>
        this.props.dateFormats.map(({ id, example, momentDateTimeFormat }) => ({
            value: id,
            label: `${momentDateTimeFormat} (eg. ${example})}`
        }));

    validateConfirmPassword = confirmPassword =>
        this.state.user.password !== confirmPassword
            ? 'Passwords do not match'
            : null;
}

const mapStateToProps = ({
    companyAdmin: {
        headquartersReducer: { postSuccess }
    },
    shared: {
        timeReducer: { dateFormats, timeZones }
    }
}) => ({
    dateFormats: Object.values(dateFormats),
    timeZones: Object.values(timeZones),
    postSuccess
});

const mapDispatchToProps = dispatch => ({
    createHeadquartersCompany: postBody =>
        dispatch(createHeadquartersCompany(postBody)),
    fetchDateTimeData: () => {
        dispatch(fetchTimezones());
        dispatch(fetchDateFormats());
    }
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(AddHeadquartersCompanyFormContainer)
);
