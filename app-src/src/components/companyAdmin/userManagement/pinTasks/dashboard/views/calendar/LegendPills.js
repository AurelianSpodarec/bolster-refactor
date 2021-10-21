import React from 'react';
import TaskPill from '../../TaskPill';

const LegendPills = ({ stats }) => {
    return (
        <div className="pills">
            {stats.map(data => (
                <TaskPill {...data} />
            ))}
        </div>
    );
};

export default LegendPills;
