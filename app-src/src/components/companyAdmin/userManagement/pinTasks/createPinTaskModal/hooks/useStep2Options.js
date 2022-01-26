import fetchPins from 'actions/companyAdmin/pins/async/fetchPins';
import fetchOperativesForDrawing from 'actions/companyAdmin/operatives/async/fetchOperativesForDrawing';
import getServiceReportOptions from 'actions/companyAdmin/reports/async/getServiceReportOptions';
import getTemplateReportOptions from 'actions/companyAdmin/reports/async/getTemplateReportOptions';
import { useEffect } from 'react';
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
import { selectOperative } from 'selectors/companyAdmin/operatives';

const useStep2Options = (handleChange, drawingID, service, template, companyUserID) => {
    const dispatch = useDispatch();

    const services = useSelector(selectReportServices) ?? [];
    const templates = useSelector(selectReportTemplates) ?? [];
    const reportsIsFetching = useSelector(selectReportsIsFetching);
    const reportsFetchError = useSelector(selectReportsError);

    const pins = useSelector(selectPins) ?? [];
    const pinsIsFetching = useSelector(selectPinsIsFetching);
    const pinsFetchError = useSelector(selectPinsFetchError);

    const postBody = { hierarchyType: 'drawing', hierarchyID: [drawingID], reportHistories: 1 };
    const op = useSelector(state => selectOperative(state, companyUserID));
    useEffect(() => {
        batch(() => {
            if (drawingID != null) {
                dispatch(fetchPins('Drawing', drawingID));
                dispatch(fetchOperativesForDrawing(drawingID));
            }

            const _postBody = { ...postBody };
            dispatch(getServiceReportOptions(_postBody));
        });
    }, [dispatch, drawingID]);

    useEffect(() => {
        const _postBody = { ...postBody };
        if (service != null) _postBody.serviceID = [service];
        dispatch(getTemplateReportOptions(_postBody));
    }, [dispatch, drawingID, service]);

    const serviceOptions = Object.values(services).reduce((acc, service) => {
        if (op?.serviceIDs.includes(service.id)) {
            acc.push({ value: service.id, label: service.name });
        }
        return acc;
    }, []);

    const templateOptions = Object.values(templates).reduce((acc, template) => {
        if (op?.serviceIDs.includes(template.serviceID)) {
            acc.push({ value: template.id, label: template.name });
        }
        return acc;
    }, []);

    const pinOptions = Object.values(pins).reduce((acc, pin) => {
        if (op?.serviceIDs.includes(pin.latestServiceID)) {
            acc.push({ value: pin.id, label: pin.pinCode });
        }
        return acc;
    }, []);

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
