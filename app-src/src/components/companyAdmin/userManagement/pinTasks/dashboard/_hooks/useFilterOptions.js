import { useSelector } from 'react-redux';

import { selectPinTasks } from 'selectors/companyAdmin/pinTasks';
import { selectServices } from 'selectors/companyAdmin/services';
import { selectSiteFilters, selectSites } from 'selectors/companyAdmin/sites';
import { selectCompanyUsers } from 'selectors/companyAdmin/companyUsers';
import { selectServiceFilters } from 'selectors/companyAdmin/services';
import { selectUserFilters } from 'selectors/companyAdmin/companyUsers';
import { selectTemplateFilters, selectTemplates } from 'selectors/companyAdmin/templates';

const useFilterOptions = () => {
    const pinTasks = Object.values(useSelector(selectPinTasks));

    const selectServiceFilter = useSelector(selectServiceFilters);
    const selectTemplateFilter = useSelector(selectTemplateFilters);
    const selectUserFilter = useSelector(selectUserFilters);
    const selectSitesFilter = useSelector(selectSiteFilters);

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
        .filter(({ id }) => serviceIDs.includes(id) || selectServiceFilter.includes(id))
        .reduce((acc, { id, name }) => {
            acc.push({ value: id, label: name });

            return acc;
        }, []);

    const templates = useSelector(selectTemplates);
    const templateIDs = [...new Set(pinTasks.map(({ templateID }) => templateID))];

    const templateOptions = Object.values(templates)
        .filter(({ id }) => templateIDs.includes(id) || selectTemplateFilter.includes(id))
        .reduce((acc, { id, name }) => {
            acc.push({ value: id, label: name });

            return acc;
        }, []);

    const operativeOptions = Object.values(operatives).reduce(
        (acc, { id, userFirstName, userLastName, userEmail, operativeCode }) => {
            if (
                (operativeIDs.length && operativeIDs.includes(id)) ||
                selectUserFilter.includes(id)
            ) {
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
        if ((siteIDs.length && siteIDs.includes(id)) || selectSitesFilter.includes(id)) {
            acc.push({
                label: `${name} (${ownerCompanyName})`,
                value: id,
            });
        }

        return acc;
    }, []);

    return { serviceOptions, templateOptions, operativeOptions, siteOptions };
};

export default useFilterOptions;
