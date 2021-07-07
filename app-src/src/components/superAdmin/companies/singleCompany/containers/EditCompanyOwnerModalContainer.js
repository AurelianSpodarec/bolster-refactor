import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { usePrevious } from 'helpers/hooks';

import { SUCCESS_MODAL, ERROR_MODAL } from 'constants/shared/modalTypes';
import EditCompanyOwnerModal from '../presentational/EditCompanyOwnerModal';
import adminEditCompanyOwner from 'actions/superAdmin/users/async/adminEditCompanyOwner';
import fetchCompanyAdminUsers from 'actions/superAdmin/users/async/fetchCompanyAdminUsers';

const EditCompanyOwnerModalContainer = ({
    hideModal,
    showModal,
    companyAdmins,
    postSuccess,
    error,
    adminEditCompanyOwner,
    isPosting,
    fetchCompanyAdminUsers,
    companyID,
}) => {
    const [form, handleFormChange] = useState({
        companyUserID: '',
    });

    const userDropdownOptions = Object.values(companyAdmins).map(user => {
        return {
            label: `${user.userFirstName} ${user.userLastName} - ${user.userEmail}`,
            value: user.id,
        };
    });

    const prevProps = usePrevious({ postSuccess, error });

    useEffect(() => {
        if (!prevProps.postSuccess && postSuccess) {
            fetchCompanyAdminUsers(companyID);
            handleSuccess();
        } else if (!prevProps.error && error) {
            handleError();
        }
    }, [postSuccess, error]);

    return (
        <EditCompanyOwnerModal
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            form={form}
            hideModal={hideModal}
            userOptions={userDropdownOptions}
            isPosting={isPosting}
        />
    );

    function handleChange(name, value) {
        handleFormChange({
            ...form,
            [name]: value,
        });
    }

    function handleSubmit() {
        adminEditCompanyOwner(form.companyUserID);
    }

    function handleSuccess() {
        showModal(SUCCESS_MODAL, { message: 'Successfully changed the owner of this company.' });
    }

    function handleError() {
        showModal(ERROR_MODAL, {
            message: 'Something went wrong adding this owner, please try again.',
        });
    }
};

const mapStateToProps = ({
    superAdmin: {
        usersReducer: { companyAdmins, postSuccess, error, isPosting },
    },
}) => ({ companyAdmins, postSuccess, error, isPosting });

const mapDispatchToProps = { adminEditCompanyOwner, fetchCompanyAdminUsers };

export default connect(mapStateToProps, mapDispatchToProps)(EditCompanyOwnerModalContainer);
