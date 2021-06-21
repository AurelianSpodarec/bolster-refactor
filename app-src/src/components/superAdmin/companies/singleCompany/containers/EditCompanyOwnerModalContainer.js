import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { usePrevious } from 'helpers/hooks';

import { SUCCESS_MODAL, ERROR_MODAL } from 'constants/shared/modalTypes';
import EditCompanyOwnerModal from '../presentational/EditCompanyOwnerModal';
import adminEditCompanyOwner from 'actions/superAdmin/users/async/adminEditCompanyOwner';

const EditCompanyOwnerModalContainer = ({
    hideModal,
    showModal,
    companyAdmins,
    postSuccess,
    error,
}) => {
    const [form, handleFormChange] = useState({
        companyUserID: '',
    });

    const userDropdownOptions = Object.values(companyAdmins).map(user => {
        return {
            label: `${user.userFirstName} ${user.userLastName}`,
            value: user.id,
        };
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
        <EditCompanyOwnerModal
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            form={form}
            hideModal={hideModal}
            userOptions={userDropdownOptions}
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
        usersReducer: { companyAdmins, postSuccess, error },
    },
}) => ({ companyAdmins, postSuccess, error });

const mapDispatchToProps = { adminEditCompanyOwner };

export default connect(mapStateToProps, mapDispatchToProps)(EditCompanyOwnerModalContainer);
