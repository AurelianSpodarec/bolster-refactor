import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import EditProfilePasswordForm from 'components/shared/profile/editProfilePassword/presentational/EditProfilePasswordForm';
import addFieldError from 'actions/shared/generic/fieldErrors/sync/addFieldError';
import removeFieldError from 'actions/shared/generic/fieldErrors/sync/removeFieldError';
import changeProfilePassword from 'actions/shared/profile/async/changeProfilePassword';
import { useForm, usePrevious } from 'helpers/hooks';

const EditProfilePasswordFormContainer = () => {
    const [{ password, confirmPassword }, handleChange] = useForm({
        password: '',
        confirmPassword: '',
    });
    const history = useHistory();
    const location = useLocation();
    const dispatch = useDispatch();

    const isClient = location.pathname.includes('client');
    const { postSuccess } = useSelector(mapStateToProps);
    const prevProps = usePrevious({ postSuccess });

    useEffect(() => {
        if (postSuccess && !prevProps.postSuccess) {
            history.push(location.pathname.replace('/change-password', ''));
        }
    });
    return (
        <EditProfilePasswordForm
            password={password}
            confirmPassword={confirmPassword}
            isClient={isClient}
            handleInputChange={handleChange}
            validatePassword={validatePassword}
            validateConfirmPassword={validateConfirmPassword}
            handleSubmit={handleSubmit}
        />
    );

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(changeProfilePassword({ password }));
    }

    function validatePassword(password) {
        if (password !== confirmPassword) {
            dispatch(addFieldError('confirmPassword', 'Passwords do not match'));
        } else {
            dispatch(removeFieldError('confirmPassword'));
        }
        return null;
    }

    function validateConfirmPassword(confirmPassword) {
        if (password !== confirmPassword) {
            return 'Password and Confirm Password do not match';
        }
    }
};

const mapStateToProps = ({ shared: { profileReducer } }) => ({
    postSuccess: profileReducer.postSuccess,
});

export default EditProfilePasswordFormContainer;
