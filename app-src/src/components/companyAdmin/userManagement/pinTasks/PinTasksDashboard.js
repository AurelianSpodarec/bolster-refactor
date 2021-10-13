import BackButtonContainer from 'components/shared/generic/backButton/containers/BackButtonContainer';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import React from 'react';

const PinTasksDashboard = () => {
    return (
        <>
            <PageHeading leftChildren={true} title="Tasks">
                <BackButtonContainer />
            </PageHeading>
            <BlockContainer contentClass="pin-tasks-dashboard"></BlockContainer>
        </>
    );
};

export default PinTasksDashboard;
