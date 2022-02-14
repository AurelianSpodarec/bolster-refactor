import { useEffect } from 'react';
import { useForm } from 'helpers/hooks';
import { batch, useDispatch } from 'react-redux';
import useFilterOptions from '../_hooks/useFilterOptions';

import setServiceFilters from 'actions/companyAdmin/services/async/sync/setServiceFilters';
import setUserFilters from 'actions/companyAdmin/userManagement/async/setUserFilters';
import setSiteFilters from 'actions/companyAdmin/sites/sync/setSiteFilters';

const useTasksFilters = () => {
    const dispatch = useDispatch();

    const [form, handleChange] = useForm({
        operatives: [],
        services: [],
        sites: [],
    });

    const { serviceOptions, operativeOptions, siteOptions } = useFilterOptions();

    useEffect(() => {
        batch(() => {
            dispatch(setServiceFilters(form.services));
            dispatch(setUserFilters(form.operatives));
            dispatch(setSiteFilters(form.sites));
        });
    }, [dispatch, form]);

    return {
        form,
        handleChange,
        serviceOptions,
        siteOptions,
        operativeOptions,
    };
};

export default useTasksFilters;
