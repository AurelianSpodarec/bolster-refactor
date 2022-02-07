import { useEffect } from 'react';
import { useForm } from 'helpers/hooks';
import { batch, useDispatch, useSelector } from 'react-redux';

import setServiceFilters from 'actions/companyAdmin/services/async/sync/setServiceFilters';
import setUserFilters from 'actions/companyAdmin/userManagement/async/setUserFilters';
import setSiteFilters from 'actions/companyAdmin/sites/sync/setSiteFilters';
import { selectServices } from 'selectors/companyAdmin/services';
import { selectSubscriptions } from 'selectors/superAdmin/companySubscription';
import { selectSites } from 'selectors/companyAdmin/sites';
import { selectCompanyUsers } from 'selectors/companyAdmin/companyUsers';

const useTasksFilters = () => {
    const dispatch = useDispatch();

    const [form, handleChange] = useForm({
        operatives: [],
        services: [],
        sites: [],
    });

    const services = useSelector(selectServices) ?? [];
    const subscriptions = useSelector(selectSubscriptions) ?? [];
    const serviceIDs = subscriptions.serviceIDs;

    const sites = useSelector(selectSites) ?? [];

    const operatives = useSelector(selectCompanyUsers) ?? [];

    useEffect(() => {
        batch(() => {
            dispatch(setServiceFilters(form.services));
            dispatch(setUserFilters(form.operatives));
            dispatch(setSiteFilters(form.sites));
        });
    }, [dispatch, form.operatives, form.services, form.sites]);

    const getRelevantServices = () => {
        const arrServices = Object.values(services);

        return arrServices
            .filter(({ id }) => serviceIDs.includes(id))
            .reduce((acc, { id, name }) => {
                acc.push({ value: id, label: name });

                return acc;
            }, []);
    };

    const serviceOptions = getRelevantServices();

    const siteOptions = Object.values(sites).map(({ id, name, ownerCompanyName }) => ({
        label: `${name}(${ownerCompanyName})`,
        value: id,
    }));

    const operativeOptions = Object.values(operatives).map(
        ({ id, userFirstName, userLastName, userEmail, operativeCode }) => ({
            value: id,
            label: `${userFirstName} ${userLastName} - ${operativeCode} (${userEmail})`,
        }),
    );

    return {
        form,
        handleChange,
        serviceOptions,
        siteOptions,
        operativeOptions,
    };
};

export default useTasksFilters;
