import { useSelector } from 'react-redux';

import { selectPinTasks } from 'selectors/companyAdmin/pinTasks';
import { selectServices } from 'selectors/companyAdmin/services';
import { selectSites } from 'selectors/companyAdmin/sites';
import { selectCompanyUsers } from 'selectors/companyAdmin/companyUsers';
import { selectServiceFilters } from 'selectors/companyAdmin/services';
import { selectUserFilters } from 'selectors/companyAdmin/companyUsers';

const useFilterOptions = () => {
    const pinTasks = Object.values(useSelector(selectPinTasks));

    const selectServiceFilter = useSelector(selectServiceFilters);
    const selectUserFilter = useSelector(selectUserFilters);

    const operativeIDs = pinTasks
        .filter(task => {
            if (selectServiceFilter.length) {
                return selectServiceFilter.includes(task.serviceID);
            }
            return true;
        })
        .map(task => task.companyUserID);

    const siteIDs = pinTasks
        .filter(task => {
            if (selectUserFilter.length) {
                return selectUserFilter.includes(task.companyUserID);
            }
            if (selectServiceFilter.length) {
                return selectServiceFilter.includes(task.serviceID);
            }
            return true;
        })
        .map(task => task.siteID);

    const sites = useSelector(selectSites);
    const operatives = useSelector(selectCompanyUsers);

    const services = useSelector(selectServices);
    const serviceIDs = [...new Set(pinTasks.map(({ serviceID }) => serviceID))];

    const serviceOptions = Object.values(services)
        .filter(({ id }) => serviceIDs.includes(id))
        .reduce((acc, { id, name }) => {
            acc.push({ value: id, label: name });

            return acc;
        }, []);

    const operativeOptions = Object.values(operatives).reduce(
        (acc, { id, userFirstName, userLastName, userEmail, operativeCode }) => {
            if (operativeIDs.includes(id) || !operativeIDs) {
                acc.push({
                    value: id,
                    label: `${userFirstName} ${userLastName} - ${operativeCode} (${userEmail})`,
                });
            }
            return acc;
        },
        [],
    );

    const siteOptions = Object.values(sites).reduce((acc, { id, name, ownerCompanyName }) => {
        if (siteIDs.length && siteIDs.includes(id)) {
            acc.push({
                label: `${name} (${ownerCompanyName})`,
                value: id,
            });
        }

        return acc;
    }, []);
    console.log({ services, sites, operatives });
    return { serviceOptions, operativeOptions, siteOptions };
};

export default useFilterOptions;
