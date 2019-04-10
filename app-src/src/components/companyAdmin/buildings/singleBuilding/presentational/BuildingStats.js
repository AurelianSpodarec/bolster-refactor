import React from 'react';
import { Link } from 'react-router-dom';

import PieChart from 'components/shared/stats/presentational/PieChart';
import BuildingDetails from './BuildingDetails';

const BuildingStats = ({ building, stats }) => (
    <div className="stats size-lg-12">
        <div className="flex-item size-lg-12">
            <BuildingDetails stats={stats} building={building} />
            <PieChart stats={stats} hierarchyType="building" />
        </div>

        <div className="button-container">
            <Link
                className="button yellow"
                to={`/company/buildings/${building.id}/edit`}
            >
                <i className="far fa-pencil fa-fw" /> Edit
            </Link>
            <Link
                className="button red"
                to={`/company/buildings/${building.id}/edit`}
            >
                <i className="far fa-trash-alt fa-fw" /> Delete
            </Link>

            <Link className="button" to="/company/site">
                <i className="fa fa-exchange" /> Change Ownership
            </Link>
        </div>
    </div>
);

export default BuildingStats;
