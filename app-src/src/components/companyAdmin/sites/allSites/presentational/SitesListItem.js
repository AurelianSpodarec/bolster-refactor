import React from 'react';

import { DATE_TIME_IDS } from 'constants/companyAdmin/enums';
import withDrag from 'components/shared/dragDrop/hocs/withDrag';
import withToggleExpand from 'components/shared/generic/tables/hocs/withToggleExpand';
import BuildingsTableContainer from 'components/companyAdmin/buildings/shared/containers/BuildingsTableContainer';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';
import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';

let SitesListItem = ({
    toggleExpanded,
    isExpanded,
    site,
    colCount,
    permissions,
    forwardRef,
    isDragging,
    onMobile,
    headers
}) => {
    return (
        <>
            <tr
                ref={forwardRef}
                onClick={toggleExpanded}
                className={`draggable expandable ${isExpanded ? 'open' : ''}`}
                style={{ opacity: isDragging ? 0 : 1 }}
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
                <td>
                    {onMobile && (
                        <span className="mobile-table-heading">
                            {headers[1]}
                        </span>
                    )}
                    <DateTimeContainer
                        date={site.createdOn}
                        datetime={DATE_TIME_IDS.DATE}
                    />
                </td>
                <td>
                    {' '}
                    {onMobile && (
                        <span className="mobile-table-heading">
                            {headers[2]}
                        </span>
                    )}
                    {site.ownerCompanyName}
                </td>
                <td>
                    {' '}
                    {onMobile && (
                        <span className="mobile-table-heading">
                            {headers[3]}
                        </span>
                    )}
                    {permissions}
                </td>
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
                <tr
                    className="expanded-row buildings-row"
                    style={{ display: isDragging ? 'none' : '' }}
                >
                    <td colSpan={colCount}>
                        <BuildingsTableContainer ids={site.buildingIDs} />
                    </td>
                </tr>
            )}
        </>
    );
};

SitesListItem = withToggleExpand(SitesListItem);
export default withDrag(SitesListItem, 'SITE');
