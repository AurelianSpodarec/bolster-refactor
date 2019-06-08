import React from 'react';

import withToggleExpand from 'components/shared/generic/tables/hocs/withToggleExpand';
import BuildingsTableContainer from 'components/companyAdmin/buildings/shared/containers/BuildingsTableContainer';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';
import DragRow from 'components/companyAdmin/dnd/hocs/withDragRow';

let SitesListItem = ({
    toggleExpanded,
    isExpanded,
    site,
    colCount,
    permissions
}) => {
    return (
        <>
            <tr
                key={site.id}
                onClick={toggleExpanded}
                className={`expandable ${isExpanded ? 'open' : ''}`}
            >
                <td>
                    <i
                        className={`fa fa-chevron-${
                            isExpanded ? 'down' : 'right'
                        }`}
                    />
                    {site.name}
                </td>
                <td>{site.ownerCompanyName}</td>
                <td>{permissions}</td>
                <td>
                    <ButtonContainer
                        to={`/company/sites/${site.id}`}
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
