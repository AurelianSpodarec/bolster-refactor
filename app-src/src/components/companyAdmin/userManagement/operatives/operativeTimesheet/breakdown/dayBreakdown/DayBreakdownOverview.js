import PieChart from 'components/shared/stats/presentational/PieChart';
import React from 'react';
import useDay from '../../hooks/useDay';
import BreakdownColumns from '../BreakdownColumns';
import BreakdownDaySummary from '../BreakdownDaySummary';
import BreakdownNotes from '../BreakdownNotes';

const DayBreakdownOverview = ({ selectedDate }) => {
    const { hours, pins, reference, description, notes } = useDay(selectedDate) ?? {};

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
            className="day-breakdown-overview"
            left={
                <>
                    <BreakdownDaySummary
                        hours={hours}
                        pins={pins}
                        reference={reference}
                        description={description}
                    />
                    <BreakdownNotes notes={notes} />
                </>
            }
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

export default DayBreakdownOverview;
