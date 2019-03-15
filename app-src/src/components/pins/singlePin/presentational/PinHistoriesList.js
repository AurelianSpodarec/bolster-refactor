import React from 'react';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import PinHistoriesListItemContainer from '../containers/PinHistoriesListItemContainer';
import BlockHeadingWControls from 'components/shared/generic/blockHeadingWControls/presentational/BlockHeadingWControls';

const PinHistoriesList = ({ isFetching, error, histories, historyCount }) => (
    <BlockContainer
        error={error}
        isFetching={isFetching}
        isEmpty={!(histories && histories.length)}
        contentClass="pin-single-history no-horizontal-padding"
    >
        <BlockHeadingWControls title="Other pin histories">
            <button className="button">
                <i className="fa fa-plus" />
                Add new history
            </button>
        </BlockHeadingWControls>
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
