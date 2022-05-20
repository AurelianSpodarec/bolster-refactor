import React from 'react';

import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useFetchBatchForOptionDocuments from './hooks/useFetchBatchForOptionDocuments';
import useDocumentsSetActions from './hooks/useDocumentsSetActions';

import { isEmpty } from '../../../../helpers/generic';

import { selectPinOptions } from '../../../../selectors/superAdmin/pinOptions';
import { selectLatestVersionForPinOption } from '../../../../selectors/superAdmin/pinOptionVersions';

import FlexHeading from '../../../shared/generic/pageHeading/presentational/FlexHeading';
import ButtonWrapper from '../../../shared/generic/button/presentational/ButtonWrapper';
import ActionButton from '../../../shared/generic/button/presentational/ActionButton';
import BlockContainer from '../../../shared/generic/block/containers/BlockContainer';
import OptionDocumentsList from './OptionDocumentsList';

const OptionDocuments = () => {
    const { optionID } = useParams();
    const pinOptions = useSelector(selectPinOptions);

    const specificOption = pinOptions[optionID];
    const {
        isAnyEmpty,
        isAnyFetching,
        isAnyErrored,
        hasFetched,
        allDocuments,
        allDocumentsVersions,
    } = useFetchBatchForOptionDocuments();

    const latestPinOptionVersion = useSelector(state =>
        selectLatestVersionForPinOption(state, specificOption?.id),
    );

    const name =
        specificOption && !isEmpty(latestPinOptionVersion)
            ? latestPinOptionVersion.name
            : 'Loading...';

    const { showAddModal, showEditModal, showDeleteModal } = useDocumentsSetActions(optionID);

    return (
        <>
            <FlexHeading title={name} withBackButton>
                <ButtonWrapper>
                    <ActionButton
                        text="Upload"
                        icon="file-plus"
                        size="medium"
                        onClick={() => showAddModal(optionID)}
                    />
                </ButtonWrapper>
            </FlexHeading>

            <BlockContainer
                isEmpty={isAnyEmpty}
                isFetching={isAnyFetching}
                error={isAnyErrored}
                noWhiteBackground
            >
                <OptionDocumentsList
                    optionID={optionID}
                    hasFetched={hasFetched}
                    showDeleteModal={showDeleteModal}
                    showEditModal={showEditModal}
                    allDocuments={allDocuments}
                    allDocumentsVersions={allDocumentsVersions}
                />
            </BlockContainer>
        </>
    );
};

export default OptionDocuments;
