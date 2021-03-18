import React, { useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { usePrevious } from 'helpers/hooks';

import editCompanyUserPassword from 'actions/companyAdmin/userManagement/async/editCompanyUserPassword';

import EditCompanyUserPassword from '../presentational/EditCompanyUserPasswordForm';

const EditCompanyUserPasswordContainer = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const { id } = useParams();

    const { postSuccess } = useSelector(mapStateToProps);
    const [state, setState] = useState({ password: '', confirmPassword: '' });
    const prevProps = usePrevious({ postSuccess });

    useEffect(() => {
        if (postSuccess && !prevProps.postSuccess) {
            history.push(location.pathname.replace(`/${id}/edit-password`, ''));
        }
    }, [postSuccess]);

    return (
        <EditCompanyUserPassword
            {...state}
            handleInputChange={handleInputChange}
            validateConfirmPassword={validateConfirmPassword}
            handleSubmit={handleSubmit}
        />
    );

    function handleInputChange(name, value) {
        setState({ ...state, [name]: value });
    }

    function handleSubmit(e) {
        e.preventDefault();
        const { password } = state;
        dispatch(editCompanyUserPassword(id, { password }));
    }

    function validateConfirmPassword(confirmPassword) {
        const { password } = state;
        if (password !== confirmPassword) {
            return 'Password and Confirm Password do not match';
        }
    }
};

const mapStateToProps = ({ companyAdmin: { companyUsersReducer } }) => ({
    postSuccess: companyUsersReducer.postSuccess,
});

export default EditCompanyUserPasswordContainer;
