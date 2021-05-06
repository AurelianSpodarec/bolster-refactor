import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import { usePrevious } from 'helpers/hooks';

import { SUCCESS_MODAL, ERROR_MODAL } from 'constants/shared/modalTypes';
import EditCompanyOwnerModal from '../presentational/EditCompanyOwnerModal';
import adminEditCompanyOwner from 'actions/superAdmin/users/async/adminEditCompanyOwner';

const EditCompanyOwnerModalContainer = ({
    hideModal,
    showModal,
    users,
    postSuccess,
    error,
    adminEditCompanyOwner,
}) => {
    const history = useHistory();

    const [form, handleFormChange] = useState({
        companyUserID: '',
    });
    const userDropdownOptions = formatDropdownOptions(users);

    const prevProps = usePrevious({ postSuccess, error });

    useEffect(() => {
        console.log({ postSuccess });
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

    function formatDropdownOptions(users) {
        return users.map(user => {
            return {
                label: `${user.userFirstName} ${user.userLastName}`,
                value: user.id,
            };
        });
    }
};

const mapStateToProps = ({
    superAdmin: {
        usersReducer: { users, postSuccess, error },
    },
}) => ({ users: Object.values(users), postSuccess, error });

const mapDispatchToProps = { adminEditCompanyOwner };

export default connect(mapStateToProps, mapDispatchToProps)(EditCompanyOwnerModalContainer);
