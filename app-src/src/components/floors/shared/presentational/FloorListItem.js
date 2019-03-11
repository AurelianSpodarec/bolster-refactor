import React from 'react';
import { Link } from 'react-router-dom';

import DrawingTableContainer from 'components/drawings/shared/containers/DrawingTableContainer';

const FloorListItem = ({ floor, isExpanded, colCount, toggleExpanded }) => (
    <>
        <tr onClick={toggleExpanded}>
            <td>{floor.name}</td>
            <td>{floor.permissions}</td>
            <td>
                <Link className="button light-blue" to={`/floors/${floor.id}`}>
                    View
                </Link>
            </td>
        </tr>
        {isExpanded && (
            <tr>
                <td colSpan={colCount}>
                    <DrawingTableContainer ids={floor.drawingIds} />
                </td>
            </tr>
        )}
    </>
);

export default FloorListItem;
