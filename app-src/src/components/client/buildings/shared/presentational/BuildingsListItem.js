import React from 'react';

import FloorTableContainer from 'components/client/floors/shared/containers/FloorTableContainer';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';
const BuldingsListItem = ({
    building,
    toggleExpanded,
    isExpanded,
    colCount,
    headers,
    onMobile
}) => (
    <>
        <tr
            onClick={toggleExpanded}
            className={`draggable expandable ${isExpanded ? 'open' : ''}`}
        >
            <td>
                {onMobile && (
                    <span className="mobile-table-heading">{headers[0]}</span>
                )}
                {isExpanded ? (
                    <i className="fa fa-chevron-down" />
                ) : (
                    <i className="fa fa-chevron-right" />
                )}
                {building.name}
            </td>
            <td>
                <ButtonContainer
                    to={`/client/buildings/${building.id}`}
                    handleClick={e => e.stopPropagation()}
                >
                    View
                </ButtonContainer>
            </td>
        </tr>
        {isExpanded && (
            <tr className="expanded-row ">
                <td colSpan={colCount} className="table-container">
                    <FloorTableContainer
                        className="with-actions"
                        ids={building.floorIDs}
                    />
                </td>
            </tr>
        )}
    </>
);

export default BuldingsListItem;
