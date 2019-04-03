import React from 'react';
import { withRouter, Link } from 'react-router-dom';

import Table from 'components/shared/generic/tables/presentational/Table';
import DocumentsList from './DocumentsList';

const DocumentsTable = ({ location, documents, isFetching }) => {
    return (
        <div className="size-lg-12">
            <h3 className="heading heading-3">Documents</h3>
            <Table
                headers={['Name', 'Actions']}
                isFetching={isFetching}
                noData={!documents.length}
                noDataMessage="There are no documents to display."
                withActions
            >
                <DocumentsList location={location} documents={documents} />
            </Table>
            <div className="button-container table">
                <Link
                    className="button pull-right"
                    to={`${location.pathname}/attach-document`}
                >
                    <i className="fal fa-plus" /> Add document
                </Link>
            </div>
        </div>
    );
};

export default withRouter(DocumentsTable);
