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
                <DateTimeContainer date={enquiry.createdOn} />
            </td>
            <td>
                <Link
                    className="button green icon-only"
                    to={`/admin/enquiries/${enquiry.id}`}
                >
                    <i className="fa fa-eye" />
                </Link>
                <button
                    className="button red icon-only"
                    onClick={() => handleShowModal(enquiry)}
                >
                    <i className="far fa-trash-alt" />
                </button>
            </td>
        </tr>
    );
};

export default EnquiriesListItem;
