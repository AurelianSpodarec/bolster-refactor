import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router-dom';

import editCompanyUser from 'actions/companyAdmin/userManagement/async/editCompanyUser';
import EditCompanyUserForm from '../presentational/EditCompanyUserForm';
import { componentDidMount } from 'helpers/generic';
import { usePrevious } from 'helpers/hooks';

const EditCompanyUserFormContainer = () => {
    const [state, setState] = useState({ firstName: '', lastName: '', phoneNumber: '' });
    const dispatch = useDispatch();

    const { id } = useParams();
    const { users, postSuccess, isFetching } = useSelector(state => stateSelector(state));
    const user = users[id];
    const prevProps = usePrevious({ isFetching, postSuccess, user });

    componentDidMount(() => {
        if (!isFetching && user)
            setState({
                firstName: user.userFirstName,
                lastName: user.userLastName,
                phoneNumber: user.userPhoneNumber,
            });
    });

    useEffect(() => {
        if (user && !isFetching && prevProps.isFetching)
            setState({
                firstName: user.userFirstName,
                lastName: user.userLastName,
                phoneNumber: user.userPhoneNumber,
            });
    }, [isFetching, user]);

    const location = useLocation();
    const history = useHistory();
    useEffect(() => {
        if (postSuccess && !prevProps.postSuccess) {
            history.push(location.pathname.replace(`/${id}/edit`, ''));
        }
    }, [postSuccess]);

    return (
        <EditCompanyUserForm
            {...state}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            location={location}
            userID={id}
        />
    );

    function handleInputChange(name, value) {
        setState({ ...state, [name]: value });
    }

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(editCompanyUser(id, state));
    }
};

const stateSelector = ({
    companyAdmin: {
        companyUsersReducer: { users, postSuccess, isFetching },
    },
}) => ({
    users,
    postSuccess,
    isFetching,
});

export default EditCompanyUserFormContainer;
