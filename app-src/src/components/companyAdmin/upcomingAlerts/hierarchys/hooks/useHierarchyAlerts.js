import { HIERARCHY_IDS } from 'constants/companyAdmin/enums';
import { useSelector } from 'react-redux';
import { useParams, useLocation } from 'react-router-dom';

import { alertsError, alertsIsFetching } from 'selectors/alerts';

const useHierarchyAlerts = () => {
    const { id } = useParams();
    const { pathname } = useLocation();

    const getHierarchyType = () => {
        const hierarchy = pathname.split('/')[2];

        return hierarchy.slice(0, -1).toUpperCase();
    };

    const hierarchyTypeID = HIERARCHY_IDS[getHierarchyType()];

    console.log(hierarchyTypeID);
    const alerts = [];
    const isFetching = useSelector(alertsIsFetching);
    const error = useSelector(alertsError);

    return { alerts, isFetching, error };
};

export default useHierarchyAlerts;
