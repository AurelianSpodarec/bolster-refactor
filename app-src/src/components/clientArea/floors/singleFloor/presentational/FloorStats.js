import React from 'react';

import PieChart from 'components/shared/stats/presentational/PieChart';
import FloorDetails from './FloorDetails';

const FloorStats = ({
    floor,
    stats,
    handleDelete,
    handleArchive,
    handleEditFloorModal
}) => (
    <div className="stats size-lg-12">
        <FloorDetails stats={stats} floor={floor} />
        <PieChart stats={stats} hierarchyType="floor" />
        <div className="button-container">
            <button className="button red" type="button" onClick={handleDelete}>
                <i className="far fa-trash-alt fa-fw" /> Delete
            </button>
            <button className="button yellow" onClick={handleEditFloorModal}>
                <i className="far fa-pencil fa-fw" /> Edit
            </button>

            <button
                className="button blue"
                onClick={handleArchive}
                type="button"
            >
                <i className="fa fa-archive" />
                {floor.isArchived ? 'Un-Archive' : 'Archive'}
            </button>
        </div>
    </div>
);

export default FloorStats;
