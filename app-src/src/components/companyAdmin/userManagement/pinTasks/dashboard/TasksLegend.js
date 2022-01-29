import React, { useEffect } from 'react';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import { PIN_TASK_RECURRING_NAMES, PIN_TASK_STATUS_NAMES } from 'constants/companyAdmin/enums';
import LegendSegment from './views/calendar/LegendSegment';
import { useDispatch, useSelector } from 'react-redux';
import fetchCompanyOperatives from 'actions/companyAdmin/operatives/async/fetchCompanyOperatives';
import MultiSelect from 'components/shared/generic/form/presentational/MultiSelect';
import { useForm } from 'helpers/hooks';
import Form from 'components/shared/generic/form/containers/Form';
import { selectCompanyUsers } from 'selectors/companyAdmin/companyUsers';
import setUserFilters from 'actions/companyAdmin/userManagement/async/setUserFilters';
import { selectServices } from 'selectors/companyAdmin/services';
import setServiceFilters from 'actions/companyAdmin/services/async/sync/setServiceFilters';
import { selectSites } from 'selectors/companyAdmin/sites';
import setSiteFilters from 'actions/companyAdmin/sites/sync/setSiteFilters';
import fetchCompanyUsers from 'actions/companyAdmin/userManagement/async/fetchCompanyUsers';
import fetchAllServices from 'actions/superAdmin/services/async/fetchAllServices';
import fetchAllSites from 'actions/companyAdmin/sites/async/fetchAllSites';
import Field from 'components/shared/generic/form/presentational/Field';
import { selectSubscriptions } from 'selectors/superAdmin/companySubscription';

const calculatePercentage = (obj, target) => {
    const titleEnum = {
        recurring: PIN_TASK_RECURRING_NAMES.RECURRING,
        non_recurring: PIN_TASK_RECURRING_NAMES.NON_RECURRING,
        complete: PIN_TASK_STATUS_NAMES.COMPLETE,
        complete_late: PIN_TASK_STATUS_NAMES.COMPLETE_LATE,
        due_soon: PIN_TASK_STATUS_NAMES.DUE_SOON,
        incomplete: PIN_TASK_STATUS_NAMES.INCOMPLETE,
    };

    const percentageObj = Object.keys(obj).reduce(
        (res, item) => ({ ...res, [item]: (obj[item] / target) * 100 }),
        {},
    );

    const off =
        100 -
        Object.keys(percentageObj).reduce((res, item) => {
            return res + Math.round(percentageObj[item]);
        }, 0);

    const sortedObj = Object.keys(percentageObj)
        .sort((a, b) => percentageObj[a] - percentageObj[b])
        .reduce(
            (res, item) => ({
                ...res,
                [item]: Math.round(percentageObj[item]),
            }),
            {},
        );

    const formattedObj = Object.keys(sortedObj).map((item, index) => {
        const percent =
            Math.round(sortedObj[item]) +
            (off > index) -
            (index >= Object.keys(percentageObj).length + off);
        return {
            name: item,
            title: titleEnum[item],
            percent: isNaN(percent) ? 0 : percent,
        };
    });

    return formattedObj;
};

const TasksLegend = ({ types, statuses, pinTasks }) => {
    const dispatch = useDispatch();

    const numberOfTasks = Object.values(pinTasks).length;

    //filters

    const [form, handleChange] = useForm({
        operatives: [],
        services: [],
        sites: [],
    });
    const operatives = useSelector(selectCompanyUsers) ?? [];
    const operativeOptions = Object.values(operatives).map(
        ({ id, userFirstName, userLastName, companyName }) => ({
            value: id,
            label: `${userFirstName} ${userLastName} (${companyName})`,
        }),
    );

    const services = useSelector(selectServices) ?? [];
    const subscriptions = useSelector(selectSubscriptions) ?? [];
    const serviceIDs = subscriptions.serviceIDs;
    const getRelevantServices = () => {
        const arrServices = Object.values(services);

        return arrServices
            .filter(({ id }) => serviceIDs.includes(id))
            .reduce((acc, { id, name }) => {
                return { ...acc, [id]: { value: id, text: name } };
            }, {});
    };

    const serviceOptions = Object.values(getRelevantServices(services)).map(({ value, text }) => ({
        value: value,
        label: text,
    }));

    const sites = useSelector(selectSites) ?? [];

    const siteOptions = Object.values(sites).map(({ id, name, ownerCompanyName }) => ({
        label: `${name}(${ownerCompanyName})`,
        value: id,
    }));

    useEffect(() => {
        dispatch(fetchCompanyUsers());
        dispatch(fetchAllServices());
        dispatch(fetchAllSites());
    }, [dispatch]);

    useEffect(() => {
        dispatch(setServiceFilters(form.services));
        dispatch(setUserFilters(form.operatives));
        dispatch(setSiteFilters(form.sites));
    }, [dispatch, form.operatives, form.services, form.sites]);

    return (
        <BlockContainer contentClass="legend" containerClass="size-lg-12">
            <LegendSegment stats={calculatePercentage(types, numberOfTasks)} type="recurrence" />
            <LegendSegment stats={calculatePercentage(statuses, numberOfTasks)} type="status" />
            <Form>
                <Field name="Filter by service" sizeClasses="size-lg-12">
                    <MultiSelect
                        name="services"
                        value={form.services}
                        onChange={handleChange}
                        options={serviceOptions}
                        placeholder="-- select by service --"
                    />
                </Field>
                <Field name="Filter by operative" sizeClasses="size-lg-12">
                    <MultiSelect
                        name="operatives"
                        value={form.operatives}
                        onChange={handleChange}
                        options={operativeOptions}
                        placeholder="-- select by operative --"
                    />
                </Field>
                <Field name="Filter by site" sizeClasses="size-lg-12">
                    <MultiSelect
                        name="sites"
                        value={form.sites}
                        onChange={handleChange}
                        options={siteOptions}
                        placeholder="-- select by site --"
                    />
                </Field>
            </Form>
        </BlockContainer>
    );
};

export default TasksLegend;
