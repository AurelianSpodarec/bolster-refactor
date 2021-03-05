import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router-dom';

import editCompanyUser from 'actions/companyAdmin/userManagement/async/editCompanyUser';
import { componentDidMount } from 'helpers/generic';
import { usePrevious } from 'helpers/hooks';
import EditCompanyUserEmail from '../presentational/EditCompanyUserEmail';

const EditCompanyUserEmailContainer = () => {
    const [state, setState] = useState({ email: '' });
    const dispatch = useDispatch();

    const { id } = useParams();
    const { users, postSuccess, isFetching } = useSelector(state => stateSelector(state));
    const user = users[id];
    const prevProps = usePrevious({ isFetching, postSuccess, user });

    componentDidMount(() => {
        if (!isFetching && user) {
            setState({ email: user.userEmail });
        }
    });

    useEffect(() => {
        if (user && !isFetching && prevProps.isFetching) {
            setState({ email: user.userEmail });
        }
    }, [isFetching, user]);

    const location = useLocation();
    const history = useHistory();
    useEffect(() => {
        if (postSuccess && !prevProps.postSuccess) {
            history.push(location.pathname.replace(`/${id}/edit-email`, ''));
        }
    }, [postSuccess]);

    return (
        <EditCompanyUserEmail
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
        // todo change this for the right action
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

export default EditCompanyUserEmailContainer;
