import { useSelector } from 'react-redux';

import { selectPinTasks } from 'selectors/companyAdmin/pinTasks';
import { selectServices } from 'selectors/companyAdmin/services';
import { selectSiteFilters, selectSites } from 'selectors/companyAdmin/sites';
import { selectCompanyUsers } from 'selectors/companyAdmin/companyUsers';
import { selectServiceFilters } from 'selectors/companyAdmin/services';
import { selectUserFilters } from 'selectors/companyAdmin/companyUsers';
import { selectTemplateFilters, selectTemplates } from 'selectors/companyAdmin/templates';
import { selectTemplateVersions } from 'selectors/companyAdmin/templateVersions';

const useFilterOptions = () => {
    const pinTasks = Object.values(useSelector(selectPinTasks));

    const selectServiceFilter = useSelector(selectServiceFilters);
    const selectUserFilter = useSelector(selectUserFilters);
    const selectSitesFilter = useSelector(selectSiteFilters);
    const selectTemplateFilter = useSelector(selectTemplateFilters);

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
    const templateVersions = useSelector(selectTemplateVersions);
    const taskTemplateVersions = pinTasks.map(task => task.templateVersionID);
    const pinTasksTemplates = Object.values(templateVersions).filter(
        item => taskTemplateVersions.includes(item.id) || selectTemplateFilter.includes(item.id),
    );
    const filteredTemplates = Object.values(templates).filter(template =>
        pinTasksTemplates.map(item => item.templateID).includes(template.id),
    );

    const templateOptions = Object.values(filteredTemplates).reduce((acc, { id, name }) => {
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
