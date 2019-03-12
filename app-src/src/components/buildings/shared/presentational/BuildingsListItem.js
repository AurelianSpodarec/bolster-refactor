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
            <td>{building.name}</td>
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
            <tr>
                <td colSpan={colCount}>
                    <FloorTableContainer ids={building.floorIds} />
                </td>
            </tr>
        )}
    </>
);

export default BuldingsListItem;
