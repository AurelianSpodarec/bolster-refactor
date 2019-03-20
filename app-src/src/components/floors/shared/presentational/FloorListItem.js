import React from 'react';
import { Link } from 'react-router-dom';

import DrawingTableContainer from 'components/drawings/shared/containers/DrawingTableContainer';

const FloorListItem = ({ floor, isExpanded, colCount, toggleExpanded }) => (
    <>
        <tr onClick={toggleExpanded} className={isExpanded ? 'open' : ''}>
            <td>
                {isExpanded ? (
                    <i className="fa fa-chevron-down" />
                ) : (
                    <i className="fa fa-chevron-right" />
                )}{' '}
                {floor.name}
            </td>
            <td>##permissions##</td>
            <td>
                <Link className="button light-blue" to={`/floors/${floor.id}`}>
                    View
                </Link>
            </td>
        </tr>
        {isExpanded && (
            <tr>
                <td colSpan={colCount} className="table-container drawing">
                    <DrawingTableContainer ids={floor.drawingIDs} />
                </td>
            </tr>
        )}
    </>
);

export default FloorListItem;
