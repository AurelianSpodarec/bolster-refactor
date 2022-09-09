import { useForm, usePrevious } from 'helpers/hooks';
import { useEffect, useMemo } from 'react';
import { useSelector, useDispatch, batch } from 'react-redux';

import fetchAllSites from 'actions/companyAdmin/sites/async/fetchAllSites';
import fetchCompanyUsers from 'actions/companyAdmin/operatives/async/fetchCompanyOperatives';

import { selectSites } from 'selectors/companyAdmin/sites';
import { selectCompanyOperatives } from 'selectors/companyAdmin/operatives';
import { sendToEnum } from 'constants/companyAdmin/enums';

import createOperativeAlert from 'actions/companyAdmin/operativeAlerts/async/createOperativeAlert';
import { alertsPostSuccess } from 'selectors/companyAdmin/alerts';
import hideModal from 'actions/shared/generic/modals/sync/hideModal';

const useCreateNewOperativeAlerts = () => {
    const dispatch = useDispatch();
    const [form, handleChange] = useForm({
        message: '',
        sendTo: null,
        operativeIDs: [],
        siteID: null,
    });

    const sites = useSelector(selectSites);
    const operatives = useSelector(selectCompanyOperatives);
    const postSuccess = useSelector(alertsPostSuccess);
    const prevPostSuccess = usePrevious(postSuccess);

    const siteOptions = useMemo(() => {
        return Object.values(sites).reduce((acc, site) => {
            acc.push({
                label: site.name,
                value: site.id,
            });
            return acc;
        }, []);
    }, [sites]);

    const operativeOptions = useMemo(() => {
        return Object.values(operatives).reduce((acc, operative) => {
            acc.push({
                label: `${operative.userFirstName} ${operative.userLastName} (${operative.userEmail})`,
                value: operative.id,
            });
            return acc;
        }, []);
    }, [operatives]);

    const sendToOptions = [
        { label: 'All Operatives', value: 0 },
        { label: 'Operatives within a Site', value: 1 },
        { label: 'Selected Operatives', value: 2 },
    ];

    useEffect(() => {
        batch(() => {
            dispatch(fetchAllSites());
            dispatch(fetchCompanyUsers());
        });
    }, []);

    useEffect(() => {
        if (postSuccess && !prevPostSuccess) {
            dispatch(hideModal());
        }
    }, [postSuccess, prevPostSuccess]);

    const handleSubmit = () => {
        switch (form.sendTo) {
            case sendToEnum.ALL_OPERATIVES:
                dispatch(
                    createOperativeAlert({ message: form.message }, sendToEnum.ALL_OPERATIVES),
                );
                break;
            case sendToEnum.OPERATIVES_WITHIN_SITE:
                dispatch(
                    createOperativeAlert(
                        { message: form.message, siteID: form.siteID },
                        sendToEnum.OPERATIVES_WITHIN_SITE,
                    ),
                );
                break;
            case sendToEnum.SELECTED_OPERATIVES:
                dispatch(
                    createOperativeAlert(
                        { message: form.message, operativeIDs: form.operativeIDs },
                        sendToEnum.SELECTED_OPERATIVES,
                    ),
                );
                break;
        }
    };

    return { sendToOptions, siteOptions, operativeOptions, form, handleChange, handleSubmit };
};

export default useCreateNewOperativeAlerts;
