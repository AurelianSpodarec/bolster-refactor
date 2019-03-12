import React from 'react';
import { Link } from 'react-router-dom';

import withToggleExpand from 'components/shared/generic/tables/hocs/withToggleExpand';
import BuildingsTableContainer from 'components/buildings/shared/containers/BuildingsTableContainer';

const SitesListItem = ({ toggleExpanded, isExpanded, site, colCount }) => {
    return (
        <>
            <tr
                key={site.id}
                onClick={toggleExpanded}
                className={isExpanded && 'open'}
            >
                <td>
                    {isExpanded ? (
                        <i className="fa fa-chevron-down" />
                    ) : (
                        <i className="fa fa-chevron-right" />
                    )}{' '}
                    {site.name}
                </td>
                <td>{site.ownedBy}</td>
                <td>{site.permissions}</td>
                <td>
                    <Link className="button" to={`sites/${site.id}`}>
                        View
                    </Link>
                </td>
            </tr>
            {isExpanded && (
                <tr className="expanded-row">
                    <td colSpan={colCount}>
                        <BuildingsTableContainer ids={site.buildingIds} />
                    </td>
                </tr>
            )}
        </>
    );
};

export default withToggleExpand(SitesListItem);
