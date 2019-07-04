import React from 'react';

import withToggleExpand from 'components/shared/generic/tables/hocs/withToggleExpand';

import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';
import BuildingsTableContainer from 'components/client/buildings/shared/containers/BuildingsTableContainer';

const SitesListItem = ({
    toggleExpanded,
    isExpanded,
    site,
    colCount,
    onMobile,
    headers
}) => {
    return (
        <>
            <tr
                key={site.id}
                onClick={toggleExpanded}
                className={`draggable expandable ${isExpanded ? 'open' : ''}`}
            >
                <td>
                    {onMobile && (
                        <span className="mobile-table-heading">
                            {headers[0]}
                        </span>
                    )}
                    <i
                        className={`fa fa-chevron-${
                            isExpanded ? 'down' : 'right'
                        }`}
                    />
                    {site.name}
                </td>
                <td>{site.ownerCompanyName}</td>
                <td>
                    <ButtonContainer
                        to={`/client/sites/${site.id}`}
                        handleClick={e => e.stopPropagation()}
                    >
                        View
                    </ButtonContainer>
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
