import React from 'react';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import BlockTableContainer from '../containers/BlockTableContainer';

const AllLegalDocumentsTable = ({ documents, isFetching }) => {
    return (
        <>
            <PageHeading title="Legal Documents" />
            <BlockTableContainer
                documents={documents.filter(({ type }) => type === 10)}
                isFetching={isFetching}
                title="Terms and Conditions Documents"
                type={10}
            />
            <BlockTableContainer
                documents={documents.filter(({ type }) => type === 20)}
                isFetching={isFetching}
                title="EULA Documents"
                type={20}
            />
            <BlockTableContainer
                documents={documents.filter(({ type }) => type === 30)}
                isFetching={isFetching}
                title="Privacy Policy Documents"
                type={30}
            />
        </>
    );
};

export default AllLegalDocumentsTable;
