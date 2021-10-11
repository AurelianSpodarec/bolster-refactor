import React from 'react';
import useTimeline from '../hooks/useTimeline';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import BreakdownDetailedTimelineBlock from './BreakdownDetailedTimelineBlock';
import BreakdownDetailedTimelineMap from './BreakdownDetailedTimelineMap';
import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';
import { DATE_TIME_IDS } from 'constants/companyAdmin/enums';

const BreakdownDetailedTimeline = ({ clockerEntries, selectedDate }) => {
    const timeline = useTimeline(clockerEntries);

    const markers = [];
    timeline.map(block => {
        const { clockIn, breakIn, breakOut, clockOut } = block;
        if (clockIn?.location) markers.push({ ...clockIn, type: 'clockIn', name: 'Time In' });
        if (breakIn?.location) markers.push({ ...breakIn, type: 'breakIn', name: 'On Break' });
        if (breakOut?.location) markers.push({ ...breakOut, type: 'breakOut', name: 'Off Break' });
        if (clockOut?.location) markers.push({ ...clockOut, type: 'clockOut', name: 'Time Out' });
    });

    return (
        <div className="breakdown-detailed-timeline">
            <BreakdownDetailedTimelineMap markers={markers} className="main-map" zoom={15} />

            <BlockHeading title="Timeline" />
            {timeline.length === 0 ? (
                <p>
                    No timeline data available for{' '}
                    <DateTimeContainer date={selectedDate} datetime={DATE_TIME_IDS.DATE} />
                </p>
            ) : (
                timeline.map(block => <BreakdownDetailedTimelineBlock block={block} />)
            )}
        </div>
    );
};

export default BreakdownDetailedTimeline;
