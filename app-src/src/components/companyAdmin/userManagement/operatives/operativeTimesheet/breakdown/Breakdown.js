import React from 'react';

import { TIME_PERIOD } from 'constants/companyAdmin/enums';
import BreakdownLayout from './BreakdownLayout';
import WeekBreakdown from './weekBreakdown/WeekBreakdown';
import DayBreakdown from './dayBreakdown/DayBreakdown';

const Breakdown = ({ selectedDate, timePeriod }) => {
    let nodes = null;

    switch (timePeriod) {
        case TIME_PERIOD.WEEK:
            nodes = <WeekBreakdown selectedDate={selectedDate} />;
            breakl;
        case TIME_PERIOD.DAY:
            nodes = <DayBreakdown selectedDate={selectedDate} />;
            break;
        default:
            break;
    }

    return <BreakdownLayout selectedDate={selectedDate}>{nodes}</BreakdownLayout>;
};

export default Breakdown;
