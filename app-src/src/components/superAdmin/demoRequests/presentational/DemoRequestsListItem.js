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
            <button onClick={() => handleMarkContacted(id)} className="button icon-only">
                {contacted ? <i className="fa fa-bell-slash" /> : <i className="fa fa-bell" />}
            </button>
            <Link className="button green icon-only" to={`/admin/demo-requests/${id}`}>
                <i className="fa fa-eye" />
            </Link>
            <button onClick={() => handleShowModal(id)} className="button red icon-only">
                <i className="far fa-trash-alt" />
            </button>
        </td>
    </tr>
);

export default DemoRequestsListItem;
