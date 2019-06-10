import React from 'react';

import withDrag from 'components/shared/dragDrop/hocs/withDrag';
import withToggleExpand from 'components/shared/generic/tables/hocs/withToggleExpand';
import BuildingsTableContainer from 'components/companyAdmin/buildings/shared/containers/BuildingsTableContainer';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';

let SitesListItem = ({
    toggleExpanded,
    isExpanded,
    site,
    colCount,
    permissions,
    forwardRef,
    isDragging
}) => {
    return (
        <>
            <tr
                ref={forwardRef}
                onClick={toggleExpanded}
                className={`expandable ${isExpanded ? 'open' : ''}`}
                style={{ opacity: isDragging ? 0 : 1 }}
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

SitesListItem = withToggleExpand(SitesListItem);
export default withDrag(SitesListItem);
