import React from 'react';
import { Redirect } from 'react-router-dom';

import { isEmpty } from 'helpers/generic';
import { getVersionForPinOptionDocument } from 'helpers/pinOptions';

import useShouldRedirectFromOptionDocuments from './hooks/useShouldRedirectFromOptionDocuments';
import useFilterDocuments from './hooks/useFilterDocuments';

import GridWrapper from 'components/shared/generic/gridWrapper/GridWrapper';
import DocumentPod from 'components/shared/documentPods/DocumentPod';
import ActionMenuActionButton from 'components/shared/actionMenu/ActionMenuActionButton';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';

const OptionDocumentsList = ({
    hasFetched,
    optionID,
    showDeleteModal,
    showEditModal,
    showViewModal,
    allDocuments,
    allDocumentsVersions,
    isCompanyOption,
}) => {
    const shouldRedirect = useShouldRedirectFromOptionDocuments(hasFetched);
    const { documents } = useFilterDocuments(allDocuments, optionID);

    if (shouldRedirect) {
        return <Redirect to="/company/pin-options" />;
    }

    if (isEmpty(documents)) {
        return <BlockContainer isEmpty noDataMessage="There is no documents to display" />;
    }

    const ActionMenuItems = documentsVersion => (
        <>
            <ActionMenuActionButton
                text="Edit Name"
                onClick={() => showEditModal(documentsVersion)}
                disabled={isCompanyOption}
            />
            <ActionMenuActionButton
                text="Delete"
                onClick={() => showDeleteModal(documentsVersion)}
                isNegative
                disabled={!isCompanyOption}
            />
        </>
    );

    return (
        documents && (
            <GridWrapper gap={15} itemsPerRow={5}>
                {documents.map(document => {
                    const documentsVersion = getVersionForPinOptionDocument(
                        document.id,
                        allDocumentsVersions,
                    );
                    return (
                        <DocumentPod
                            key={documentsVersion?.id}
                            name={documentsVersion?.name}
                            lastUpdated={documentsVersion?.createdOn}
                            s3Key={documentsVersion?.s3Key}
                            pinOptionDocumentID={documentsVersion?.pinOptionDocumentID}
                            actionMenuItems={
                                <ActionMenuItems
                                    disabled={isCompanyOption}
                                    documentsVersion={documentsVersion}
                                />
                            }
                            showViewModal={() => showViewModal(documentsVersion?.s3Key)}
                            isCompanyOption={isCompanyOption}
                        />
                    );
                })}
            </GridWrapper>
        )
    );
};

export default OptionDocumentsList;
