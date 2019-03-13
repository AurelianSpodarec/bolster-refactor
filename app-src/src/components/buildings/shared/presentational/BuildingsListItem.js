import React from 'react';
import { Link } from 'react-router-dom';

import FloorTableContainer from 'components/floors/shared/containers/FloorTableContainer';
const BuldingsListItem = ({
    building,
    toggleExpanded,
    isExpanded,
    colCount
}) => (
    <>
        <tr onClick={toggleExpanded} className={isExpanded && 'open'}>
            <td>
                {' '}
                {isExpanded ? (
                    <i className="fa fa-chevron-down" />
                ) : (
                    <i className="fa fa-chevron-right" />
                )}{' '}
                {building.name}
            </td>
            <td>{building.permissions}</td>
            <td>
                <Link
                    className="button light-blue"
                    to={`/buildings/${building.id}`}
                >
                    View
                </Link>
            </td>
        </tr>
        {isExpanded && (
            <tr className="expanded-row ">
                <td colSpan={colCount} className="table-container">
                    <FloorTableContainer
                        className="with-actions"
                        ids={building.floorIds}
                    />
                </td>
            </tr>
        )}
    </>
);

export default BuldingsListItem;
