import React from 'react';
import { Link } from 'react-router-dom';

const SitesListItem = ({ toggleExpand, isOpen, site }) => (
    <tbody>
        <tr key={site.id} onClick={toggleExpand}>
            <td>{site.name}</td>
            <td>{site.ownedBy}</td>
            <td>{site.permissions}</td>
            <td>
                <Link to={`sites/${site.id}`}>View</Link>
            </td>

            {isOpen && <td>{'I\'m open!'}</td>}
        </tr>
    </tbody>
);

export default SitesListItem;
