import React from 'react';
import TaskRecurrencePill from '../../TaskRecurrencePill';

const LegendRecurrencePills = ({ stats }) => {
    return (
        <div className="pills">
            {stats.map((data, i) => (
                <TaskRecurrencePill key={i} {...data} />
            ))}
        </div>
    );
};

export default LegendRecurrencePills;
