import React from 'react';
import moment from 'moment';
import { Link, withRouter } from 'react-router-dom';

const CompaniesListItem = ({
    company: { name, telephone, address, id, termsAcceptedOn },
    match: { url }
}) => (
    <tr>
        <td>{name}</td>
        <td>{telephone || '##Not listed##'}</td>
        <td>{address || '##Not listed##'}</td>
        <td>
            {termsAcceptedOn
                ? moment(termsAcceptedOn).format('DD/MM/YYYY')
                : '-'}
        </td>
        <td>
            <Link to={`${url}/${id}`} className="button">
                More info
            </Link>
        </td>
    </tr>
);

export default withRouter(CompaniesListItem);
