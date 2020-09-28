import React from 'react';
import { connect } from 'react-redux';
import ContactSubmissionsTable from '../presentational/ContactSubmissionsTable';
import moment from 'moment';

const ContactSubmissionsTableContainer = ({ isFetching, fetchingError, contactSubmissions }) => (
    <ContactSubmissionsTable
        headers={['Name', 'Company', 'Email', 'Contact Number', 'Sent On', 'Contacted', '']}
        isFetching={isFetching}
        error={fetchingError}
        contactSubmissions={contactSubmissions}
    />
);

export default connect(({ superAdmin: { contactSubmissionsReducer } }) => ({
    isFetching: contactSubmissionsReducer.isFetching,
    fetchingError: contactSubmissionsReducer.fetchingError,
    contactSubmissions: Object.values(contactSubmissionsReducer.contactSubmissions).sort(
        (a, b) => new Date(b.createdOn) - new Date(a.createdOn),
    ),
}))(ContactSubmissionsTableContainer);
