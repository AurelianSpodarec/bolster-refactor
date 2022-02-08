import React from 'react';
import LegendPercentBar from './LegendPercentBar';
import LegendRecurrencePills from './LegendRecurrencePills';
import LegendStatusPills from './LegendStatusPills';

const LegendSegment = ({ stats, type }) => {
    return (
        <div className="segment">
            <LegendPercentBar stats={stats} />
            {type === 'recurrence' ? (
                <LegendRecurrencePills stats={stats} />
            ) : (
                <LegendStatusPills stats={stats} />
            )}
        </div>
    );
};

export default LegendSegment;
