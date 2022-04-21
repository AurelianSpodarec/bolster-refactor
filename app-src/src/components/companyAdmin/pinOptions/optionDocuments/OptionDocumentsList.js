import React from 'react';
import { Redirect } from 'react-router-dom';

import useShouldRedirectFromOptionDocuments from './hooks/useShouldRedirectFromOptionDocuments';

import GridWrapper from 'components/shared/generic/gridWrapper/GridWrapper';
import DocumentPod from 'components/shared/documentPods/DocumentPod';
import ActionMenuActionButton from 'components/shared/actionMenu/ActionMenuActionButton';
import useFetchPinOptionDocuments from './hooks/useFetchPinOptionDocuments';

const OptionDocumentsList = ({ hasFetched, optionID }) => {
    const shouldRedirect = useShouldRedirectFromOptionDocuments(hasFetched);
    const { allDocuments, documentsVersions, documentsError, isFetchingDocuments } =
        useFetchPinOptionDocuments(optionID);
    console.log({ allDocuments });
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
            <ActionMenuActionButton
                text="Add New Version"
                onClick={() => console.log(`Add version for document ID ${id}`)}
            />
            <ActionMenuActionButton
                text="Delete"
                onClick={() => console.log(`Delete document ID ${id}`)}
                isNegative
            />
        </>
    );

    return (
        <GridWrapper gap={15} itemsPerRow={5}>
            {allDocuments.map(document => (
                <DocumentPod
                    key={document.id}
                    name={document.name}
                    lastUpdated={document.lastUpdated}
                    actionMenuItems={<ActionMenuItems id={document.id} />}
                />
            ))}
        </GridWrapper>
    );
};

export default OptionDocumentsList;
