import React from 'react';
import LegendPercentBar from './LegendPercentBar';
import LegendRecurrencePills from './LegendRecurrencePills';
import LegendStatusPills from './LegendStatusPills';

const LegendSegment = ({ stats, type, labelOptions }) => {
    return (
        <div className="segment">
            <LegendPercentBar stats={stats} />
            {type === 'recurrence' ? (
                <LegendRecurrencePills labelOptions={labelOptions} />
            ) : (
                <LegendStatusPills labelOptions={labelOptions} />
            )}
        </div>
    );
};

export default LegendSegment;
