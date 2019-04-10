import React from 'react';
import { withRouter, Link } from 'react-router-dom';

import Table from 'components/shared/generic/tables/presentational/Table';
import DocumentsList from './DocumentsList';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';

const DocumentsTable = ({ location, documents, isFetching }) => {
    return (
        <div className="size-lg-12">
            <BlockHeading title="Documents" classes="w-table">
                <Link
                    className="button pull-right"
                    to={`${location.pathname}/attach-document`}
                >
                    <i className="fa fa-plus" /> Add
                </Link>
            </BlockHeading>
            <div className="table-container size-lg-12">
                <Table
                    headers={['Name', 'Actions']}
                    isFetching={isFetching}
                    noData={!documents.length}
                    noDataMessage="There are no documents to display."
                    withActions
                >
                    <DocumentsList location={location} documents={documents} />
                </Table>
            </div>
        </div>
    );
};

export default withRouter(DocumentsTable);
