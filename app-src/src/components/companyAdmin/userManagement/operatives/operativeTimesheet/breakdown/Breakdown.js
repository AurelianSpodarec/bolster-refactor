import React from 'react';

import { TIME_PERIOD } from 'constants/companyAdmin/enums';
import BreakdownLayout from './BreakdownLayout';
import WeekBreakdownOverview from './weekBreakdown/WeekBreakdownOverview';
import DayBreakdownOverview from './dayBreakdown/DayBreakdownOverview';
import DayBreakdownLocation from './dayBreakdown/DayBreakdownLocation';

const Breakdown = ({ selectedDate, timePeriod }) => {
    switch (timePeriod) {
        case TIME_PERIOD.WEEK:
            return (
                <BreakdownLayout
                    selectedDate={selectedDate}
                    tabs={[
                        {
                            title: 'Overview',
                            component: <WeekBreakdownOverview selectedDate={selectedDate} />,
                        },
                    ]}
                />
            );
        case TIME_PERIOD.DAY:
            return (
                <BreakdownLayout
                    selectedDate={selectedDate}
                    tabs={[
                        {
                            title: 'Overview',
                            component: <DayBreakdownOverview selectedDate={selectedDate} />,
                        },
                        {
                            title: 'Location',
                            component: <DayBreakdownLocation selectedDate={selectedDate} />,
                        },
                    ]}
                />
            );
        default:
            break;
    }
};

export default Breakdown;
