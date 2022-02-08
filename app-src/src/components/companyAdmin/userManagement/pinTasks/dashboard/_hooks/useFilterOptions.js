import { useSelector } from 'react-redux';

import { selectPinTasks } from 'selectors/companyAdmin/pinTasks';
import { selectServices } from 'selectors/companyAdmin/services';
import { selectSubscriptions } from 'selectors/superAdmin/companySubscription';
import { selectSites } from 'selectors/companyAdmin/sites';
import { selectCompanyUsers } from 'selectors/companyAdmin/companyUsers';

const useFilterOptions = () => {
    const pinTasks = Object.values(useSelector(selectPinTasks));

    const operativeIDs = [...new Set(pinTasks.map(task => task.companyUserID))];
    const siteIDs = [...new Set(pinTasks.map(task => task.siteID))];

    const sites = useSelector(selectSites);
    const operatives = useSelector(selectCompanyUsers);

    const subscriptions = useSelector(selectSubscriptions);
    const services = useSelector(selectServices);
    const serviceIDs = subscriptions.serviceIDs;

    // Dynamically change options based on one before
    // e.g only show operatives that have the service selected
    // only show sites that selected operative are attached to

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

    return { serviceOptions, operativeOptions, siteOptions };
};

export default useFilterOptions;
