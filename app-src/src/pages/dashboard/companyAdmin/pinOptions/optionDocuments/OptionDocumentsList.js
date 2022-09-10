import React from 'react';
import { Redirect } from 'react-router-dom';

import { isEmpty } from 'helpers/generic';
import { getLatestVersionForPinOptionDocument } from 'helpers/pinOptions';

import useShouldRedirectFromOptionDocuments from './hooks/useShouldRedirectFromOptionDocuments';
import useFilterDocuments from './hooks/useFilterDocuments';

import GridWrapper from 'components_DEPRECATED/shared/generic/gridWrapper/GridWrapper';
import DocumentPod from 'components_DEPRECATED/shared/documentPods/DocumentPod';
import ActionMenuActionButton from 'components_DEPRECATED/shared/actionMenu/ActionMenuActionButton';
import BlockContainer from 'components_DEPRECATED/shared/generic/block/containers/BlockContainer';

const OptionDocumentsList = ({
    hasFetched,
    optionID,
    showDeleteModal,
    showEditModal,
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
                            isCompanyOption ? (
                                <ActionMenuItems
                                    document={document}
                                    documentsVersion={latestVersion}
                                />
                            ) : null
                        }
                    />
                );
            })}
        </GridWrapper>
    );
};

export default OptionDocumentsList;
