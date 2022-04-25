import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { isEmpty } from 'helpers/generic';

import { selectPinOptionSet } from 'selectors/companyAdmin/pinOptionSets';

import useFetchBatchForOptionValues from './hooks/useFetchBatchForOptionValues';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import OptionValuesList from './OptionValuesList';
import FlexHeading from 'components/shared/generic/pageHeading/presentational/FlexHeading';

const OptionValues = () => {
    const { isAnyEmpty, isAnyFetching, isAnyErrored, hasFetched } = useFetchBatchForOptionValues();
    const { setID } = useParams();
    const parentSet = useSelector(state => selectPinOptionSet(state, setID));

    const name = !isEmpty(parentSet) ? parentSet.name : 'Loading...';

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
