import React from 'react';
import { useHistory } from 'react-router-dom';
import BlockTable from '../presentational/BlockTable';

const headers = ['Name', 'Status', 'Type', 'Published On', ''];

const BlockTableContainer = ({ documents, isFetching, title, type }) => {
    const history = useHistory();
    const goToNewLegalDocument = () => history.push('/admin/legal-documents/new', { type });

    return (
        <BlockTable
            title={title}
            documents={documents}
            isFetching={isFetching}
            headers={headers}
            createDocument={goToNewLegalDocument}
        />
    );
};

export default BlockTableContainer;
