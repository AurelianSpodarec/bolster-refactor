import React from 'react';
import { Link } from 'react-router-dom';

import FloorTableContainer from 'components/companyAdmin/floors/shared/containers/FloorTableContainer';
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
                <Link
                    className="button light-blue"
                    to={`/company/buildings/${building.id}`}
                    onClick={e => e.stopPropagation()}
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
                        ids={building.floorIDs}
                    />
                </td>
            </tr>
        )}
    </>
);

export default BuldingsListItem;
