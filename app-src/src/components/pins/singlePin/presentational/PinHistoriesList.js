import React from 'react';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import PinHistoriesListItemContainer from '../containers/PinHistoriesListItemContainer';

const PinHistoriesList = ({ isFetching, error, histories, historyCount }) => (
    <BlockContainer
        heading="Details"
        error={error}
        isFetching={isFetching}
        isEmpty={!(histories && histories.length)}
    >
        {histories.map((history, i) => (
            <PinHistoriesListItemContainer
                key={history.id}
                history={history}
                historyCount={historyCount}
                version={i + 1}
            />
        ))}
    </BlockContainer>
);

export default PinHistoriesList;
