import React from 'react';

import PieChart from 'components/shared/stats/presentational/PieChart';
import DrawingDetails from './DrawingDetails';

const DrawingStats = ({ drawing, stats }) => (
    <div className="stats size-lg-12">
        <PieChart
            sizeClasses="size-lg-12"
            stats={stats}
            hierarchyType="drawing"
        />
        <DrawingDetails stats={stats} floor={drawing} />
        {/* <div className="button-container">
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
        </div> */}
    </div>
);

export default DrawingStats;
