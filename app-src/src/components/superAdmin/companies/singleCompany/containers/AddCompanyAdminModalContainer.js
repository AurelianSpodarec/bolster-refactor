import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import AddCompanyAdminModal from '../presentational/AddCompanyAdminModal';
import adminCreateCompanyAdmin from 'actions/superAdmin/users/async/adminCreateCompanyAdmin';
import { usePrevious } from 'helpers/hooks';
import { SUCCESS_MODAL, ERROR_MODAL } from 'constants/shared/modalTypes';

const AddCompanyAdminModalContainer = ({
    companyID,
    hideModal,
    showModal,
    adminCreateCompanyAdmin,
    postSuccess,
    error,
}) => {
    const [form, handleFormChange] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        password: '',
        shouldRestrictPayments: false,
    });
    const prevProps = usePrevious({ postSuccess, error });
    useEffect(() => {
        if (!prevProps.postSuccess && postSuccess) {
            handleSuccess();
        } else if (!prevProps.error && error) {
            handleError();
        }
    }, [postSuccess, error]);
    return (
        <AddCompanyAdminModal
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            form={form}
            hideModal={hideModal}
        />
    );

    function handleChange(name, value) {
        handleFormChange({
            ...form,
            [name]: value,
        });
    }
    function handleSubmit() {
        const postBody = {
            companyID,
            ...form,
        };
        adminCreateCompanyAdmin(postBody);
    }
    function handleSuccess() {
        showModal(SUCCESS_MODAL, { message: 'Successfully added new admin to this company.' });
    }
    function handleError() {
        showModal(ERROR_MODAL, {
            message: 'Something went wrong adding this admin, please try again.',
        });
    }
};

const mapStateToProps = ({
    superAdmin: {
        usersReducer: { postSuccess, error },
    },
}) => ({ postSuccess, error });

const mapDispatchToProps = { adminCreateCompanyAdmin };

export default connect(mapStateToProps, mapDispatchToProps)(AddCompanyAdminModalContainer);
