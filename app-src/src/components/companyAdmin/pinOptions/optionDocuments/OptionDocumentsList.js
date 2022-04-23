import React from 'react';
import { Redirect } from 'react-router-dom';

import useShouldRedirectFromOptionDocuments from './hooks/useShouldRedirectFromOptionDocuments';

import GridWrapper from 'components/shared/generic/gridWrapper/GridWrapper';
import DocumentPod from 'components/shared/documentPods/DocumentPod';
import ActionMenuActionButton from 'components/shared/actionMenu/ActionMenuActionButton';
import useFetchPinOptionDocuments from './hooks/useFetchPinOptionDocuments';

const OptionDocumentsList = ({
    hasFetched,
    optionID,
    showDeleteModal,
    showEditModal,
    showViewModal,
}) => {
    const shouldRedirect = useShouldRedirectFromOptionDocuments(hasFetched);
    const { documentsVersions, documents } = useFetchPinOptionDocuments(optionID);

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
                {documentsVersions.map(documentsVersion => (
                    <DocumentPod
                        key={documentsVersion.id}
                        name={documentsVersion.name}
                        lastUpdated={documentsVersion.createdOn}
                        s3Key={documentsVersion.s3Key}
                        pinOptionDocumentID={documentsVersion.pinOptionDocumentID}
                        actionMenuItems={<ActionMenuItems documentsVersion={documentsVersion} />}
                        showViewModal={() => showViewModal(documentsVersion.s3Key)}
                    />
                ))}
            </GridWrapper>
        )
    );
};

export default OptionDocumentsList;
