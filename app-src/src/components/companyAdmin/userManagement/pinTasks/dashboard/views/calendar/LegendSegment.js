import React from 'react';
import LegendPercentBar from './LegendPercentBar';
import LegendPills from './LegendPills';

const LegendSegment = ({ stats }) => {
    return (
        <div className="segment">
            <LegendPercentBar stats={stats} />
            <LegendPills stats={stats} />
        </div>
    );
};

export default LegendSegment;
