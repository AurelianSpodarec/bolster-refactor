import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';
import { DATE_TIME_IDS } from 'constants/companyAdmin/enums';
import React from 'react';
import BreakdownPositionCard from './BreakdownPositionCard';

const BreakdownDetailedTimelineBlock = ({ block }) => {
    const { clockIn, breakIn, breakOut, clockOut } = block;

    return (
        <div className="breakdown-detailed-timeline-block">
            <div className="block-entry clock-in">
                <div className="wrapper">
                    <p className="title">
                        Time In -{' '}
                        <DateTimeContainer date={clockIn.timestamp} datetime={DATE_TIME_IDS.TIME} />
                    </p>
                    <BreakdownPositionCard {...clockIn} />
                </div>
            </div>
            {breakIn && (
                <div className="block-entry break-in">
                    <div className="wrapper">
                        <p className="title">
                            On Break -{' '}
                            <DateTimeContainer
                                date={breakIn.timestamp}
                                datetime={DATE_TIME_IDS.TIME}
                            />
                        </p>
                        <BreakdownPositionCard {...breakIn} />
                    </div>
                </div>
            )}
            {breakOut && (
                <div className="block-entry break-out">
                    <div className="wrapper">
                        <p className="title">
                            Off Break -{' '}
                            <DateTimeContainer
                                date={breakOut.timestamp}
                                datetime={DATE_TIME_IDS.TIME}
                            />
                        </p>
                        <BreakdownPositionCard {...breakOut} />
                    </div>
                </div>
            )}
            <div className="block-entry clock-out">
                <div className="wrapper">
                    <p className="title">
                        Time Out -{' '}
                        <DateTimeContainer
                            date={clockOut.timestamp}
                            datetime={DATE_TIME_IDS.TIME}
                        />
                    </p>
                    <BreakdownPositionCard {...clockOut} />
                </div>
            </div>
        </div>
    );
};

export default BreakdownDetailedTimelineBlock;
