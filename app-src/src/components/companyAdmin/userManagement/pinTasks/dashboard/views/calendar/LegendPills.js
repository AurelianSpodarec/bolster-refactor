import React from 'react';

const LegendPills = ({ stats }) => {
    return (
        <div className="pills">
            {stats.map(({ name, title }) => (
                <div className="pill" key={name}>
                    <div className={`square ${name}`} />
                    <div className="title">{title}</div>
                </div>
            ))}
        </div>
    );
};

export default LegendPills;
