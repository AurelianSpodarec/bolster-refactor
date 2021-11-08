import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';
import { DATE_TIME_IDS } from 'constants/companyAdmin/enums';
import React from 'react';
import useTimeline from '../hooks/useTimeline';
import BreakdownBasicTimelineBlock from './BreakdownBasicTimelineBlock';

const BreakdownBasicTimeline = ({ clockerEntries, selectedDate }) => {
    const timeline = useTimeline(clockerEntries);

    if (timeline.length === 0)
        return (
            <p>
                No clocking data for{' '}
                <DateTimeContainer datetime={DATE_TIME_IDS.DATE} date={new Date(selectedDate)} />
            </p>
        );

    return (
        <div className="breakdown-basic-timeline">
            {timeline.map((block, i) => (
                <BreakdownBasicTimelineBlock key={i} block={block} />
            ))}
        </div>
    );
};

export default BreakdownBasicTimeline;
