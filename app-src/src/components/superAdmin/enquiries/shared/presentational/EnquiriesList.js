import React from 'react';
import EnquiriesListItemContainer from '../containers/EnquiriesListItemContainer';

const EnquiriesList = ({ enquiries, colCount }) =>
    enquiries.map(enquiry => (
        <EnquiriesListItemContainer
            key={enquiry.id}
            colCount={colCount}
            enquiry={enquiry}
        />
    ));

export default EnquiriesList;
