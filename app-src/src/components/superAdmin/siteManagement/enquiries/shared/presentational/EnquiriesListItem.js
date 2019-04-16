import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
const EnquiriesListItem = ({ enquiry, handleShowModal }) => {
    return (
        <tr>
            <td>{enquiry.name}</td>
            <td>{enquiry.companyName}</td>

            <td>{enquiry.email}</td>
            <td>{enquiry.contactNumber}</td>
            <td>{moment(enquiry.sentOn).format('DD-MM-YYYY hh:mm a')}</td>
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
