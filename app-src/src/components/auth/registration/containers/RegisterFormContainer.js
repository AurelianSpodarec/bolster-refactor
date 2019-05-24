import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { VAT_TYPES } from 'constants/companyAdmin/enums';

import fetchTimeZones from 'actions/shared/time/async/fetchTimezones';
import fetchDateFormats from 'actions/shared/time/async/fetchDateFormats';
import postRegister from 'actions/shared/register/async/postRegister';
import postLogin from 'actions/shared/auth/async/postLogin';
import RegisterForm from '../presentational/RegisterForm';
import { sortTimezones } from 'helpers/generic';
import addFieldError from 'actions/shared/generic/fieldErrors/sync/addFieldError';
import removeFieldError from 'actions/shared/generic/fieldErrors/sync/removeFieldError';

class RegisterFormContainer extends Component {
    state = {
        'User.firstName': '',
        'User.lastName': '',
        'User.email': '',
        'User.password': '',
        confirmPassword: '',
        //company name
        'Company.name': '',
        'Company.phoneNumber': '',
        'Company.addressLine1': '',
        'Company.town': '',
        'Company.postcode ': '',
        'Company.vatCode': '',
        'Company.timezone': null,
        'Company.dateFormatID': null,
        'Company.vatType': null,
        terms: false
    };

    render() {
        const timezoneOptions = this._getTimezoneOptions();

        const dateFormats = this._formatDateFormats();
        const vatOptions = [
            { label: 'GB', value: VAT_TYPES.GB },
            { label: 'EU', value: VAT_TYPES.EU },
            { label: 'Outside EU', value: VAT_TYPES.OUTSIDEEU }
        ];

        return (
            <RegisterForm
                {...this.state}
                error={this.props.error}
                handleChange={this.handleChange}
                handleDropDown={this.handleDropDown}
                timezoneOptions={timezoneOptions}
                dateFormats={dateFormats}
                vatOptions={vatOptions}
                handleSubmit={this.handleSubmit}
                validatePassword={this.validatePassword}
                validateConfirmPassword={this.validateConfirmPassword}
            />
        );
    }

    handleChange = (name, value) => {
        this.setState({ [name]: value });
    };

    _handleTimezoneChange = timezone => this.setState({ timezone });

    _handleDateFormatChange = (name, val) => {
        this.setState({ [name]: val });
    };

    handleDropDown = (name, val) => {
        this.setState({ [name]: val });
    };

    _handleVatTypeChange = vatType => this.setState({ vatType });

    handleSubmit = e => {
        e.preventDefault();

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
                vatType: vatType.value,
                vatCode: vatCode,
                dateFormatID: dateFormatID.value,
                timezone: timezone.value
            }
        };

        this.props.postRegister(postBody);
    };

    _getTimezoneOptions = () => {
        const { timezones } = this.props;
        return sortTimezones(timezones).map(({ id, name, offset }) => ({
            value: id,
            label: `${name} (${offset})`
        }));
    };

    _formatDateFormats = () =>
        this.props.dateFormats.map(({ id, example, momentDateTimeFormat }) => ({
            value: id,
            label: `${momentDateTimeFormat} (eg. ${example})`
        }));

    componentDidMount = () => {
        const { fetchTimeZones, fetchDateFormats } = this.props;

        fetchTimeZones();
        fetchDateFormats();
    };
    componentDidUpdate = prevProps => {
        const { 'User.email': email, 'User.password': password } = this.state;
        const { postSuccess, loginSuccess, history, postLogin } = this.props;

        if (postSuccess && !prevProps.postSuccess) {
            postLogin(email, password);
        }

        if (loginSuccess && !prevProps.loginSuccess) {
            history.push('/company');
        }
    };

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
        const { removeFieldError } = this.props;

        return password !== confirmPassword
            ? 'Passwords do not match'
            : removeFieldError('confirmPassword');
    };
}

const mapStateToProps = ({
    shared: {
        timeReducer: { timeZones, dateFormats },
        registerReducer: { error, postSuccess },
        loginReducer: { postSuccess: loginSuccess }
    }
}) => ({
    timezones: Object.values(timeZones) || [],
    dateFormats: Object.values(dateFormats) || [],
    error,
    postSuccess,
    loginSuccess
});

const mapDispatchToProps = dispatch => ({
    fetchTimeZones: () => dispatch(fetchTimeZones()),
    fetchDateFormats: () => dispatch(fetchDateFormats()),
    postRegister: postBody => dispatch(postRegister(postBody)),
    postLogin: (email, password) => dispatch(postLogin(email, password)),
    addFieldError: (field, err) => dispatch(addFieldError(field, err)),
    removeFieldError: field => dispatch(removeFieldError(field))
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(RegisterFormContainer)
);
