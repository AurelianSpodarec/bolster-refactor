import React from 'react';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import PinHistoriesListItemContainer from '../containers/PinHistoriesListItemContainer';

const PinHistoriesList = ({ isFetching, error, histories, historyCount }) => (
    <BlockContainer
        heading="Other histories"
        error={error}
        isFetching={isFetching}
        isEmpty={!(histories && histories.length)}
        contentClass="pin-single-history"
    >
        {histories.map(history => (
            <PinHistoriesListItemContainer
                key={history.id}
                history={history}
                historyCount={historyCount}
                version="num"
            />
        ))}
    </BlockContainer>
);

export default PinHistoriesList;
