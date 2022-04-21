import React from 'react';
import { Redirect } from 'react-router-dom';

import useShouldRedirectFromOptionDocuments from './hooks/useShouldRedirectFromOptionDocuments';

import GridWrapper from 'components/shared/generic/gridWrapper/GridWrapper';
import DocumentPod from 'components/shared/documentPods/DocumentPod';
import ActionMenuActionButton from 'components/shared/actionMenu/ActionMenuActionButton';
import useFetchPinOptionDocuments from './hooks/useFetchPinOptionDocuments';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import { isEmpty } from 'helpers/generic';

const OptionDocumentsList = ({ hasFetched, optionID, showDeleteModal }) => {
    const shouldRedirect = useShouldRedirectFromOptionDocuments(hasFetched);
    const { documentsVersions } = useFetchPinOptionDocuments(optionID);

    console.log(documentsVersions);

    if (shouldRedirect) {
        return <Redirect to="/company/pin-options" />;
    }

    const ActionMenuItems = ({ id }) => (
        <>
            <ActionMenuActionButton
                text="Edit Name"
                onClick={() => console.log(`Edit document ID ${id}`)}
            />
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
                        actionMenuItems={<ActionMenuItems id={document.id} />}
                    />
                ))}
            </GridWrapper>
        )
    );
};

export default OptionDocumentsList;
