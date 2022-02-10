import { useEffect } from 'react';
import { useForm } from 'helpers/hooks';
import { batch, useDispatch } from 'react-redux';
import useFilterOptions from '../_hooks/useFilterOptions';

import setServiceFilters from 'actions/companyAdmin/services/async/sync/setServiceFilters';
import setUserFilters from 'actions/companyAdmin/userManagement/async/setUserFilters';
import setSiteFilters from 'actions/companyAdmin/sites/sync/setSiteFilters';

const useTasksFilters = (onPrev, onNext) => {
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

    const clearFilters = () => {
        handleChange('operatives', []);
        handleChange('services', []);
        handleChange('sites', []);
    };

    const handlePrev = () => {
        clearFilters();
        onPrev();
    };

    const handleNext = () => {
        clearFilters();
        onNext();
    };

    return {
        form,
        handleChange,
        serviceOptions,
        siteOptions,
        operativeOptions,
        handlePrev,
        handleNext,
    };
};

export default useTasksFilters;
