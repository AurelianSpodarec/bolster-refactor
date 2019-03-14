import React from 'react';

import PieChart from 'components/shared/stats/presentational/PieChart';
import SiteStatsDetails from './SiteStatsDetails';
const SiteStats = ({ details }) => (
    <div className="stats size-lg-12">
        <h3 className="heading heading-3 size-lg-6">Details</h3>
        <h4 className="heading heading-3 size-lg-6">Latest Pin Histories</h4>
        <SiteStatsDetails details={details} />
        <PieChart details={details} />
    </div>
);

export default SiteStats;
