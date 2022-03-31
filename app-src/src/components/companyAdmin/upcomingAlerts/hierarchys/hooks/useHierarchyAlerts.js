import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useLocation } from 'react-router-dom';

import { fetchHierarchyAlerts } from 'actions/companyAdmin/alerts/async/fetchAlertsForHierarchy';
import { alertsError, alertsIsFetching, selectAlerts } from 'selectors/companyAdmin/alerts';

import { HIERARCHY_IDS } from 'constants/companyAdmin/enums';

const useHierarchyAlerts = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { pathname } = useLocation();

    const hierarchy = pathname.split('/')[2].slice(0, -1).toUpperCase();
    const hierarchyType = HIERARCHY_IDS[hierarchy];

    const alerts = useSelector(selectAlerts);
    const isFetching = useSelector(alertsIsFetching);
    const error = useSelector(alertsError);

    useEffect(() => {
        dispatch(fetchHierarchyAlerts(hierarchyType, id));
    }, []);

    return { alerts, isFetching, error };
};

export default useHierarchyAlerts;
