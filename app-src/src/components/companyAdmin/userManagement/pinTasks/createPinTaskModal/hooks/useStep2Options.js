import fetchOperativesForDrawing from 'actions/companyAdmin/operatives/async/fetchOperativesForDrawing';
import getServiceReportOptions from 'actions/companyAdmin/reports/async/getServiceReportOptions';
import getTemplateReportOptions from 'actions/companyAdmin/reports/async/getTemplateReportOptions';
import { useEffect } from 'react';
import { batch, useDispatch, useSelector } from 'react-redux';
import {
    selectReportServices,
    selectReportTemplates,
    selectReportsIsFetching,
    selectReportsError,
} from 'selectors/companyAdmin/reports';
import { selectOperative } from 'selectors/companyAdmin/operatives';
import { selectSubscriptions } from 'selectors/superAdmin/companySubscription';

const useStep2Options = (handleChange, drawingID, service, companyUserID) => {
    const dispatch = useDispatch();

    const { serviceIDs } = useSelector(selectSubscriptions);
    const services = useSelector(selectReportServices).filter(service =>
        serviceIDs.includes(service.id),
    );
    const templates = useSelector(selectReportTemplates) ?? [];
    const reportsIsFetching = useSelector(selectReportsIsFetching);
    const reportsFetchError = useSelector(selectReportsError);

    const postBody = { hierarchyType: 'drawing', hierarchyID: [drawingID], reportHistories: 1 };
    const op = useSelector(state => selectOperative(state, companyUserID));

    useEffect(() => {
        batch(() => {
            if (drawingID != null) {
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

    useEffect(() => {
        handleChange('template', null);
    }, [service]);

    const isFetching = reportsIsFetching;
    const fetchError = reportsFetchError;

    return {
        isFetching,
        fetchError,
        serviceOptions,
        templateOptions,
    };
};

export default useStep2Options;
