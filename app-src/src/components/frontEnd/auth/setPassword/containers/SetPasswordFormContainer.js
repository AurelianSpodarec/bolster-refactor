import { logout } from 'actions/shared/auth/sync/logout';
import addFieldError from 'actions/shared/generic/fieldErrors/sync/addFieldError';
import removeFieldError from 'actions/shared/generic/fieldErrors/sync/removeFieldError';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import changeProfilePassword from 'actions/shared/profile/async/changeProfilePassword';
import { ERROR_MODAL } from 'constants/shared/modalTypes';
import { useForm, usePrevious } from 'helpers/hooks';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import SetPasswordForm from '../presentational/SetPasswordForm';

const SetPasswordFormContainer = () => {
    const history = useHistory();
    const [formData, handleChange] = useForm({ password: '', confirmPassword: '' });
    const dispatch = useDispatch();
    const { postSuccess, isPosting, error } = useSelector(mapStateToProps);
    const prevProps = usePrevious({ postSuccess, isPosting });

    useEffect(() => {
        if (postSuccess && !prevProps.postSuccess) {
            onSuccess();
        }

        if (prevProps.isPosting && !isPosting && error) {
            dispatch(
                showModal(ERROR_MODAL, {
                    message: 'There was an error with your request. Please try again.',
                }),
            );
        }
    }, [postSuccess, prevProps.postSuccess, isPosting, prevProps.isPosting]);

    useEffect(() => {
        const { password, confirmPassword } = formData;
        if (password !== confirmPassword) {
            dispatch(addFieldError('confirmPassword', 'Passwords do not match'));
        } else {
            dispatch(removeFieldError('confirmPassword'));
        }
    }, [formData]);

    return (
        <SetPasswordForm
            handleSubmit={handleSubmit}
            formData={formData}
            handleChange={handleChange}
            isPosting={isPosting}
            postSuccess={postSuccess}
        />
    );

    function handleSubmit(e) {
        e.preventDefault();
        const { password } = formData;
        dispatch(changeProfilePassword({ password }));
    }

    async function onSuccess() {
        history.replace('/auth/operative/invitation-accepted');
        // log user out and display message
        dispatch(logout());
    }
};

const mapStateToProps = ({
    shared: {
        profileReducer: { postSuccess, isPosting, error },
    },
    frontEnd: {
        authReducer: { auth },
    },
}) => ({ postSuccess, auth, error, isPosting });

export default SetPasswordFormContainer;
