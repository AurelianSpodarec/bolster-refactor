import React from 'react';
import { Link } from 'react-router-dom';

import withToggleExpand from 'components/shared/generic/tables/hocs/withToggleExpand';

const SitesListItem = ({ toggleExpand, isOpen, site }) => {
    return (
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
                    <td colSpan="4">hi</td>
                </tr>
            )}
        </>
    );
};

export default withToggleExpand(SitesListItem);
