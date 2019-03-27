import React from 'react';
import { Link } from 'react-router-dom';

const CompaniesListItem = ({ company }) => {
    const {
        name,
        telephone,
        addressLine1,
        addressLine2,
        postcode,
        id
    } = company;
    return (
        <tr>
            <td>{name}</td>
            <td>{telephone || 'Not listed'}</td>
            <td>
                {[addressLine1, addressLine2, postcode]
                    .filter(thing => thing)
                    .join(',')}
            </td>
            <td>
                <Link to={`/${id}`} className="button">
                    More info
                </Link>
            </td>
        </tr>
    );
};

export default CompaniesListItem;
