import React from 'react';
import useTimeline from '../hooks/useTimeline';
import BreakdownBasicTimelineBlock from './BreakdownBasicTimelineBlock';

const BreakdownBasicTimeline = ({ clockerEntries }) => {
    const timeline = useTimeline(clockerEntries);

    return (
        <div className="breakdown-basic-timeline">
            {timeline.map((block, i) => (
                <BreakdownBasicTimelineBlock key={i} block={block} />
            ))}
        </div>
    );
};

export default BreakdownBasicTimeline;
