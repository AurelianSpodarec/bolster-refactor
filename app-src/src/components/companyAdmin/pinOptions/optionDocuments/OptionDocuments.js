import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, useParams } from 'react-router-dom';

import { PIN_OPTION_TYPES_LOOKUP } from 'constants/companyAdmin/enums';
import { getVersionNameForPinOption } from 'helpers/pinOptions';

import { selectPinOptions } from 'selectors/companyAdmin/pinOptions';
import { selectPinOptionSets } from 'selectors/companyAdmin/pinOptionSets';
import { selectPinOptionVersionsArr } from 'selectors/companyAdmin/pinOptionVersions';

import useFetchBatchForOptionDocuments from './hooks/useFetchBatchForOptionDocuments';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';

const OptionDocuments = () => {
    const { isAnyEmpty, isAnyFetching, isAnyErrored, hasFetched } =
        useFetchBatchForOptionDocuments();

    const pinOptionSets = useSelector(selectPinOptionSets);
    const pinOptionVersionsArr = useSelector(selectPinOptionVersionsArr);
    const pinOptions = useSelector(selectPinOptions);

    const { optionID, setID, type } = useParams();

    const typeLink = PIN_OPTION_TYPES_LOOKUP[type];
    const specificSet = pinOptionSets[setID];
    const specificOption = pinOptions[optionID];

    if (!typeLink || (hasFetched && !specificSet)) {
        return <Redirect to="/company/pin-options" />;
    }

    if (hasFetched && !specificOption) {
        return <Redirect to={`/company/pin-options/${type}/${setID}`} />;
    }

    const name =
        !isAnyFetching && !isAnyErrored && specificOption
            ? getVersionNameForPinOption(specificOption.id, pinOptionVersionsArr)
            : 'Loading...';

    return (
        <>
            <PageHeading title={name} withBackButton />

            <BlockContainer isEmpty={isAnyEmpty} isFetching={isAnyFetching} error={isAnyErrored}>
                <p>Documents here...</p>
            </BlockContainer>
        </>
    );
};

export default OptionDocuments;
