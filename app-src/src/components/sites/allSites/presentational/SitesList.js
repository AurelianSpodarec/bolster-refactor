import React from 'react';

const SitesList = ({ sites }) =>
    sites.map(site => (
        <tr key={site.id}>
            <td>{sites.length}</td>
            <td>{site.name}</td>
            <td>{site.ownedBy}</td>
            <td>{site.permissions}</td>
            <td>View</td>
        </tr>
    ));

export default SitesList;
