import React from 'react';
import { connect } from 'react-redux';
import EnquiriesTable from '../presentational/EnquiriesTable';
import moment from 'moment';

const EnquiriesTableContainer = ({ isFetching, fetchingError, enquiries }) => (
    <EnquiriesTable
        headers={['Name', 'Company', 'Email', 'Contact Number', 'Sent On', '']}
        isFetching={isFetching}
        error={fetchingError}
        enquiries={enquiries}
    />
);

export default connect(({ superAdmin: { enquiriesReducer } }) => ({
    isFetching: enquiriesReducer.isFetching,
    fetchingError: enquiriesReducer.fetchingError,
    enquiries: Object.values(enquiriesReducer.enquiries).sort((a, b) =>
        moment(a.createdOn).isBefore(moment(b.createdOn))
    )
}))(EnquiriesTableContainer);
