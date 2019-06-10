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
    isDragging
}) => (
    <>
        <tr
            ref={forwardRef}
            onClick={toggleExpanded}
            className={`expandable ${isExpanded ? 'open' : ''}`}
            style={{ opacity: isDragging ? 0 : 1 }}
        >
            <td>
                {' '}
                {isExpanded ? (
                    <i className="fa fa-chevron-down" />
                ) : (
                    <i className="fa fa-chevron-right" />
                )}{' '}
                {building.name}
            </td>
            <td>{permissions}</td>
            <td>
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
