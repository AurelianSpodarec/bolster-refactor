import React from 'react';
import { Link } from 'react-router-dom';

const SitesList = ({ sites }) =>
    sites.map(site => (
        <tr key={site.id}>
            <td>{sites.length}</td>
            <td>{site.name}</td>
            <td>{site.ownedBy}</td>
            <td>{site.permissions}</td>
            <td>
                <Link to={`sites/${site.id}`}>View</Link>
            </td>
        </tr>
    ));

export default SitesList;
