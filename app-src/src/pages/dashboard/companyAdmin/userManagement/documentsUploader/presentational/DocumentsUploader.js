import React from 'react';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import BackButtonContainer from 'components/shared/generic/backButton/containers/BackButtonContainer';
import DocumentsTable from './DocumentsTable';

const DocumentsUploader = ({ documents, adminName, newButton, deleteButton }) => (
    <>
        <PageHeading leftChildren={true} title={adminName}>
            <BackButtonContainer />
        </PageHeading>
        <BlockContainer>
            <BlockHeading title="User Documents">
                <button onClick={newButton} className="button green">
                    <i className="fa fa-plus" /> Upload Document
                </button>
            </BlockHeading>
            <DocumentsTable documents={documents} deleteButton={deleteButton} />
        </BlockContainer>
    </>
);

export default DocumentsUploader;
