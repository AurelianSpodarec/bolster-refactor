import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectPinOptions } from 'selectors/companyAdmin/pinOptions';
import { selectPinOptionSets } from 'selectors/companyAdmin/pinOptionSets';

import { selectPinOptionTypesArr } from 'selectors/companyAdmin/pinOptionTypes';

const useShouldRedirectFromOptionDocuments = hasFetched => {
    const { optionID, setID, type } = useParams();
    const pinOptionTypesArr = useSelector(selectPinOptionTypesArr);
    const pinOptionSets = useSelector(selectPinOptionSets);
    const pinOptions = useSelector(selectPinOptions);

    const specificType = pinOptionTypesArr.find(curType => curType.slug === type);
    const specificSet = pinOptionSets[setID];
    const specificOption = pinOptions[optionID];

    const checkRedirectToPinOptions = () => {
        if (!hasFetched) return false;

        if (!specificType || !specificSet || !specificOption) {
            return true;
        }

        if (specificType && !specificType.hasDocuments) {
            return true;
        }

        if (specificSet && specificSet.pinOptionTypeID !== specificType.id) {
            return true;
        }

        if (specificOption && specificOption.pinOptionSetID !== parseInt(setID)) {
            return true;
        }

        return false;
    };

    const shouldRedirect = checkRedirectToPinOptions();

    return shouldRedirect;
};

export default useShouldRedirectFromOptionDocuments;
