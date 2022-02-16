import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { componentDidMount } from 'helpers/generic';
import { usePrevious } from 'helpers/hooks';

import CreateCompanyAdminForm from '../presentational/CreateCompanyAdminForm';
import createCompanyUser from 'actions/companyAdmin/userManagement/async/createCompanyUser';

import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import { ERROR_MODAL, SUCCESS_MODAL } from 'constants/shared/modalTypes';
import { COMPANY_USER_ROLE_TYPES } from 'constants/companyAdmin/enums';

const CreateCompanyAdminFormContainer = () => {
    const dispatch = useDispatch();
    const { isPosting, postSuccess, error, companyUserID, users } = useSelector(mapStateToProps);
    const prevProps = usePrevious({ postSuccess, error, users });
    const [state, setState] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        shouldRestrictPayments: false,
        shouldRestrictPaymentsAccess: true,
    });

    componentDidMount(() => {
        if (users && users[companyUserID]) {
            setState({
                ...state,
                shouldRestrictPaymentsAccess: !users[companyUserID].shouldRestrictPayments,
            });
        }
    });

    useEffect(() => {
        if (postSuccess && !prevProps.postSuccess) {
            dispatch(
                showModal(SUCCESS_MODAL, {
                    hideModal: () => dispatch(hideModal()),
                    message: 'Admin added successfully.',
                }),
            );
        }
        if (error && !prevProps.error) {
            dispatch(
                showModal(ERROR_MODAL, {
                    hideModal: () => dispatch(hideModal()),
                    title: 'Error',
                    message:
                        error.message ||
                        'There was an error processing your request, please try again later.',
                }),
            );
        }

        if (users && users[companyUserID] && !prevProps.users[companyUserID]) {
            setState({
                ...state,
                shouldRestrictPaymentsAccess: !users[companyUserID].shouldRestrictPayments,
            });
        }
    }, [postSuccess, error, users]);

    return (
        <CreateCompanyAdminForm
            {...state}
            hideModal={() => dispatch(hideModal())}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            isPosting={isPosting}
        />
    );

    function handleInputChange(name, value) {
        setState({ ...state, [name]: value });
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (isPosting) return;
        const { confirmPassword, shouldRestrictPaymentsAccess, ...rest } = state;

        const postBody = {
            ...rest,
            type: COMPANY_USER_ROLE_TYPES.ADMIN,
        };
        dispatch(createCompanyUser(postBody));
    }
};

const mapStateToProps = ({
    companyAdmin: {
        companyUsersReducer: { isPosting, postSuccess, error, users },
    },
    shared: {
        decodeJWTReducer: {
            jwtData: { companyUserID },
        },
    },
}) => ({
    isPosting,
    postSuccess,
    error,
    companyUserID,
    users,
});

export default CreateCompanyAdminFormContainer;
