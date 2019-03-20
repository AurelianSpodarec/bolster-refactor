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
                className={isExpanded ? 'open' : ''}
            >
                <td>
                    <i
                        className={`fa fa-chevron-${
                            isExpanded ? 'down' : 'right'
                        }`}
                    />
                    {site.name}
                </td>
                <td>##oli##</td>
                <td>##permissions##</td>
                <td>
                    <Link className="button" to={`/sites/${site.id}`}>
                        View
                    </Link>
                </td>
            </tr>
            {isExpanded && (
                <tr className="expanded-row buildings-row">
                    <td colSpan={colCount}>
                        <BuildingsTableContainer ids={site.buildingIDs} />
                    </td>
                </tr>
            )}
        </>
    );
};

export default withToggleExpand(SitesListItem);
