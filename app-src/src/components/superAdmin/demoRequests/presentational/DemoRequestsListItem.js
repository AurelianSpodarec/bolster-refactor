import React from 'react';

import { Link } from 'react-router-dom';
import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';

const DemoRequestsListItem = ({
    demoRequest: { id, name, companyName, contactNumber, email, contacted, createdOn },
    handleShowModal,
    handleMarkContacted,
}) => (
    <tr>
        <td>{name}</td>
        <td>{companyName || '-'}</td>
        <td>{email || '-'}</td>
        <td>{contactNumber}</td>
        <td>{contacted ? 'Yes' : 'No'}</td>
        <td>{createdOn ? <DateTimeContainer date={createdOn} /> : '-'}</td>
        <td>
            <div className="flex-container icon-only">
                <button onClick={() => handleMarkContacted(id)} className="button">
                    Mark as {contacted ? 'Uncontacted' : 'Contacted'}
                </button>
                <Link className="button centered green icon-only" to={`/admin/demo-requests/${id}`}>
                    <i className="fa fa-eye" />
                </Link>
                <button onClick={() => handleShowModal(id)} className="button red icon-only">
                    <i className="far fa-trash-alt" />
                </button>
            </div>
        </td>
    </tr>
);

export default DemoRequestsListItem;
