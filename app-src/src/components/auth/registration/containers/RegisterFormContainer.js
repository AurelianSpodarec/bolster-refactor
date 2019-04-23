import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { VAT_TYPES } from 'constants/companyAdmin/enums';

import fetchTimeZones from 'actions/shared/time/async/fetchTimezones';
import fetchDateFormats from 'actions/shared/time/async/fetchDateFormats';
import postRegister from 'actions/shared/register/async/postRegister';
import RegisterForm from '../presentational/RegisterForm';

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
        'Company.postCode ': '',
        'Company.vatCode': '',
        'Company.timezone': 0,
        'Company.dateFormatID': 0,
        'Company.vatType': 0,
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
                handleInputChange={this.handleChange}
                timezoneOptions={timezoneOptions}
                handleTimezoneChange={this._handleTimezoneChange}
                handleDateFormatChange={this._handleDateFormatChange}
                handleVatTypeChange={this._handleVatTypeChange}
                dateFormats={dateFormats}
                vatOptions={vatOptions}
                handleSubmit={this.handleSubmit}
                handleDropDown={this.handleDropDown}
                validateConfirmPassword={this.validateConfirmPassword}
            />
        );
    }

    handleChange = ({ target: { type, value, checked, name } }) => {
        const val = type === 'checkbox' ? checked : value;
        this.setState({
            [name]: val
        });
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
                vatType: vatType,
                vatCode: vatCode,
                dateFormatID: dateFormatID,
                timezone: timezone
            }
        };

        this.props.postRegister(postBody);
    };

    _getTimezoneOptions = () => {
        const { timezones } = this.props;

        return timezones.map(({ id, name }) => ({
            value: id,
            label: name
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
        const { postSuccess, history } = this.props;

        // if (postSuccess && !prevProps.postSuccess) {
        //     authenticate().then(({ isSuperAdmin }) => {
        //         history.push(isSuperAdmin ? '/admin' : '/company');
        //     });
        // }
    };
    validateConfirmPassword = confirmPassword => {
        const { 'User.password': password } = this.state;

        return password !== confirmPassword ? 'Passwords do not match' : null;
    };
}

const mapStateToProps = ({
    shared: {
        timeReducer: { timeZones, dateFormats },
        registerReducer: { error }
    }
}) => ({
    timezones: Object.values(timeZones) || [],
    dateFormats: Object.values(dateFormats) || [],
    error
});

const mapDispatchToProps = dispatch => ({
    fetchTimeZones: () => {
        dispatch(fetchTimeZones());
    },
    fetchDateFormats: () => {
        dispatch(fetchDateFormats());
    },
    postRegister: postBody => {
        dispatch(postRegister(postBody));
    }
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(RegisterFormContainer)
);
