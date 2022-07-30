import React, { useMemo } from 'react';
import { Redirect } from 'react-router-dom';

import { isEmpty } from 'helpers/generic';
import { getLatestVersionForPinOptionDocument } from 'helpers/pinOptions';

import GridWrapper from 'components/shared/generic/gridWrapper/GridWrapper';
import DocumentPod from 'components/shared/documentPods/DocumentPod';
import ActionMenuActionButton from 'components/shared/actionMenu/ActionMenuActionButton';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import useShouldRedirectFromOptionDocuments from './hooks/useShouldRedirectFromOptionDocuments';

const OptionDocumentsList = ({
    hasFetched,
    optionID,
    showDeleteModal,
    showEditModal,
    allDocuments,
    allDocumentsVersions,
}) => {
    const shouldRedirect = useShouldRedirectFromOptionDocuments(hasFetched);

    const documents = useMemo(() => {
        return allDocuments.filter(
            document => document.pinOptionID === parseInt(optionID) && !document.isDeleted,
        );
    }, [allDocuments, optionID]);

    if (shouldRedirect) {
        return <Redirect to="/admin/pin-options" />;
    }

    if (isEmpty(documents)) {
        return <BlockContainer isEmpty noDataMessage="There is no documents to display" />;
    }

    const ActionMenuItems = ({ document, documentsVersion }) => (
        <>
            <ActionMenuActionButton
                text="Add new version"
                onClick={() => showEditModal(documentsVersion)}
            />
            <ActionMenuActionButton
                text="Delete"
                onClick={() => showDeleteModal(document, documentsVersion)}
                isNegative
            />
        </>
    );

    return (
        <GridWrapper containerClass="horizontal-margin" gap={15} itemsPerRow={5}>
            {documents.map(document => {
                const latestVersion = getLatestVersionForPinOptionDocument(
                    document.id,
                    allDocumentsVersions,
                );

                if (isEmpty(latestVersion)) return null;

                return (
                    <DocumentPod
                        key={latestVersion.id}
                        name={latestVersion.name}
                        lastUpdated={latestVersion.createdOn}
                        s3Key={latestVersion.s3Key}
                        actionMenuItems={
                            <ActionMenuItems document={document} documentsVersion={latestVersion} />
                        }
                    />
                );
            })}
        </GridWrapper>
    );
};

export default OptionDocumentsList;
