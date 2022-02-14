import React from 'react';

const LegendPercentBar = ({ stats }) => {
    return (
        <div className="percent-bar">
            {stats.map(({ name, percent }) => {
                const percentString = `${Math.floor(percent)}%`;
                if (!percent) return null;
                return (
                    <div
                        className={`color-bar ${name}`}
                        style={{ minWidth: '30px', width: `${percent}%` }}
                        key={name}
                    >
                        <p className="percent">{percentString}</p>
                    </div>
                );
            })}
        </div>
    );
};

export default LegendPercentBar;
