import BackButtonContainer from 'components/shared/generic/backButton/containers/BackButtonContainer';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import { PIN_STATS_DASHBOARD_VIEW } from 'constants/companyAdmin/enums';
import React from 'react';
import usePinTasksDashboard from '../hooks/usePinTasksDashboard';
import Controls from './Controls';
import CalendarView from './views/calendar/CalendarView';
import ListView from './views/list/ListView';
import SeriesView from './views/series/SeriesView';

const PinTasksDashboard = () => {
    const {
        startDate,
        view,
        timePeriod,

        onViewChange,
        onPrev,
        onNext,
        onToday,
    } = usePinTasksDashboard();

    const views = {
        [PIN_STATS_DASHBOARD_VIEW.CALENDER]: CalendarView,
        [PIN_STATS_DASHBOARD_VIEW.LIST]: ListView,
        [PIN_STATS_DASHBOARD_VIEW.SERIES]: SeriesView,
    };

    const View = views[view];

    return (
        <>
            <PageHeading leftChildren={true} title="Tasks">
                <BackButtonContainer />
            </PageHeading>
            <BlockContainer contentClass="pin-tasks-dashboard-header">
                <Controls
                    startDate={startDate}
                    view={view}
                    timePeriod={timePeriod}
                    onViewChange={onViewChange}
                    onPrev={onPrev}
                    onNext={onNext}
                    onToday={onToday}
                />
            </BlockContainer>
            <div className="pin-tasks-dashboard size-lg-12">
                <View startDate={startDate} />
            </div>
        </>
    );
};

export default PinTasksDashboard;
