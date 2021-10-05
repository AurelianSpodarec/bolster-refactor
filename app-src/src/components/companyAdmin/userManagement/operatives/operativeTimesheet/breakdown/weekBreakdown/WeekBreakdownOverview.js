import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import { DATE_TIME_IDS } from 'constants/companyAdmin/enums';
import React from 'react';
import useWeek from '../../hooks/useWeek';
import BreakdownColumns from '../BreakdownColumns';
import BreakdownDaySummary from '../BreakdownDaySummary';

const WeekBreakdownOverview = ({ selectedDate }) => {
    const week = useWeek(selectedDate);

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
            right={<></>}
        />
    );
};

export default WeekBreakdownOverview;
