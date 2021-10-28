import fetchPins from 'actions/companyAdmin/pins/async/fetchPins';
import getServiceReportOptions from 'actions/companyAdmin/reports/async/getServiceReportOptions';
import getTemplateReportOptions from 'actions/companyAdmin/reports/async/getTemplateReportOptions';
import React, { useEffect } from 'react';
import { batch, useDispatch, useSelector } from 'react-redux';
import {
    selectPins,
    selectPinsFetchError,
    selectPinsIsFetching,
} from 'selectors/companyAdmin/pins';
import {
    selectReportServices,
    selectReportTemplates,
    selectReportsIsFetching,
    selectReportsError,
} from 'selectors/companyAdmin/reports';

const useStep2Options = (handleChange, drawing, service, template) => {
    const dispatch = useDispatch();

    const services = useSelector(selectReportServices) ?? [];
    const templates = useSelector(selectReportTemplates) ?? [];
    const reportsIsFetching = useSelector(selectReportsIsFetching);
    const reportsFetchError = useSelector(selectReportsError);

    const pins = useSelector(selectPins) ?? [];
    const pinsIsFetching = useSelector(selectPinsIsFetching);
    const pinsFetchError = useSelector(selectPinsFetchError);

    const postBody = { hierarchyType: 'drawing', hierarchyID: [drawing], reportHistories: 1 };

    useEffect(() => {
        batch(() => {
            if (drawing != null) dispatch(fetchPins('Drawing', drawing));
            const _postBody = { ...postBody };
            dispatch(getServiceReportOptions(_postBody));
        });
    }, [dispatch, drawing]);

    useEffect(() => {
        const _postBody = { ...postBody };
        if (service != null) _postBody.serviceID = [service];
        dispatch(getTemplateReportOptions(_postBody));
    }, [dispatch, drawing, service]);

    const serviceOptions = Object.values(services).map(({ id, name }) => ({
        value: id,
        label: name,
    }));

    const templateOptions = Object.values(templates).map(({ id, name }) => ({
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

    const isFetching = reportsIsFetching || pinsIsFetching;
    const fetchError = reportsFetchError || pinsFetchError;

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
