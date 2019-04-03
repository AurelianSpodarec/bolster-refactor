import React from 'react';
import { Link } from 'react-router-dom';

import DrawingTableContainer from 'components/companyAdmin/drawings/shared/containers/DrawingTableContainer';

const FloorListItem = ({ floor, isExpanded, colCount, toggleExpanded }) => (
    <>
        <tr
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
            <td>
                {floor.permissions
                    .map(permission => permission.companyName)
                    .join(', ')}
            </td>
            <td>
                <Link
                    className="button light-blue"
                    to={`/floors/${floor.id}`}
                    onClick={e => e.stopPropagation()}
                >
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
