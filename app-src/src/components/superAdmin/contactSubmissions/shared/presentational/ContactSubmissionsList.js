import React from 'react';
import ContactSubmissionsItemContainer from '../containers/ContactSubmissionsListItemContainer';

const ContactSubmissions = ({ contactSubmissions, colCount }) => {
    return contactSubmissions.map(contactSubmission => (
        <ContactSubmissionsItemContainer
            key={contactSubmission.id}
            colCount={colCount}
            contactSubmission={contactSubmission}
        />
    ));
};

export default ContactSubmissions;
