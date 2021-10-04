import React from 'react';
import Breakdown from '../presentational/Breakdown';

const BreakdownContainer = ({ selectedDate, timePeriod }) => {
    return <Breakdown selectedDate={selectedDate} timePeriod={timePeriod} />;
};

export default BreakdownContainer;
