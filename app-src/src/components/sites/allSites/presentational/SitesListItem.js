import React from 'react';
import { Link } from 'react-router-dom';

import withToggleExpand from 'components/shared/generic/tables/hocs/withToggleExpand';
import BuildingsTableContainer from 'components/buildings/shared/containers/BuildingsTableContainer';

const SitesListItem = ({ toggleExpanded, isExpanded, site, colCount }) => {
    return (
        <>
            <tr key={site.id} onClick={toggleExpanded}>
                <td>{site.name}</td>
                <td>{site.ownedBy}</td>
                <td>{site.permissions}</td>
                <td>
                    <Link to={`sites/${site.id}`}>View</Link>
                </td>
            </tr>
            {isExpanded && (
                <tr>
                    <td colSpan={colCount}>
                        <BuildingsTableContainer ids={site.buildingIds} />
                    </td>
                </tr>
            )}
        </>
    );
};

export default withToggleExpand(SitesListItem);
