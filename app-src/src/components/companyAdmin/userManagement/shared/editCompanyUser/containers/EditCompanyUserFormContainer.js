import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router-dom';

import editCompanyUser from 'actions/companyAdmin/userManagement/async/editCompanyUser';
import EditCompanyUserForm from '../presentational/EditCompanyUserForm';
import { componentDidMount } from 'helpers/generic';
import { usePrevious } from 'helpers/hooks';
import { COMPANY_USER_ROLE_TYPES } from '../../../../../../constants/companyAdmin/enums';

const EditCompanyUserFormContainer = () => {
    const [state, setState] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        shouldHaveAdminPlus: false,
    });
    const dispatch = useDispatch();

    const { id } = useParams();
    const { users, postSuccess, isFetching, companyUserID } = useSelector(state =>
        stateSelector(state),
    );
    const user = users[id];
    const prevProps = usePrevious({ isFetching, postSuccess, user });
    const curUser = users && users[companyUserID] ? users[companyUserID] : {};

    componentDidMount(() => {
        if (!isFetching && user)
            setState({
                firstName: user.userFirstName,
                lastName: user.userLastName,
                phoneNumber: user.userPhoneNumber,
                shouldHaveAdminPlus: user.shouldHaveAdminPlus,
            });
    });

    useEffect(() => {
        if (user && !isFetching && prevProps.isFetching)
            setState({
                firstName: user.userFirstName,
                lastName: user.userLastName,
                phoneNumber: user.userPhoneNumber,
                shouldHaveAdminPlus: user.shouldHaveAdminPlus,
            });
    }, [isFetching, user]);

    const location = useLocation();
    const history = useHistory();
    useEffect(() => {
        if (postSuccess && !prevProps.postSuccess) {
            history.push(location.pathname.replace(`/${id}/edit`, ''));
        }
    }, [postSuccess]);

    const canSetAdminPlus = curUser.type && curUser.type >= COMPANY_USER_ROLE_TYPES.ADMIN_PLUS;

    return (
        <EditCompanyUserForm
            {...state}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            location={location}
            userID={id}
            canSetAdminPlus={canSetAdminPlus}
        />
    );

    function handleInputChange(name, value) {
        setState({ ...state, [name]: value });
    }

    function handleSubmit(e) {
        e.preventDefault();
        const postBody = {
            ...state,
            type: state.shouldHaveAdminPlus
                ? COMPANY_USER_ROLE_TYPES.ADMIN_PLUS
                : COMPANY_USER_ROLE_TYPES.ADMIN,
        };

        dispatch(editCompanyUser(id, postBody));
    }
};

const stateSelector = ({
    companyAdmin: {
        companyUsersReducer: { users, postSuccess, isFetching },
    },
    shared: {
        decodeJWTReducer: {
            jwtData: { companyUserID },
        },
    },
}) => ({
    users,
    postSuccess,
    isFetching,
    companyUserID,
});

export default EditCompanyUserFormContainer;
