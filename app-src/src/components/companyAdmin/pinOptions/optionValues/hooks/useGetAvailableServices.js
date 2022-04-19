import React from 'react';
import { useSelector } from 'react-redux';

import { formatCheckboxListOptions, isEmpty } from 'helpers/generic';

import { selectPinOptionSet } from 'selectors/companyAdmin/pinOptionSets';
import { selectServicesArr } from 'selectors/companyAdmin/services';

const useGetAvailableServices = pinOptionSetID => {
    const services = useSelector(selectServicesArr);
    const pinOptionSet = useSelector(state => selectPinOptionSet(state, pinOptionSetID));

    const getAvailableServices = () => {
        const optionSetServiceIDs = pinOptionSet.serviceIDs;

        if (!isEmpty(optionSetServiceIDs)) {
            const availableServices = services.filter(service =>
                optionSetServiceIDs.includes(service.id),
            );

            return formatCheckboxListOptions(availableServices);
        }

        return formatCheckboxListOptions(services);
    };

    const availableServices = getAvailableServices();

    return availableServices;
};

export default useGetAvailableServices;
