import React from 'react';
import TaskPill from '../../TaskPill';

const LegendPills = ({ stats }) => {
    return (
        <div className="pills">
            {stats.map((data, i) => (
                <TaskPill key={i} {...data} />
            ))}
        </div>
    );
};

export default LegendPills;
