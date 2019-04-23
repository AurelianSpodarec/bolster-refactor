import React from 'react';
import { Link } from 'react-router-dom';

import FloorTableContainer from 'components/companyAdmin/floors/shared/containers/FloorTableContainer';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';
const BuldingsListItem = ({
    building,
    toggleExpanded,
    isExpanded,
    colCount,
    permissions
}) => (
    <>
        <tr
            onClick={toggleExpanded}
            className={`expandable ${isExpanded ? 'open' : ''}`}
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
