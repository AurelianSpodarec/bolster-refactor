import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';

const CompaniesListItem = ({
    company: { name, telephone, address, id, termsAcceptedOn }
}) => (
    <tr>
        <td>{name}</td>
        <td>{telephone || '##Not listed##'}</td>
        <td>{address || '##Not listed##'}</td>
        <td>{moment(termsAcceptedOn).format('DD/MM/YYYY')}</td>
        <td>
            <Link to={`/${id}`} className="button">
                More info
            </Link>
        </td>
    </tr>
);

export default CompaniesListItem;
