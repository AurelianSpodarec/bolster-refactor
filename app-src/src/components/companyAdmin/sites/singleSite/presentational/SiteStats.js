import React from 'react';
import { Link } from 'react-router-dom';

import PieChart from 'components/shared/stats/presentational/PieChart';
import SiteDetails from './SiteDetails';
const SiteStats = ({ site, stats }) => (
    <div className="stats size-lg-12">
        <div className="flex-item size-lg-12">
            <SiteDetails site={site} stats={stats} />
            <PieChart stats={stats} hierarchyType="site" />
        </div>

        <div className="button-container size-lg-12">
            <Link
                className="button yellow"
                to={`/company/sites/${site.id}/edit`}
            >
                <i className="far fa-pencil fa-fw" /> Edit
            </Link>
            <Link className="button red" to={`/company/sites/${site.id}/edit`}>
                <i className="far fa-trash-alt fa-fw" /> Delete
            </Link>
            <Link
                className="button"
                to={`/company/buildings/create/${site.id}`}
            >
                <i className="far fa-plus" /> Add building
            </Link>
            <Link className="button" to="/company/site">
                <i className="fa fa-exchange" /> Change Ownership
            </Link>
        </div>
    </div>
);

export default SiteStats;
