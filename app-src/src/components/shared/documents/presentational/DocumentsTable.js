import React from 'react';
import { withRouter, Link } from 'react-router-dom';

import Table from 'components/shared/generic/tables/presentational/Table';
import DocumentsList from './DocumentsList';

const DocumentsTable = ({ location, documents, isFetching, error }) => {
    const tableHeaders = ['Name', 'Actions'];

    return (
        <div className="size-lg-12">
            <h1 className="heading heading-3 size-lg-12">Documents</h1>
            <Table
                headers={tableHeaders}
                isFetching={isFetching}
                error={error}
                noData={!documents.length}
                noDataMessage="There are no credit logs to display."
            >
                <DocumentsList documents={documents} />
            </Table>
            <Link
                className="button"
                to={`${location.pathname}/attach-document`}
            >
                <i className="fal fa-plus" /> Add document
            </Link>
        </div>
    );
};

export default withRouter(DocumentsTable);
