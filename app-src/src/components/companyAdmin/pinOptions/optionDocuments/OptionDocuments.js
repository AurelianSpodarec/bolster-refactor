import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { isEmpty } from 'helpers/generic';

import { selectPinOptions } from 'selectors/companyAdmin/pinOptions';
import { selectLatestVersionForPinOption } from 'selectors/companyAdmin/pinOptionVersions';
import { selectJwtData } from 'selectors/shared/jwt';

import useFetchBatchForOptionDocuments from './hooks/useFetchBatchForOptionDocuments';
import useDocumentsSetActions from './hooks/useDocumentsSetActions';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import OptionDocumentsList from './OptionDocumentsList';
import ButtonWrapper from 'components/shared/generic/button/presentational/ButtonWrapper';
import ActionButton from 'components/shared/generic/button/presentational/ActionButton';
import FlexHeading from 'components/shared/generic/pageHeading/presentational/FlexHeading';

const OptionDocuments = () => {
    const { optionID } = useParams();
    const pinOptions = useSelector(selectPinOptions);
    const { companyID } = useSelector(selectJwtData);

    const specificOption = pinOptions[optionID];
    const {
        isAnyEmpty,
        isAnyFetching,
        isAnyErrored,
        hasFetched,
        allDocuments,
        allDocumentsVersions,
    } = useFetchBatchForOptionDocuments(optionID);

    const latestPinOptionVersion = useSelector(state =>
        selectLatestVersionForPinOption(state, specificOption?.id),
    );

    const name =
        specificOption && !isEmpty(latestPinOptionVersion)
            ? latestPinOptionVersion.name
            : 'Loading...';

    const { showAddModal, showEditModal, showDeleteModal, showViewModal } =
        useDocumentsSetActions(optionID);

    const isCompanyOption = specificOption?.companyID === companyID;

    return (
        <>
            <FlexHeading title={name} withBackButton>
                <ButtonWrapper alignment="right">
                    {isCompanyOption && (
                        <ActionButton
                            text="Upload"
                            icon="file-plus"
                            size="medium"
                            onClick={() => showAddModal(optionID)}
                        />
                    )}
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
                    showViewModal={showViewModal}
                    allDocuments={allDocuments}
                    allDocumentsVersions={allDocumentsVersions}
                    companyID={companyID}
                    isCompanyOption={isCompanyOption}
                />
            </BlockContainer>
        </>
    );
};

export default OptionDocuments;
