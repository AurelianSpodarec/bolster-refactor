import React from 'react';

const LegendPercentBar = ({ stats }) => {
    return (
        <div className="percent-bar">
            {stats.map(({ name, percent }) => {
                const percentString = `${Math.floor(percent)}%`;
                return (
                    <div
                        className={`color-bar ${name}`}
                        style={{ flexBasis: percentString }}
                        key={name}
                    >
                        {percent > 0 && <p className="percent">{percentString}</p>}
                    </div>
                );
            })}
        </div>
    );
};

export default LegendPercentBar;
