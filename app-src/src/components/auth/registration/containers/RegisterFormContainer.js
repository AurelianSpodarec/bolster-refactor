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
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        //company name
        name: '',
        telephone: '',
        addressLine1: '',
        town: '',
        postcode: '',
        vatType: { label: 'GB', value: VAT_TYPES.GB },
        vatCode: '',
        timezone: { value: '', label: '' },
        dateFormat: { value: '', label: '' },
        terms: false
    };

    render() {
        const { timezone } = this.state;

        const timezoneOptions = this._getTimezoneOptions();
        const selectedTimezone = timezoneOptions.find(
            ({ value }) => value === timezone
        );
        const dateFormats = this._formatDateFormats();
        const vatOptions = [
            { label: 'GB', value: VAT_TYPES.GB },
            { label: 'EU', value: VAT_TYPES.EU },
            { label: 'Outside EU', value: VAT_TYPES.OUTSIDEEU }
        ];

        return (
            <RegisterForm
                {...this.state}
                handleInputChange={this.handleInputChange}
                timezoneOptions={timezoneOptions}
                handleTimezoneChange={this._handleTimezoneChange}
                handleDateFormatChange={this._handleDateFormatChange}
                handleVatTypeChange={this._handleVatTypeChange}
                handleCheckboxChange={this.handleCheckboxChange}
                dateFormats={dateFormats}
                vatOptions={vatOptions}
                handleSubmit={this.handleSubmit}
            />
        );
    }

    handleInputChange = e => {
        e.preventDefault();

        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleCheckboxChange = e => {
        const { name } = e.target;
        this.setState(prevState => ({
            [name]: !prevState[name]
        }));
    };
    _handleTimezoneChange = timezone => this.setState({ timezone });

    _handleDateFormatChange = dateFormat => this.setState({ dateFormat });

    _handleVatTypeChange = vatType => this.setState({ vatType });

    handleSubmit = e => {
        e.preventDefault();

        const {
            firstName,
            lastName,
            email,
            password,
            //company name
            name,
            telephone,
            addressLine1,
            town,
            postcode,
            vatType,
            vatCode,
            timezone,
            dateFormat
        } = this.state;

        const postBody = {
            user: {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password
            },
            company: {
                name: name,
                telephone: telephone,
                addressLine1,
                town,
                postcode,
                dateFormatID: `${dateFormat.value}`,
                timezone: timezone.value,
                addressLine1: addressLine1,
                town: town,
                postcode: postcode,
                vatType: vatType.value,
                vatCode: vatCode
            }
        };
        console.log(postBody);
        this.props.postRegister(postBody);
    };

    _getTimezoneOptions = () => {
        const { timeZones } = this.props;

        return timeZones.map(({ id, name }) => ({
            value: id,
            label: name
        }));
    };

    _formatDateFormats = () =>
        this.props.dateFormats.map(({ id, example, momentDateTimeFormat }) => ({
            value: id,
            label: `${momentDateTimeFormat} (eg. ${example})}`
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
}

const mapStateToProps = ({
    shared: {
        timeReducer: { timeZones, dateFormats }
    }
}) => ({
    timeZones: Object.values(timeZones),
    dateFormats: Object.values(dateFormats)
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
