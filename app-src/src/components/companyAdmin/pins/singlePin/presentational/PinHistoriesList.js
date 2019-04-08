import React from 'react';

import PinHistoriesListItemContainer from '../containers/PinHistoriesListItemContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';

const PinHistoriesList = ({ histories, historyCount }) => {
    if (!(histories && histories.length)) {
        return (
            <p
                className="no-data size-lg-12"
                style={{ paddingLeft: 15, paddingRight: 15 }}
            >
                There are no other pin histories
            </p>
        );
    }

    return histories.map(history => (
        <PinHistoriesListItemContainer
            key={history.id}
            history={history}
            historyCount={historyCount}
            version="num"
        />
    ));
};

export default PinHistoriesList;
