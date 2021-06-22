import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import createCompanyUser from 'actions/companyAdmin/userManagement/async/createCompanyUser';
import CreateOperativeForm from '../presentational/CreateOperativeForm';

import { COMPANY_USER_ROLE_TYPES } from 'constants/companyAdmin/enums';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import { usePrevious } from 'helpers/hooks';

const CreateOperativeFormContainer = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { postSuccess } = useSelector(mapStateToProps);
    const prevProps = usePrevious({ postSuccess });

    const [state, setState] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
    });

    useEffect(() => {
        if (postSuccess && !prevProps.postSuccess) {
            history.push('/company/users-management/operatives');
        }
    }, [postSuccess]);

    return (
        <CreateOperativeForm
            {...state}
            hideModal={() => dispatch(hideModal())}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
        />
    );

    function handleInputChange(name, value) {
        setState({ ...state, [name]: value });
    }

    function handleSubmit(e) {
        e.preventDefault();
        const { phoneNumber, ...rest } = state;
        const postBody = {
            ...rest,
            type: COMPANY_USER_ROLE_TYPES.OPERATIVE,
        };
        if (phoneNumber) postBody.phoneNumber = phoneNumber;

        dispatch(createCompanyUser(postBody));
    }
};

const mapStateToProps = ({
    companyAdmin: {
        companyUsersReducer: { postSuccess },
    },
}) => ({
    postSuccess,
});

export default CreateOperativeFormContainer;
