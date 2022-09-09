import React from 'react';
import { useDispatch } from 'react-redux';
import { componentDidMount } from 'helpers/generic';
import fetchAllCompanies from 'actions/superAdmin/companies/async/fetchAllCompanies';
import fetchAllServices from 'actions/superAdmin/services/async/fetchAllServices';
import AllCompanies from '../presentational/AllCompanies';

const AllCompaniesContainer = () => {
    const dispatch = useDispatch();
    componentDidMount(() => {
        dispatch(fetchAllCompanies());
        dispatch(fetchAllServices());
    });

    return <AllCompanies />;
};

export default AllCompaniesContainer;
