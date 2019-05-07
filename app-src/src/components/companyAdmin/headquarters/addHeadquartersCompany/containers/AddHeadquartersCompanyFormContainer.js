import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import AddHeadquartersCompanyForm from '../presentational/AddHeadquartersCompanyForm';
import { VAT_TYPES } from 'constants/companyAdmin/enums';
import createHeadquartersCompany from 'actions/companyAdmin/headquarters/async/createHeadquartersCompany';
import fetchTimezones from 'actions/shared/time/async/fetchTimezones';
import fetchDateFormats from 'actions/shared/time/async/fetchDateFormats';
import { sortTimezones } from 'helpers/generic';
import addFieldError from 'actions/shared/generic/fieldErrors/sync/addFieldError';
import removeFieldError from 'actions/shared/generic/fieldErrors/sync/removeFieldError';

class AddHeadquartersCompanyFormContainer extends Component {
    state = {
        'User.firstName': '',
        'User.lastName': '',
        'User.email': '',
        'User.password': '',
        confirmPassword: '',
        'Company.name': '',
        'Company.phoneNumber': '',
        'Company.addressLine1': '',
        'Company.town': '',
        'Company.postCode ': '',
        'Company.vatCode': '',
        'Company.timezone': 0,
        'Company.dateFormatID': 0,
        'Company.vatType': 0
    };
    render() {
        const timezoneOptions = this.formatTimezones();

        const dateFormats = this.formatDateFormats();

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
                handleDropDown={this.handleDropDown}
                handleSubmit={this.handleSubmit}
                dateFormats={dateFormats}
                timezoneOptions={timezoneOptions}
                validatePassword={this.validatePassword}
                validateConfirmPassword={this.validateConfirmPassword}
                handleChange={this.handleChange}
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
    handleChange = (name, value) => {
        this.setState({ [name]: value });
    };
    // change handlers
    handleUserChange = (name, value) => {
        const { user } = this.state;
        this.setState({ user: { ...user, [name]: value } });
    };

    handleCompanyChange = (name, value) => {
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
    handleDropDown = (name, val) => {
        this.setState({ [name]: val });
    };
    handleVatTypeChange = vatType => {
        const company = { ...this.state.company, vatType };
        this.setState({ company });
    };

    // submit handler
    handleSubmit = () => {
        const { createHeadquartersCompany } = this.props;

        const {
            'User.email': email,
            'User.password': password,
            'User.firstName': firstName,
            'User.lastName': lastName,
            //company name
            'Company.name': name,
            'Company.phoneNumber': phoneNumber,
            'Company.addressLine1': addressLine1,
            'Company.town': town,
            'Company.postcode': postcode,
            'Company.vatCode': vatCode,
            'Company.vatType': vatType,
            'Company.dateFormatID': dateFormatID,
            'Company.timezone': timezone
        } = this.state;

        const postBody = {
            user: {
                firstName: firstName,
                lastName: lastName,
                email: email,
                phoneNumber: phoneNumber,
                password: password
            },
            company: {
                name: name,
                addressLine1: addressLine1,
                town: town,
                postcode: postcode,
                vatType: vatType,
                vatCode: vatCode,
                dateFormatID: dateFormatID,
                timezone: timezone
            }
        };
        createHeadquartersCompany(postBody);
    };

    // utilities
    formatTimezones = () =>
        sortTimezones(this.props.timeZones).map(({ id, name, offset }) => ({
            value: id,
            label: `${name} (${offset})`
        }));

    formatDateFormats = () =>
        this.props.dateFormats.map(({ id, example, momentDateTimeFormat }) => ({
            value: id,
            label: `${momentDateTimeFormat} (eg. ${example})}`
        }));

    validatePassword = password => {
        const { confirmPassword } = this.state;
        const { addFieldError, removeFieldError } = this.props;
        if (password !== confirmPassword) {
            addFieldError('confirmPassword', 'Passwords do not match');
        } else {
            removeFieldError('confirmPassword');
        }
        return null;
    };
    validateConfirmPassword = confirmPassword => {
        const { 'User.password': password } = this.state;
        return password !== confirmPassword ? 'Passwords do not match' : null;
    };
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
    },
    addFieldError: (field, err) => dispatch(addFieldError(field, err)),
    removeFieldError: field => dispatch(removeFieldError(field))
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(AddHeadquartersCompanyFormContainer)
);
