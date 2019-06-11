import React from 'react';
import Table from 'components/shared/generic/tables/presentational/Table';
import DocumentResponsesTableItemContainer from '../containers/DocumentResponsesTableItemContainer';

const DocumentResponsesTable = ({ responses, users, isFetching }) => (
    <Table
        headers={['Agreed By', 'Agreed On', 'Upsynced On']}
        isFetching={isFetching}
        noData={!responses.length}
        noDataMessage="No responses to display for this document."
    >
        {responses.map(response => (
            <DocumentResponsesTableItemContainer
                key={response.id}
                response={response}
                user={users[response.createdByCompanyUserID] || {}}
            />
        ))}
    </Table>
);

export default DocumentResponsesTable;
