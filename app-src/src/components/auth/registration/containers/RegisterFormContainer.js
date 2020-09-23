import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import fetchTimeZones from 'actions/shared/time/async/fetchTimezones';
import fetchDateFormats from 'actions/shared/time/async/fetchDateFormats';
import postRegister from 'actions/shared/register/async/postRegister';
import postLogin from 'actions/shared/auth/async/postLogin';
import RegisterForm from '../presentational/RegisterForm';
import { sortTimezones } from 'helpers/generic';
import addFieldError from 'actions/shared/generic/fieldErrors/sync/addFieldError';
import removeFieldError from 'actions/shared/generic/fieldErrors/sync/removeFieldError';
import { vatOptions } from 'constants/shared/vatTypes';

class RegisterFormContainer extends Component {
    state = {
        'User.firstName': '',
        'User.lastName': '',
        'User.email': '',
        'User.password': '',
        'User.phoneNumber': '',
        confirmPassword: '',
        'Company.name': '',
        'Company.addressLine1': '',
        'Company.addressLine2': '',
        'Company.town': '',
        'Company.county': '',
        'Company.postcode ': '',
        'Company.phoneNumber ': '',
        'Company.fax ': '',
        'Company.vatCode': '',
        'Company.timezone': null,
        'Company.dateFormatID': null,
        'Company.vatType': null,
        'Company.country': '',
        terms: false,
    }; // <--- moved into new register form

    render() {
        const timezoneOptions = this._getTimezoneOptions(); // <--- moved into new register form

        const dateFormats = this._formatDateFormats(); // <--- moved into new register form

        return (
            <RegisterForm
                {...this.state}
                error={this.props.error}
                handleChange={this.handleChange}
                handleDropDown={this.handleDropDown}
                handleColourSelect={this.handleColourSelect}
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
    }; // <--- not needed as using useForm hook now

    _handleTimezoneChange = timezone => this.setState({ timezone }); //<--- not being used

    _handleDateFormatChange = (name, val) => {
        this.setState({ [name]: val });
    }; //<--- not being used

    handleDropDown = (name, val) => {
        this.setState({ [name]: val });
    }; //< --- moved into new reg file

    _handleVatTypeChange = vatType => this.setState({ vatType }); // <--- not being used

    handleColourSelect = ({ hex }) => this.setState({ 'Company.colourCode': hex });

    handleSubmit = e => {
        e.preventDefault();

        const {
            'User.email': email,
            'User.password': password,
            'User.firstName': firstName,
            'User.lastName': lastName,
            'User.phoneNumber': phoneNumber,
            'Company.name': name,
            'Company.addressLine1': addressLine1,
            'Company.addressLine2': addressLine2,
            'Company.town': town,
            'Company.county': county,
            'Company.postcode': postcode,
            'Company.country': country,
            'Company.phoneNumber': companyPhoneNumber,
            'Company.fax': fax,
            'Company.vatCode': vatCode,
            'Company.vatType': vatType,
            'Company.dateFormatID': dateFormatID,
            'Company.timezone': timezone,
        } = this.state;

        const postBody = {
            user: {
                firstName,
                lastName,
                email,
                phoneNumber,
                password,
            },
            company: {
                name,
                addressLine1,
                addressLine2,
                town,
                county,
                postcode,
                country,
                phoneNumber: companyPhoneNumber,
                fax,
                vatType,
                vatCode,
                dateFormatID,
                timezone,
            },
        };

        this.props.postRegister(postBody);
    };

    _getTimezoneOptions = () => {
        const { timezones } = this.props;
        return sortTimezones(timezones).map(({ id, name, offset }) => ({
            value: id,
            label: `${name} (${offset})`,
        }));
    }; // <-- moved into new register form

    _formatDateFormats = () =>
        this.props.dateFormats.map(({ id, example, momentDateTimeFormat }) => ({
            value: id,
            label: `${momentDateTimeFormat} (eg. ${example})`,
        })); //<-- moved into new register form

    componentDidMount = () => {
        const { fetchTimeZones, fetchDateFormats } = this.props;

        fetchTimeZones();
        fetchDateFormats();
    }; //<--- moved into new reg form

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
        loginReducer: { postSuccess: loginSuccess },
    },
}) => ({
    timezones: Object.values(timeZones) || [],
    dateFormats: Object.values(dateFormats) || [],
    error,
    postSuccess,
    loginSuccess,
});

const mapDispatchToProps = {
    fetchTimeZones,
    fetchDateFormats,
    postRegister,
    postLogin,
    addFieldError,
    removeFieldError,
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RegisterFormContainer));
