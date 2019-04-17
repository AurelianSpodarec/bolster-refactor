import React from 'react';
import { Link } from 'react-router-dom';
import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';
const EnquiriesListItem = ({ enquiry, handleShowModal }) => {
    return (
        <tr>
            <td>{enquiry.name}</td>
            <td>{enquiry.companyName}</td>

            <td>{enquiry.email}</td>
            <td>{enquiry.contactNumber}</td>
            <td>
                <DateTimeContainer date={enquiry.sentOn} />
            </td>
            <td>
                <Link className="button" to={`${enquiry.id}`}>
                    open
                </Link>
                <button
                    className="button red"
                    onClick={() => handleShowModal(enquiry)}
                >
                    <i className="far fa-trash-alt" /> Delete
                </button>
            </td>
        </tr>
    );
};

export default EnquiriesListItem;
