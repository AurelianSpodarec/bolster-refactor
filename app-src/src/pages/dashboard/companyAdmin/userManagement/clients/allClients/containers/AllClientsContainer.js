import React from 'react';
import { useDispatch } from 'react-redux';

import AllClients from '../presentational/AllClients';
import fetchClientUserPermissions from 'actions/companyAdmin/userManagement/async/fetchClientUserPermissions';
import { componentDidMount } from 'helpers/generic';
import fetchClientUsers from 'actions/companyAdmin/clients/async/fetchClientUsers';

const AllClientsContainer = () => {
    const dispatch = useDispatch();
    componentDidMount(() => {
        dispatch(fetchClientUserPermissions());
        dispatch(fetchClientUsers());
    });

    return <AllClients />;
};

export default AllClientsContainer;
