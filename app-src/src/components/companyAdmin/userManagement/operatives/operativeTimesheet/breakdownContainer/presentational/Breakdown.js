import React from 'react';

import { TIME_PERIOD } from 'constants/companyAdmin/enums';

const Breakdown = ({ selectedDate, timePeriod }) => {
    switch (timePeriod) {
        case TIME_PERIOD.WEEK:
            return <div>week</div>;
        case TIME_PERIOD.DAY:
            return <div>{selectedDate}</div>;
        default:
            return null;
    }
};

export default Breakdown;
