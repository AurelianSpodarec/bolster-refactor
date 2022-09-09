import React from 'react';
import Table from 'components/shared/generic/tables/presentational/Table';
import ContactSubmissionsList from './ContactSubmissionsList';

const ContactSubmissionsTable = ({ headers, isFetching, error, contactSubmissions }) => (
    <Table
        withActions
        headers={headers}
        error={error}
        noData={!contactSubmissions.length}
        isFetching={isFetching}
        noDataMessage="No Contact Submissions to display"
    >
        <ContactSubmissionsList colCount={headers.length} contactSubmissions={contactSubmissions} />
    </Table>
);

export default ContactSubmissionsTable;
