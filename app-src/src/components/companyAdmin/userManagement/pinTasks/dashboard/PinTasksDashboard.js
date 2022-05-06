import React from 'react';
import usePinTasksDashboard from '../hooks/usePinTasksDashboard';

import BackButtonContainer from 'components/shared/generic/backButton/containers/BackButtonContainer';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';

import TasksControls from './TasksControls';
import CalendarView from './views/calendar/CalendarView';
import ListView from './views/list/ListView';
import SeriesView from './views/series/SeriesView';

import { PIN_STATS_DASHBOARD_VIEW } from 'constants/companyAdmin/enums';

const PinTasksDashboard = () => {
    const {
        startDate,
        endDate,
        view,
        timePeriod,
        onViewChange,
        onPrev,
        onNext,
        onToday,
        startCreatePinTask,
        viewTaskNote,
        startEditPinTask,
        startEditPinTaskSeries,
    } = usePinTasksDashboard();

    const views = {
        [PIN_STATS_DASHBOARD_VIEW.CALENDAR]: CalendarView,
        [PIN_STATS_DASHBOARD_VIEW.LIST]: ListView,
        [PIN_STATS_DASHBOARD_VIEW.SERIES]: SeriesView,
    };

    const View = views[view];

    return (
        <>
            <PageHeading leftChildren={true} title="">
                <ButtonContainer handleClick={() => startCreatePinTask()}>
                    Create Task
                </ButtonContainer>
            </PageHeading>
            <BlockContainer contentClass="pin-tasks-dashboard-header">
                <TasksControls
                    startDate={startDate}
                    view={view}
                    timePeriod={timePeriod}
                    onViewChange={onViewChange}
                    onPrev={onPrev}
                    onNext={onNext}
                    onToday={onToday}
                    endDate={endDate}
                />
            </BlockContainer>
            <div className="pin-tasks-dashboard size-lg-12">
                <View
                    startDate={startDate}
                    startCreatePinTask={startCreatePinTask}
                    startEditPinTask={startEditPinTask}
                    viewTaskNote={viewTaskNote}
                    startEditPinTaskSeries={startEditPinTaskSeries}
                />
            </div>
        </>
    );
};

export default PinTasksDashboard;
