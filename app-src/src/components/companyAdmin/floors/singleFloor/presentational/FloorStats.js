import React from 'react';
import { Link } from 'react-router-dom';

import PieChart from 'components/shared/stats/presentational/PieChart';
import FloorDetails from './FloorDetails';

const FloorStats = ({ floor, stats }) => (
    <div className="stats size-lg-12">
        <FloorDetails stats={stats} floor={floor} />
        <PieChart stats={stats} hierarchyType="floor" />
        <div className="button-container">
            <Link
                className="button yellow"
                to={`/company/floors/${floor.id}/edit`}
            >
                <i className="far fa-pencil fa-fw" /> Edit
            </Link>
            <Link
                className="button red"
                to={`/company/floors/${floor.id}/edit`}
            >
                <i className="far fa-trash-alt fa-fw" /> Delete
            </Link>
            <Link className="button" to={`/company/floors/create/${floor.id}`}>
                <i className="fa fa-plus" /> Add floor
            </Link>
            <Link className="button" to="/company/site">
                <i className="fa fa-exchange" /> Change Ownership
            </Link>
        </div>
    </div>
);

export default FloorStats;
