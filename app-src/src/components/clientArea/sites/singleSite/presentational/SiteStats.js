import React from 'react';

import PieChart from 'components/shared/stats/presentational/PieChart';
import SiteDetails from './SiteDetails';

const SiteStats = ({ site, stats }) => (
    <div className="stats size-lg-12">
        <div className="flex-item size-lg-12">
            <SiteDetails site={site} stats={stats} />
            <PieChart stats={stats} hierarchyType="site" />
        </div>
    </div>
);

export default SiteStats;
