import React from 'react';
import moment from 'moment';
const EnquiriesListItem = ({ enquiry, handleShowModal }) => {
    return (
        <tr>
            <td>{enquiry.name}</td>
            <td>{enquiry.email}</td>
            <td>{enquiry.phoneNumber}</td>
            <td>{moment(enquiry.sentOn).format('DD-MM-YYYY hh:mm a')}</td>
            <td>
                <button
                    className="button"
                    onClick={() =>
                        console.log('hello you\'ve clicked the open button')
                    }
                >
                    Open
                </button>
                <button
                    className="button red"
                    onClick={() => handleShowModal(enquiry)}
                >
                    delete
                </button>
            </td>
        </tr>
    );
};

export default EnquiriesListItem;
