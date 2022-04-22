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
    const { documentsVersions } = useFetchPinOptionDocuments(optionID);

    if (shouldRedirect) {
        return <Redirect to="/company/pin-options" />;
    }

    const ActionMenuItems = ({ id }, document) => (
        <>
            <ActionMenuActionButton text="Edit Name" onClick={() => showEditModal(document)} />
            <ActionMenuActionButton text="Delete" onClick={() => showDeleteModal(id)} isNegative />
        </>
    );

    return (
        documentsVersions && (
            <GridWrapper gap={15} itemsPerRow={5}>
                {documentsVersions.map(document => (
                    <DocumentPod
                        key={document.id}
                        name={document.name}
                        lastUpdated={document.createdOn}
                        s3Key={document.s3Key}
                        pinOptionDocumentID={document.pinOptionDocumentID}
                        actionMenuItems={<ActionMenuItems id={document.id} document={document} />}
                        showViewModal={() => showViewModal(document.s3Key)}
                    />
                ))}
            </GridWrapper>
        )
    );
};

export default OptionDocumentsList;
