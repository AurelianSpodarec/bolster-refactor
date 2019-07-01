import React from 'react';

import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';
import { DATE_TIME_IDS } from 'constants/companyAdmin/enums';

const CompaniesListItem = ({
    demoRequest: { id, name, companyName, contactNumber, email, createdOn },
    handleShowModal
}) => (
    <tr>
        <td>{name}</td>
        <td>{companyName || '-'}</td>
        <td>{email || '-'}</td>
        <td>{contactNumber}</td>
        <td>
            {createdOn ? (
                <DateTimeContainer
                    date={createdOn}
                    datetime={DATE_TIME_IDS.DATE}
                />
            ) : (
                '-'
            )}
        </td>
        <td>
            <button
                onClick={() => handleShowModal(id)}
                className="button red icon-only"
            >
                <i className="far fa-trash-alt" />
            </button>
        </td>
    </tr>
);

export default CompaniesListItem;
