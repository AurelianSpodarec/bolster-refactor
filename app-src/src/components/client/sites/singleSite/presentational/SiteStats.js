import React from 'react';

import PieChart from 'components/shared/stats/presentational/PieChart';
import SiteDetails from './SiteDetails';

const SiteStats = ({ site, stats }) => (
    <div className="stats client-stats size-lg-12">
        <div className="size-lg-12">
            <SiteDetails site={site} stats={stats} sizeClasses="size-lg-12" />

            <PieChart
                stats={stats}
                hierarchyType="site"
                sizeClasses="size-lg-12"
            />
        </div>
    </div>
);

export default SiteStats;
