import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, useParams } from 'react-router-dom';

import { PIN_OPTION_TYPES_LOOKUP } from 'constants/companyAdmin/enums';

import { selectPinOptionSets } from 'selectors/companyAdmin/pinOptionSets';

import useFetchBatchForOptionValues from './hooks/useFetchBatchForOptionValues';
import useShouldRedirectFromOptionValues from './hooks/useShouldRedirectFromOptionValues';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import OptionValuesList from './OptionValuesList';
import FlexHeading from 'components/shared/generic/pageHeading/presentational/FlexHeading';

const OptionValues = () => {
    const { isAnyEmpty, isAnyFetching, isAnyErrored, hasFetched } = useFetchBatchForOptionValues();
    const pinOptionSets = useSelector(selectPinOptionSets);
    const { setID, type } = useParams();

    const typeLink = PIN_OPTION_TYPES_LOOKUP[type];
    const specificSet = pinOptionSets[setID];

    const shouldRedirect = useShouldRedirectFromOptionValues(typeLink, hasFetched, specificSet);

    if (shouldRedirect) {
        return <Redirect to="/company/pin-options" />;
    }

    const name = specificSet ? specificSet.name : 'Loading...';

    return (
        <>
            <FlexHeading title={name} withBackButton />

            <BlockContainer isEmpty={isAnyEmpty} isFetching={isAnyFetching} error={isAnyErrored}>
                <OptionValuesList />
            </BlockContainer>
        </>
    );
};

export default OptionValues;
