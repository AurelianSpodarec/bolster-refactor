import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import PieChart from 'components/shared/stats/presentational/PieChart';
import { DATE_TIME_IDS } from 'constants/companyAdmin/enums';
import React from 'react';
import useWeek from '../../hooks/useWeek';
import BreakdownColumns from '../BreakdownColumns';
import BreakdownDaySummary from '../BreakdownDaySummary';

const WeekBreakdownOverview = ({ selectedDate }) => {
    const week = useWeek(selectedDate);

    const tempData = {
        statuses: {
            ActionRequired: 32,
            Installed: 25,
            Inspected: 18,
            NoAction: 1,
            Other: 2,
        },
    };

    return (
        <BreakdownColumns
            className="week-breakdown-overview"
            left={week.map(({ hours, pins, reference, description, timestamp }, i) => (
                <div className="day" key={i}>
                    <BlockHeading
                        title={
                            <>
                                Day Overview -{' '}
                                <DateTimeContainer
                                    date={new Date(timestamp)}
                                    datetime={DATE_TIME_IDS.DATE}
                                />
                            </>
                        }
                    />
                    <BreakdownDaySummary
                        hours={hours}
                        pins={pins}
                        reference={reference}
                        description={description}
                    />
                </div>
            ))}
            right={
                <>
                    <div className="breakdown-piechart">
                        <PieChart stats={tempData} />
                    </div>
                </>
            }
        />
    );
};

export default WeekBreakdownOverview;
