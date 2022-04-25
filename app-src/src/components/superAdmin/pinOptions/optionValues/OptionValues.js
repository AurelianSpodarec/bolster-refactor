import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import useFetchBatchForOptionValues from './hooks/useFetchBatchForOptionValues';

import { selectPinOptionSets } from 'selectors/superAdmin/pinOptionSets';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import FlexHeading from 'components/shared/generic/pageHeading/presentational/FlexHeading';

import OptionValuesList from './OptionValuesList';

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
