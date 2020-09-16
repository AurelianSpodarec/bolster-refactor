import React from 'react';
import { Link } from 'react-router-dom';
import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';

const ContactSubmissionsListItem = ({
    contactSubmission,
    handleShowModal,
    handleMarkContacted,
}) => {
    return (
        <tr>
            <td>{contactSubmission.name}</td>
            <td>{contactSubmission.companyName}</td>

            <td>{contactSubmission.email}</td>
            <td>{contactSubmission.contactNumber}</td>
            <td>
                <DateTimeContainer date={contactSubmission.createdOn} />
            </td>
            <td>{contactSubmission.contacted ? 'Yes' : 'No'}</td>
            <td>
                <button
                    onClick={() => handleMarkContacted(contactSubmission.id)}
                    className="button icon-only"
                >
                    {contactSubmission.contacted ? (
                        <i className="fa fa-bell-slash" />
                    ) : (
                        <i className="fa fa-bell" />
                    )}
                </button>
                <Link
                    className="button green icon-only"
                    to={`/admin/contact-submissions/${contactSubmission.id}`}
                >
                    <i className="fa fa-eye" />
                </Link>
                <button
                    className="button red icon-only"
                    onClick={() => handleShowModal(contactSubmission)}
                >
                    <i className="far fa-trash-alt" />
                </button>
            </td>
        </tr>
    );
};

export default ContactSubmissionsListItem;
