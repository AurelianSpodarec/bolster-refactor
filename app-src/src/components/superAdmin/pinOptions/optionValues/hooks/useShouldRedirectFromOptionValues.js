import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { selectPinOptionTypesArr } from '../../../../../selectors/superAdmin/pinOptionTypes';
import { selectPinOptionSets } from '../../../../../selectors/superAdmin/pinOptionSets';

const useShouldRedirectFromOptionValues = hasFetched => {
    const { setID, type } = useParams();
    const pinOptionTypesArr = useSelector(selectPinOptionTypesArr);
    const pinOptionSets = useSelector(selectPinOptionSets);

    const specificType = pinOptionTypesArr.find(curType => curType.slug === type);
    const specificSet = pinOptionSets[setID];

    const checkRedirectToPinOptions = () => {
        if (!hasFetched) return false;

        if (!specificType || !specificSet) {
            return true;
        }

        if (specificSet && specificSet.pinOptionTypeID !== specificType.id) {
            return true;
        }

        return false;
    };

    const shouldRedirect = checkRedirectToPinOptions();

    return shouldRedirect;
};

export default useShouldRedirectFromOptionValues;
