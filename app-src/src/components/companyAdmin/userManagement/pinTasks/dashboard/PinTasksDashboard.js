import BackButtonContainer from 'components/shared/generic/backButton/containers/BackButtonContainer';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import React from 'react';
import usePinTasksDashboard from '../hooks/usePinTasksDashboard';
import Controls from './Controls';

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
        </>
    );
};

export default PinTasksDashboard;
