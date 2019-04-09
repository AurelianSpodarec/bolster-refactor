import React from 'react';
import { Link } from 'react-router-dom';

import PieChart from 'components/shared/stats/presentational/PieChart';
import SiteDetails from './SiteDetails';
const SiteStats = ({ site, stats }) => (
    <div className="stats size-lg-12">
        <h3 className="heading heading-3 size-lg-6">Details</h3>
        <h4 className="heading heading-3 size-lg-6">Latest Pin Histories</h4>
        <div className="flex-item size-lg-12">
            <SiteDetails site={site} />
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
                <i className="far fa-trash fa-fw" /> Delete
            </Link>
        </div>
    </div>
);

export default SiteStats;
