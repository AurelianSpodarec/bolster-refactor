import React from 'react';
import { connect } from 'react-redux';
import EnquiriesTable from '../presentational/EnquiriesTable';

const EnquiriesTableContainer = ({ isFetching, fetchingError, enquiries }) => (
    <EnquiriesTable
        headers={['Name', 'Email', 'Contact Number', 'Sent On', '']}
        isFetching={isFetching}
        error={fetchingError}
        enquiries={enquiries}
    />
);

export default connect(({ enquiriesReducer }) => ({
    isFetching: enquiriesReducer.isFetching,
    fetchingError: enquiriesReducer.fetchingError,
    enquiries: Object.values(enquiriesReducer.enquiries)
}))(EnquiriesTableContainer);
