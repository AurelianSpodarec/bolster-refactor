import React from 'react';

import FloorTableContainer from 'components/companyAdmin/floors/shared/containers/FloorTableContainer';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';
import withDrag from 'components/shared/dragDrop/hocs/withDrag';
const BuldingsListItem = ({
    building,
    toggleExpanded,
    isExpanded,
    colCount,
    permissions,
    forwardRef,
    isDragging,
    headers,
    onMobile
}) => (
    <>
        <tr
            ref={forwardRef}
            onClick={toggleExpanded}
            className={`draggable expandable ${isExpanded ? 'open' : ''}`}
            style={{ opacity: isDragging ? 0 : 1 }}
        >
            <td>
                {onMobile && (
                    <span className="mobile-table-heading">{headers[0]}</span>
                )}
                {isExpanded ? (
                    <i className="fa fa-chevron-down" />
                ) : (
                    <i className="fa fa-chevron-right" />
                )}{' '}
                {building.name}
            </td>
            <td>
                {' '}
                {onMobile && (
                    <span className="mobile-table-heading">{headers[1]}</span>
                )}
                {permissions}
            </td>
            <td>
                {onMobile && (
                    <span className="mobile-table-heading">{headers[2]}</span>
                )}
                <ButtonContainer
                    to={`/company/buildings/${building.id}`}
                    handleClick={e => e.stopPropagation()}
                >
                    View
                </ButtonContainer>
            </td>
        </tr>
        {isExpanded && (
            <tr className="expanded-row ">
                <td
                    colSpan={colCount}
                    className="table-container"
                    style={{ display: isDragging ? 'none' : '' }}
                >
                    <FloorTableContainer
                        className="with-actions"
                        ids={building.floorIDs}
                    />
                </td>
            </tr>
        )}
    </>
);

export default withDrag(BuldingsListItem, 'BUILDING');
