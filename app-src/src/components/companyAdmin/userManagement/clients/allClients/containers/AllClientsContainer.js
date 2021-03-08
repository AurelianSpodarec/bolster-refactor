import React from 'react';
import { useDispatch } from 'react-redux';

import AllClients from '../presentational/AllClients';
import fetchClientUsers from 'actions/companyAdmin/userManagement/async/fetchClientUsers';
import { componentDidMount } from 'helpers/generic';

const AllClientsContainer = () => {
    const dispatch = useDispatch();
    componentDidMount(() => {
        dispatch(fetchClientUsers());
    });

    return <AllClients />;
};

export default AllClientsContainer;
