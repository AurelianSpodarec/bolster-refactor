import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import React from 'react';
import useDay from '../../hooks/useDay';
import BreakdownColumns from '../BreakdownColumns';
import BreakdownDaySummary from '../BreakdownDaySummary';

const DayBreakdownOverview = ({ selectedDate }) => {
    const { hours, pins, reference, description } = useDay(selectedDate) ?? {};

    return (
        <BreakdownColumns
            className="day-breakdown-overview"
            left={
                <BreakdownDaySummary
                    hours={hours}
                    pins={pins}
                    reference={reference}
                    description={description}
                />
            }
            right={<></>}
        />
    );
};

export default DayBreakdownOverview;
