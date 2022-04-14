import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { selectPinOptionSets } from 'selectors/companyAdmin/pinOptionSets';

import useFetchBatchForOptionValues from './hooks/useFetchBatchForOptionValues';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import OptionValuesList from './OptionValuesList';
import FlexHeading from 'components/shared/generic/pageHeading/presentational/FlexHeading';

const OptionValues = () => {
    const { isAnyEmpty, isAnyFetching, isAnyErrored, hasFetched } = useFetchBatchForOptionValues();
    const pinOptionSets = useSelector(selectPinOptionSets);
    const { setID } = useParams();

    const specificSet = pinOptionSets[setID];

    const name = specificSet ? specificSet.name : 'Loading...';

    return (
        <>
            <FlexHeading title={name} withBackButton />

            <BlockContainer isEmpty={isAnyEmpty} isFetching={isAnyFetching} error={isAnyErrored}>
                <OptionValuesList hasFetched={hasFetched} />
            </BlockContainer>
        </>
    );
};

export default OptionValues;
