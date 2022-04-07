import React from 'react';

const useShouldRedirectFromOptionDocuments = (
    typeLink,
    setID,
    hasFetched,
    specificSet,
    specificOption,
) => {
    const checkRedirectToPinOptions = () => {
        if (!typeLink || (hasFetched && !specificSet)) {
            return true;
        }

        if (specificSet && specificSet.pinOptionTypeID !== typeLink) {
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
