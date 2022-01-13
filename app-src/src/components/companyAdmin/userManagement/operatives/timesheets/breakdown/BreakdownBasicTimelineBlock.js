import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';
import { DATE_TIME_IDS } from 'constants/companyAdmin/enums';
import React from 'react';
import BreakdownPositionCard from './BreakdownPositionCard';

const BreakdownBasicTimelineBlock = ({ block }) => {
    const { clockIn, breakIn, breakOut, clockOut } = block;

    return (
        <div className="breakdown-basic-timeline-block">
            <div className="block-entry clock-in">
                <DateTimeContainer date={clockIn.timestamp} datetime={DATE_TIME_IDS.TIME} />
                <Bar type="clockIn" />
                <div className="wrapper">
                    <p className="title">Time In</p>
                    <BreakdownPositionCard {...clockIn} />
                </div>
            </div>
            {breakIn && (
                <div className="block-entry break-in">
                    <DateTimeContainer date={breakIn.timestamp} datetime={DATE_TIME_IDS.TIME} />
                    <Bar type="breakIn" />
                    <div className="wrapper">
                        <p className="title">On Break</p>
                        <BreakdownPositionCard {...breakIn} />
                    </div>
                </div>
            )}
            {breakOut && (
                <div className="block-entry break-out">
                    <DateTimeContainer date={breakOut.timestamp} datetime={DATE_TIME_IDS.TIME} />
                    <Bar type="breakOut" />
                    <div className="wrapper">
                        <p className="title">Off Break</p>
                        <BreakdownPositionCard {...breakOut} />
                    </div>
                </div>
            )}
            <div className="block-entry clock-out">
                <DateTimeContainer date={clockOut.timestamp} datetime={DATE_TIME_IDS.TIME} />
                <Bar type="clockOut" />
                <div className="wrapper">
                    <p className="title">Time Out</p>
                    <BreakdownPositionCard {...clockOut} />
                </div>
            </div>
        </div>
    );
};

const Bar = ({ type }) => {
    const barColor = {
        clockIn: 'green',
        clockOut: '',
        breakIn: 'yellow',
        breakOut: 'green',
    }[type];

    const ballColor = {
        clockIn: 'green',
        clockOut: 'red',
        breakIn: 'yellow',
        breakOut: 'yellow',
    }[type];

    return (
        <div className="bar-wrapper">
            <div className={`ball ${ballColor}`}></div>
            <div className={`bar ${barColor}`}></div>
        </div>
    );
};

export default BreakdownBasicTimelineBlock;
