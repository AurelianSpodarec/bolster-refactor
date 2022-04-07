import React from 'react';

const useShouldRedirectFromOptionValues = (typeLink, hasFetched, specificSet) => {
    const checkRedirectToPinOptions = () => {
        if (!typeLink || (hasFetched && !specificSet)) {
            return true;
        }

        if (specificSet && specificSet.pinOptionTypeID !== typeLink) {
            return true;
        }

        return false;
    };

    const shouldRedirect = checkRedirectToPinOptions();

    return shouldRedirect;
};

export default useShouldRedirectFromOptionValues;
