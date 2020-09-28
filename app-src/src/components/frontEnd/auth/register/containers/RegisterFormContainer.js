import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { useForm, usePrevious } from 'helpers/hooks';
import { isEmpty, sortTimezones } from 'helpers/generic';
import RegisterForm from '../presentational/RegisterForm';
import postRegister from 'actions/shared/register/async/postRegister';
import fetchTimeZones from 'actions/shared/time/async/fetchTimezones';
import fetchDateFormats from 'actions/shared/time/async/fetchDateFormats';
import postLogin from 'actions/shared/auth/async/postLogin';
import addFieldError from 'actions/shared/generic/fieldErrors/sync/addFieldError';
import removeFieldError from 'actions/shared/generic/fieldErrors/sync/removeFieldError';
import { vatOptions } from 'constants/shared/vatTypes';
import registerPages from 'constants/frontEnd/registerPages';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { ERROR_MODAL } from 'constants/shared/modalTypes';

const RegisterFormContainer = ({
    timezones,
    postRegister,
    fetchTimeZones,
    fetchDateFormats,
    postSuccess,
    loginSuccess,
    history,
    postLogin,
    addFieldError,
    removeFieldError,
    dateFormats,
    fieldErrors,
    isPosting,
    error,
    showModal,
}) => {
    const [page, setPage] = useState(1);
    const [nextDisabled, setNextDisabled] = useState(true);
    const [formData, handleChange] = useForm({
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
        'Company.postcode': '',
        'Company.phoneNumber': '',
        'Company.fax': '',
        'Company.vatCode': '',
        'Company.timezone': null,
        'Company.dateFormatID': null,
        'Company.vatType': null,
        'Company.country': '',
        terms: false,
    });
    const [tickboxError, setTickboxError] = useState(false);

    const prevProps = usePrevious({ postSuccess, loginSuccess, fieldErrors, isPosting });

    useEffect(() => {
        fetchTimeZones();
        fetchDateFormats();
    }, []);

    useEffect(() => {
        const { 'User.email': email, 'User.password': password } = formData;

        if (postSuccess && !prevProps.postSuccess) {
            postLogin(email, password);
        }

        if (loginSuccess && !prevProps.loginSuccess) {
            history.push('/company');
        }

        if (prevProps.isPosting && !isPosting && error) {
            showModal(ERROR_MODAL, {
                message: 'There was an error with your request. Please try again.',
            });
        }
    }, [
        loginSuccess,
        postSuccess,
        prevProps.loginSuccess,
        prevProps.postSuccess,
        isPosting,
        prevProps.isPosting,
    ]);

    useEffect(() => {
        if (isEmpty(prevProps.fieldErrors) && !isEmpty(fieldErrors)) {
            checkSubmissionValidation();
            checkTickboxValidation();
        }
        if (!isEmpty(prevProps.fieldErrors) && isEmpty(fieldErrors)) {
            checkTickboxValidation();
        }
    }, [fieldErrors, prevProps.fieldErrors]);

    const timezoneOptions = _getTimezoneOptions();

    const dateFormatOptions = _formatDateFormats();

    checkPageValidation();

    return (
        <RegisterForm
            {...formData}
            activePage={page}
            handleChange={handleChange}
            handlePaginationClick={handlePaginationClick}
            handleDropDown={handleDropDown}
            handleColourSelect={handleColourSelect}
            handleSubmit={handleSubmit}
            validatePassword={validatePassword}
            validateConfirmPassword={validateConfirmPassword}
            timezoneOptions={timezoneOptions}
            dateFormats={dateFormatOptions}
            vatOptions={vatOptions}
            isPosting={isPosting}
            nextDisabled={nextDisabled}
            tickboxError={tickboxError}
        />
    );

    function _getTimezoneOptions() {
        return sortTimezones(timezones).map(({ id, name, offset }) => ({
            value: id,
            label: `${name} (${offset})`,
        }));
    }

    function _formatDateFormats() {
        return dateFormats.map(({ id, example, momentDateTimeFormat }) => ({
            value: id,
            label: `${momentDateTimeFormat} (eg. ${example})`,
        }));
    }

    function handleDropDown(name, val) {
        handleChange({ [name]: val });
    }

    function handlePaginationClick(pageNumber) {
        setPage(pageNumber);
    }

    function handleColourSelect({ hex }) {
        handleChange({ 'Company.colourCode': hex });
    }

    function handleSubmit(e) {
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
        } = formData;

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

        postRegister(postBody);
    }

    function validatePassword(password) {
        const { confirmPassword } = formData;
        if (password !== confirmPassword) {
            addFieldError('confirmPassword', 'Passwords do not match');
        } else {
            removeFieldError('confirmPassword');
        }
        return null;
    }

    function validateConfirmPassword(confirmPassword) {
        const { 'User.password': password } = formData;

        return password !== confirmPassword
            ? 'Passwords do not match'
            : removeFieldError('confirmPassword');
    }

    function checkPageValidation() {
        const errors = Object.keys(fieldErrors);
        const curPage = registerPages[page - 1];
        const errorExists = errors.some(err => curPage.indexOf(err) >= 0);

        if (errorExists && !nextDisabled) {
            setNextDisabled(true);
            return;
        }

        if (!errorExists && nextDisabled) {
            setNextDisabled(false);
        }
    }

    function checkSubmissionValidation() {
        let goToPage = null;
        const errors = Object.keys(fieldErrors);

        for (let i = 0; i < registerPages.length; i++) {
            const page = registerPages[i];
            const errorExists = errors.some(err => page.indexOf(err) >= 0);

            if (errorExists) {
                goToPage = i + 1;
                break;
            }
        }

        handlePaginationClick(goToPage || 1);
    }

    function checkTickboxValidation() {
        const errors = Object.keys(fieldErrors);

        if (errors[0] === 'terms') {
            return setTickboxError(true);
        }
        setTickboxError(false);
    }
};

const mapStateToProps = ({
    shared: {
        timeReducer: { timeZones, dateFormats },
        registerReducer: { error, postSuccess, isPosting },
        loginReducer: { postSuccess: loginSuccess },
        fieldErrorsReducer: { fieldErrors },
    },
}) => ({
    timezones: Object.values(timeZones) || [],
    dateFormats: Object.values(dateFormats) || [],
    error,
    postSuccess,
    loginSuccess,
    fieldErrors,
    isPosting,
});

const mapDispatchToProps = {
    fetchTimeZones,
    fetchDateFormats,
    postRegister,
    postLogin,
    addFieldError,
    removeFieldError,
    showModal,
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RegisterFormContainer));
