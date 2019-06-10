import React from 'react';

import DrawingTableContainer from 'components/companyAdmin/drawings/shared/containers/DrawingTableContainer';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';
import withDrag from 'components/shared/dragDrop/hocs/withDrag';

const FloorListItem = ({
    floor,
    isExpanded,
    colCount,
    toggleExpanded,
    permissions,
    forwardRef,
    isDragging
}) => (
    <>
        <tr
            ref={forwardRef}
            style={{ opacity: isDragging ? 0 : 1 }}
            onClick={toggleExpanded}
            className={`expandable ${isExpanded ? 'open' : ''}`}
        >
            <td>
                {isExpanded ? (
                    <i className="fa fa-chevron-down" />
                ) : (
                    <i className="fa fa-chevron-right" />
                )}{' '}
                {floor.name}
            </td>
            <td>{permissions}</td>
            <td>
                <ButtonContainer
                    to={`/company/floors/${floor.id}`}
                    handleClick={e => e.stopPropagation()}
                >
                    View
                </ButtonContainer>
            </td>
        </tr>
        {isExpanded && (
            <tr>
                <td
                    colSpan={colCount}
                    className="table-container drawing"
                    style={{ display: isDragging ? 'none' : '' }}
                >
                    <DrawingTableContainer ids={floor.drawingIDs} />
                </td>
            </tr>
        )}
    </>
);

export default withDrag(FloorListItem, 'FLOOR');
