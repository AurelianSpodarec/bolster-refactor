import React from 'react';

import PieChart from 'components/shared/stats/presentational/PieChart';
import SiteDetails from './SiteDetails';
const SiteStats = ({ site, stats, isFetchingStats }) => (
    <div className="stats size-lg-12">
        <h3 className="heading heading-3 size-lg-6">Details</h3>
        <h4 className="heading heading-3 size-lg-6">Latest Pin Histories</h4>
        <SiteDetails site={site} />
        <PieChart stats={stats} isFetchingStats={isFetchingStats} />
    </div>
);

export default SiteStats;
