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
import { selectPinTasks } from 'selectors/companyAdmin/pinTasks';

const useTasksFilters = () => {
    const dispatch = useDispatch();

    const [form, handleChange] = useForm({
        operatives: [],
        services: [],
        sites: [],
    });

    const pinTasks = Object.values(useSelector(selectPinTasks));

    const taskOperativeIDs = [...new Set(pinTasks.map(task => task.companyUserID))];
    const taskSiteIDs = [...new Set(pinTasks.map(task => task.siteID))];

    const subscriptions = useSelector(selectSubscriptions);
    const services = useSelector(selectServices);
    const serviceIDs = subscriptions.serviceIDs;

    const sites = useSelector(selectSites);

    const operatives = useSelector(selectCompanyUsers);

    useEffect(() => {
        batch(() => {
            dispatch(setServiceFilters(form.services));
            dispatch(setUserFilters(form.operatives));
            dispatch(setSiteFilters(form.sites));
        });
    }, [dispatch, form]);

    const serviceOptions = Object.values(services)
        .filter(({ id }) => serviceIDs.includes(id))
        .reduce((acc, { id, name }) => {
            acc.push({ value: id, label: name });

            return acc;
        }, []);

    const siteOptions = Object.values(sites).reduce((acc, { id, name, ownerCompanyName }) => {
        if (!taskSiteIDs || (taskSiteIDs.length && taskSiteIDs.includes(id))) {
            acc.push({
                label: `${name}(${ownerCompanyName})`,
                value: id,
            });
        }
        console.log(acc);
        return acc;
    }, []);

    const operativeOptions = Object.values(operatives).reduce(
        (acc, { id, userFirstName, userLastName, userEmail, operativeCode }) => {
            if (taskOperativeIDs.includes(id) || !taskOperativeIDs) {
                acc.push({
                    value: id,
                    label: `${userFirstName} ${userLastName} - ${operativeCode} (${userEmail})`,
                });
            }
            return acc;
        },
        [],
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
