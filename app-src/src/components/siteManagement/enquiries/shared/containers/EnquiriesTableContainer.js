import React from 'react';
import { connect } from 'react-redux';
import EnquiriesTable from '../presentational/EnquiriesTable';

const EnquiriesTableContainer = ({ isFetching, error, enquiries }) => (
    <EnquiriesTable
        headers={['Name', 'Email', 'Contact Number', 'Sent On', '']}
        isFetching={isFetching}
        error={error}
        enquiries={enquiries}
    />
);

export default connect(({ enquiriesReducer }) => ({
    isFetching: enquiriesReducer.isFetching,
    error: enquiriesReducer.error,
    enquiries: Object.values(enquiriesReducer.enquiries)
}))(EnquiriesTableContainer);
