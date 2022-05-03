import { useSelector } from 'react-redux';

import { formatCheckboxListOptions } from 'helpers/generic';

import { selectPinOptionSet } from 'selectors/companyAdmin/pinOptionSets';
import { selectServicesArr } from 'selectors/companyAdmin/services';
import { selectSubscriptions } from '../../../../../selectors/superAdmin/companySubscription';

const useGetAvailableServices = pinOptionSetID => {
    const services = useSelector(selectServicesArr);
    const { serviceIDs } = useSelector(selectSubscriptions);
    const pinOptionSet = useSelector(state => selectPinOptionSet(state, pinOptionSetID));

    const optionSetServiceIDs = pinOptionSet.serviceIDs;
    const availableServices = services.filter(({ id }) => {
        if (!serviceIDs.includes(id)) return false;
        return !optionSetServiceIDs || optionSetServiceIDs.includes(id);
    });

    return formatCheckboxListOptions(availableServices);
};

export default useGetAvailableServices;
