import React from 'react';

import useFetchBatchForOptionValues from './hooks/useFetchBatchForOptionValues';

import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import OptionValuesList from './OptionValuesList';

const OptionValues = () => {
    const { isAnyEmpty, isAnyFetching, isAnyErrored } = useFetchBatchForOptionValues();

    return (
        <>
            <PageHeading title="Pin Options" withBackButton />

            <BlockContainer isEmpty={isAnyEmpty} isFetching={isAnyFetching} error={isAnyErrored}>
                <OptionValuesList />
            </BlockContainer>
        </>
    );
};

export default OptionValues;
