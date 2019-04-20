import React from 'react';

import NumberOfHistoriesContainer from '../containers/NumberOfHistoriesContainer';
import SortByContainer from '../containers/SortByContainer';
import ReportFormatsContainer from '../containers/ReportFormatsContainer';

const ReportOptions = () => (
    <>
        <NumberOfHistoriesContainer />
        <SortByContainer />
        <ReportFormatsContainer />
    </>
);

export default ReportOptions;
