import React from 'react';
import AllLegalDocumentsTable from '../presentational/AllLegalDocumentsTable';

const AllLegalDocumentsTableContainer = () => {
    const documents = [{ id: 1, name: 'Terms and Conditions', version: 1 }];

    return <AllLegalDocumentsTable documents={documents} />;
};

export default AllLegalDocumentsTableContainer;
