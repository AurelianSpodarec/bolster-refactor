import React from 'react';
import { Link } from 'react-router-dom';

const BuldingsListItem = ({ building }) => (
    <tr key={building.id}>
        <td>{building.name}</td>
        <td>{building.permissions}</td>
        <td>
            <Link
                className="button light-blue"
                to={`/buildings/${building.id}`}
            >
                View
            </Link>
        </td>
    </tr>
);

export default BuldingsListItem;
