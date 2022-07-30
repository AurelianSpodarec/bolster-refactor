import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { isEmpty } from 'helpers/generic';

import setPinOptionsTypesSelectedTabID from 'actions/superAdmin/pinOptions/sync/setPinOptionsTypesSelectedTabID';
import { selectPinOptionSets } from 'selectors/superAdmin/pinOptionSets';

import useFetchBatchForOptionValues from './hooks/useFetchBatchForOptionValues';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import FlexHeading from 'components/shared/generic/pageHeading/presentational/FlexHeading';
import OptionValuesList from './OptionValuesList';

const OptionValues = () => {
    const dispatch = useDispatch();
    const { isAnyEmpty, isAnyFetching, isAnyErrored, hasFetched } = useFetchBatchForOptionValues();
    const pinOptionSets = useSelector(selectPinOptionSets);
    const { setID } = useParams();

    const specificSet = pinOptionSets[setID];

    useEffect(() => {
        if (!isEmpty(specificSet)) {
            dispatch(setPinOptionsTypesSelectedTabID(specificSet.pinOptionTypeID));
        }
    }, [specificSet]);

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
