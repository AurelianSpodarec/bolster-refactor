import React from 'react';

import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';
import { DATE_TIME_IDS } from 'constants/companyAdmin/enums';
import TabsContainer from 'components/shared/generic/tabs/containers/TabsContainer';
import TimesheetsRouteContainer from './TimesheetsRouteContainer';
import useTimesheetsTitle from './hooks/useTimesheetsTitle';
import ActionButton from 'components/shared/generic/button/presentational/ActionButton';
import { connect, useDispatch } from 'react-redux';
import { TIMESHEETS_TABS } from 'constants/shared/tabNames';
import { showModal } from '../../../../../actions/shared/generic/modals/sync/showModal';
import { PAY_RATES_MODAL } from '../../../../../constants/shared/modalTypes';
import GenerateTimesheetsCSVButton from './GenerateTimesheetsCSVButton';

const Timesheets = ({ selectedTab }) => {
    const dispatch = useDispatch();
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
                {selectedTab === TIMESHEETS_TABS.WAGES && (
                    <ActionButton
                        size="medium"
                        text="Pay Rates"
                        minWidth={'150px'}
                        onClick={() => dispatch(showModal(PAY_RATES_MODAL))}
                    />
                )}
                <GenerateTimesheetsCSVButton />
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
