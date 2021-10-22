import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';
import { DATE_TIME_IDS } from 'constants/companyAdmin/enums';
import React from 'react';
import BreakdownDetailedTimelineMap from './BreakdownDetailedTimelineMap';
import BreakdownPositionCard from './BreakdownPositionCard';

const BreakdownDetailedTimelineBlock = ({ block }) => {
    const { clockIn, breakIn, breakOut, clockOut } = block;

    return (
        <div className="breakdown-detailed-timeline-block">
            <div className="block-entry clock-in">
                <div className="wrapper">
                    <p className="title">
                        <strong>
                            Time In -
                            <DateTimeContainer
                                date={clockIn.timestamp}
                                datetime={DATE_TIME_IDS.TIME}
                            />
                        </strong>
                    </p>
                    <BreakdownPositionCard {...clockIn} />
                </div>
                <BreakdownDetailedTimelineMap
                    markers={[{ type: 'clockIn', name: 'Time In', location: clockIn.location }]}
                    className="map"
                    disable={clockIn.location.isEmpty}
                />
            </div>
            {breakIn && (
                <div className="block-entry break-in">
                    <div className="wrapper">
                        <p className="title">
                            <strong>
                                On Break -
                                <DateTimeContainer
                                    date={breakIn.timestamp}
                                    datetime={DATE_TIME_IDS.TIME}
                                />
                            </strong>
                        </p>
                        <BreakdownPositionCard {...breakIn} />
                    </div>
                    <BreakdownDetailedTimelineMap
                        markers={[
                            { type: 'breakIn', name: 'On break', location: breakIn.location },
                        ]}
                        className="map"
                        disable={breakIn.location.isEmpty}
                    />
                </div>
            )}
            {breakOut && (
                <div className="block-entry break-out">
                    <div className="wrapper">
                        <p className="title">
                            <strong>
                                Off Break -
                                <DateTimeContainer
                                    date={breakOut.timestamp}
                                    datetime={DATE_TIME_IDS.TIME}
                                />
                            </strong>
                        </p>
                        <BreakdownPositionCard {...breakOut} />
                    </div>
                    <BreakdownDetailedTimelineMap
                        markers={[
                            { type: 'breakOut', name: 'Off break', location: breakOut.location },
                        ]}
                        className="map"
                        disable={breakOut.location.isEmpty}
                    />
                </div>
            )}
            <div className="block-entry clock-out">
                <div className="wrapper">
                    <p className="title">
                        <strong>
                            Time Out -
                            <DateTimeContainer
                                date={clockOut.timestamp}
                                datetime={DATE_TIME_IDS.TIME}
                            />
                        </strong>
                    </p>
                    <BreakdownPositionCard {...clockOut} />
                </div>
                <BreakdownDetailedTimelineMap
                    markers={[{ type: 'clockOut', name: 'Time Out', location: clockOut.location }]}
                    className="map"
                    disable={clockOut.location.isEmpty}
                />
            </div>
        </div>
    );
};

export default BreakdownDetailedTimelineBlock;
