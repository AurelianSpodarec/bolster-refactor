import React from 'react';
import TaskStatusPill from '../../TaskStatusPill';

const LegendStatusPills = ({ stats }) => {
    return (
        <div className="pills">
            {stats.map((data, i) => (
                <TaskStatusPill key={i} {...data} />
            ))}
        </div>
    );
};

export default LegendStatusPills;
