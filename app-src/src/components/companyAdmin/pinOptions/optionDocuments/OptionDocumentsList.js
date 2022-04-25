import React from 'react';
import { Redirect } from 'react-router-dom';

import useShouldRedirectFromOptionDocuments from './hooks/useShouldRedirectFromOptionDocuments';

import GridWrapper from 'components/shared/generic/gridWrapper/GridWrapper';
import DocumentPod from 'components/shared/documentPods/DocumentPod';
import ActionMenuActionButton from 'components/shared/actionMenu/ActionMenuActionButton';
import { getVersionForPinOptionDocument } from 'helpers/pinOptions';
import useFilterDocuments from './hooks/useFilterDocuments';

const OptionDocumentsList = ({
    hasFetched,
    optionID,
    showDeleteModal,
    showEditModal,
    showViewModal,
    allDocuments,
    allDocumentsVersions,
}) => {
    const shouldRedirect = useShouldRedirectFromOptionDocuments(hasFetched);
    const { documents } = useFilterDocuments(allDocuments, optionID);

    if (shouldRedirect) {
        return <Redirect to="/company/pin-options" />;
    }

    const ActionMenuItems = documentsVersion => (
        <>
            <ActionMenuActionButton
                text="Edit Name"
                onClick={() => showEditModal(documentsVersion)}
            />
            <ActionMenuActionButton
                text="Delete"
                onClick={() => showDeleteModal(documentsVersion)}
                isNegative
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
                                <ActionMenuItems documentsVersion={documentsVersion} />
                            }
                            showViewModal={() => showViewModal(documentsVersion?.s3Key)}
                        />
                    );
                })}
            </GridWrapper>
        )
    );
};

export default OptionDocumentsList;
