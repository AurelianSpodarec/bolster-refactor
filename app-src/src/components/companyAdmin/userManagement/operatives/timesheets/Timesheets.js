import React from 'react';

import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';
import { DATE_TIME_IDS } from 'constants/companyAdmin/enums';
import TabsContainer from 'components/shared/generic/tabs/containers/TabsContainer';
import TimesheetsRouteContainer from './TimesheetsRouteContainer';
import useTimesheetsTitle from './hooks/useTimesheetsTitle';
import ActionButton from 'components/shared/generic/button/presentational/ActionButton';
import { connect } from 'react-redux';
import { TIMESHEETS_TABS } from 'constants/shared/tabNames';

const Timesheets = ({ selectedTab }) => {
    const { isFetching, companyUserIDs, titleData, setTitleData } = useTimesheetsTitle();

    return (
        // <div className="blur">
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
                {selectedTab === TIMESHEETS_TABS.GENERAL_OVERVIEW && (
                    <ActionButton
                        size="medium"
                        text="Export CSV"
                        icon="file-csv"
                        onClick={() => {}}
                    />
                )}
                {selectedTab === TIMESHEETS_TABS.WAGES && (
                    <ActionButton size="medium" text="Pay Rates" onClick={() => {}} />
                )}
                <TabsContainer classes="hierarchy-tabs" />
            </PageHeading>
            <TimesheetsRouteContainer setTitleData={setTitleData} />
        </>
        // </div>
    );
};

const mapStateToProps = ({
    shared: {
        tabsReducer: { selectedTab },
    },
}) => ({
    selectedTab,
});

export default connect(mapStateToProps)(Timesheets);
