import React from 'react';
import { Link } from 'react-router-dom';

import SitesListContainer from '../containers/SitesListContainer';

const SitesListItem = ({ toggleExpand, isOpen, site }) => (
    <>
        <tr key={site.id} onClick={toggleExpand}>
            <td>{site.name}</td>
            <td>{site.ownedBy}</td>
            <td>{site.permissions}</td>
            <td>
                <Link to={`sites/${site.id}`}>View</Link>
            </td>
        </tr>
        {isOpen && (
            <tr>
                <td colSpan="4">
                    <SitesListContainer />
                </td>
            </tr>
        )}
    </>
);

export default SitesListItem;
