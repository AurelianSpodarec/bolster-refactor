import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { getVersionNameForPinOption } from 'helpers/pinOptions';

import { selectPinOptions } from 'selectors/companyAdmin/pinOptions';
import { selectPinOptionVersionsArr } from 'selectors/companyAdmin/pinOptionVersions';

import useFetchBatchForOptionDocuments from './hooks/useFetchBatchForOptionDocuments';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import OptionDocumentsList from './OptionDocumentsList';
import ButtonWrapper from 'components/shared/generic/button/presentational/ButtonWrapper';
import ActionButton from 'components/shared/generic/button/presentational/ActionButton';
import FlexHeading from 'components/shared/generic/pageHeading/presentational/FlexHeading';

const OptionDocuments = () => {
    const { isAnyEmpty, isAnyFetching, isAnyErrored, hasFetched } =
        useFetchBatchForOptionDocuments();

    const pinOptionVersionsArr = useSelector(selectPinOptionVersionsArr);
    const pinOptions = useSelector(selectPinOptions);

    const { optionID } = useParams();

    const specificOption = pinOptions[optionID];

    const name = specificOption
        ? getVersionNameForPinOption(specificOption.id, pinOptionVersionsArr)
        : 'Loading...';

    return (
        <>
            <FlexHeading title={name} withBackButton>
                <ButtonWrapper alignment="right">
                    <ActionButton
                        text="Upload"
                        icon="file-plus"
                        size="medium"
                        onClick={() => console.log('Upload new...')}
                    />
                </ButtonWrapper>
            </FlexHeading>

            <BlockContainer
                isEmpty={isAnyEmpty}
                isFetching={isAnyFetching}
                error={isAnyErrored}
                noWhiteBackground
            >
                <OptionDocumentsList hasFetched={hasFetched} />
            </BlockContainer>
        </>
    );
};

export default OptionDocuments;
