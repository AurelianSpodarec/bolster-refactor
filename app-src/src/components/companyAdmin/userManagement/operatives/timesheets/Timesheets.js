import React from 'react';

import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';
import { DATE_TIME_IDS } from 'constants/companyAdmin/enums';
import TabsContainer from 'components/shared/generic/tabs/containers/TabsContainer';
import TimesheetsRouteContainer from './TimesheetsRouteContainer';
import useTimesheetsTitle from './hooks/useTimesheetsTitle';

const Timesheets = () => {
    const { isFetching, companyUserIDs, titleData, setTitleData } = useTimesheetsTitle();

    return (
        <>
            <PageHeading
                title={
                    <>
                        Timesheet -{' '}
                        {isFetching ? (
                            'Loading...'
                        ) : (
                            <>
                                {companyUserIDs.length || 'All'} Users (
                                <DateTimeContainer
                                    datetime={DATE_TIME_IDS.DATE}
                                    date={titleData.date}
                                />
                                - {titleData.timePeriod})
                            </>
                        )}
                    </>
                }
                withBackButton
            >
                <TabsContainer classes="hierarchy-tabs" />
            </PageHeading>
            <TimesheetsRouteContainer setTitleData={setTitleData} />
        </>
    );
};

export default Timesheets;
