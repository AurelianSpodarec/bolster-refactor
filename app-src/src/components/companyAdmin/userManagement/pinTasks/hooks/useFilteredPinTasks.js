import { useSelector } from 'react-redux';
import { selectUserFilters } from 'selectors/companyAdmin/companyUsers';
import { selectServiceFilters } from 'selectors/companyAdmin/services';
import { selectSiteFilters } from 'selectors/companyAdmin/sites';

const useFilteredPinTasks = tasks => {
    const selectUserFilter = useSelector(selectUserFilters);
    const selectServiceFilter = useSelector(selectServiceFilters);
    const selectSiteFilter = useSelector(selectSiteFilters);

    const pinTasks = Object.values(tasks).filter(task => {
        if (selectSiteFilter.length) {
            return selectSiteFilter.includes(task.siteID);
        } else if (selectUserFilter.length) {
            return selectUserFilter.includes(task.companyUserID);
        } else if (selectServiceFilter.length) {
            return selectServiceFilter.includes(task.serviceID);
        }

        return true;
    });

    return pinTasks;
};

export default useFilteredPinTasks;
