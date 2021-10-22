import fetchPins from 'actions/companyAdmin/pins/async/fetchPins';
import fetchAllServices from 'actions/companyAdmin/services/async/fetchAllServices';
import fetchAllTemplates from 'actions/companyAdmin/templates/async/fetchAllTemplates';
import { useEffect } from 'react';
import { batch, useDispatch, useSelector } from 'react-redux';
import {
    selectPins,
    selectPinsFetchError,
    selectPinsIsFetching,
} from 'selectors/companyAdmin/pins';
import {
    selectServices,
    selectServicesFetchError,
    selectServicesIsFetching,
} from 'selectors/companyAdmin/services';
import {
    selectTemplates,
    selectTemplatesFetchError,
    selectTemplatesIsFetching,
} from 'selectors/companyAdmin/templates';

const useStep2Options = (handleChange, drawing, service, template) => {
    const dispatch = useDispatch();

    const services = useSelector(selectServices) ?? [];
    const servicesIsFetching = useSelector(selectServicesIsFetching);
    const servicesFetchError = useSelector(selectServicesFetchError);

    const templates = useSelector(selectTemplates) ?? [];
    const templatesIsFetching = useSelector(selectTemplatesIsFetching);
    const templatesFetchError = useSelector(selectTemplatesFetchError);

    const pins = useSelector(selectPins) ?? [];
    const pinsIsFetching = useSelector(selectPinsIsFetching);
    const pinsFetchError = useSelector(selectPinsFetchError);

    useEffect(() => {
        batch(() => {
            if (drawing) dispatch(fetchPins('Drawing', drawing));
            dispatch(fetchAllServices());
            dispatch(fetchAllTemplates());
        });
    }, [dispatch, drawing]);

    const validServiceIDs = [];
    const validTemplateIDs = [];
    Object.values(pins).forEach(({ latestServiceID, templateID }) => {
        if (!validServiceIDs.includes(latestServiceID)) validServiceIDs.push(latestServiceID);
        if (!validTemplateIDs.includes(templateID)) validTemplateIDs.push(templateID);
    });

    const serviceOptions = Object.values(services)
        .filter(({ id }) => validServiceIDs.includes(id))
        .map(({ id, name }) => ({
            value: id,
            label: name,
        }));

    const templateOptions = Object.values(templates)
        .filter(({ id }) => validTemplateIDs.includes(id))
        .filter(({ serviceID }) => serviceID == service)
        .map(({ id, name }) => ({
            value: id,
            label: name,
        }));

    const pinOptions = Object.values(pins).map(({ id, pinCode }) => ({
        value: id,
        label: pinCode,
    }));

    const pinOptionsFilter = ({ value }) => {
        const { latestServiceID, templateID } = pins[value];
        let valid = true;
        if (service != null) valid = latestServiceID == service;
        if (template != null) valid = templateID == template;
        return valid;
    };

    useEffect(() => {
        handleChange('template', null);
    }, [service]);

    const isFetching = servicesIsFetching || templatesIsFetching || pinsIsFetching;
    const fetchError = servicesFetchError || templatesFetchError || pinsFetchError;

    return {
        isFetching,
        fetchError,
        serviceOptions,
        templateOptions,
        pinOptions,
        pinOptionsFilter,
    };
};

export default useStep2Options;
