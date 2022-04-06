import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { getVersionNameForPinOption } from 'helpers/pinOptions';

import { selectPinOptionsArr } from 'selectors/companyAdmin/pinOptions';
import { selectPinOptionVersionsArr } from 'selectors/companyAdmin/pinOptionVersions';

const useGetOptionsForSet = (typeID, setID) => {
    const pinOptions = useSelector(selectPinOptionsArr);
    const pinOptionVersions = useSelector(selectPinOptionVersionsArr);

    const pinOptionsForSet = useMemo(() => {
        const filterOptions = pinOptions.filter(option => {
            if (option.pinOptionTypeID !== typeID) return false;
            if (option.pinOptionSetID !== setID) return false;
            return true;
        });

        const sortOptions = filterOptions.sort((a, b) => a.sort - b.sort);

        return sortOptions;
    }, [pinOptions]);

    const pinOptionsWithName = useMemo(() => {
        return pinOptionsForSet.map(option => {
            const name = getVersionNameForPinOption(option.id, pinOptionVersions);

            return {
                name,
                ...option,
            };
        });
    }, [pinOptionsForSet]);

    return pinOptionsWithName;
};

export default useGetOptionsForSet;
