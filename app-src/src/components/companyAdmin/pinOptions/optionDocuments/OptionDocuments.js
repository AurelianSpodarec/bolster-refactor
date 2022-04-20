import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { isEmpty } from 'helpers/generic';

import { selectPinOptions } from 'selectors/companyAdmin/pinOptions';
import { selectLatestVersionForPinOption } from 'selectors/companyAdmin/pinOptionVersions';

import useFetchBatchForOptionDocuments from './hooks/useFetchBatchForOptionDocuments';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import OptionDocumentsList from './OptionDocumentsList';
import ButtonWrapper from 'components/shared/generic/button/presentational/ButtonWrapper';
import ActionButton from 'components/shared/generic/button/presentational/ActionButton';
import FlexHeading from 'components/shared/generic/pageHeading/presentational/FlexHeading';

const OptionDocuments = () => {
    const { optionID } = useParams();
    const pinOptions = useSelector(selectPinOptions);

    const specificOption = pinOptions[optionID];
    const { isAnyEmpty, isAnyFetching, isAnyErrored, hasFetched } =
        useFetchBatchForOptionDocuments(optionID);

    const latestPinOptionVersion = useSelector(state =>
        selectLatestVersionForPinOption(state, specificOption.id),
    );

    const name =
        specificOption && !isEmpty(latestPinOptionVersion)
            ? latestPinOptionVersion.name
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
