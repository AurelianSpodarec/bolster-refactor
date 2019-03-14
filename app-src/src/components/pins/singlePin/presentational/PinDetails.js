import React from 'react';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import PinImages from './PinImages';

const PinDetails = ({
    pinHistory,
    historyCount,
    historyVersion,
    error,
    isFetching
}) => (
    <div>
        <BlockContainer
            heading="Details"
            error={error}sfdgdsfgsgs
            isFetching={isFetching}
            isEmpty={!pinHistory.id}
        >
            <p>ID</p>
            <p>{pinHistory.id}</p>
            <p>History</p>
            <p>
                {historyVersion} of {historyCount}
            </p>
            <p>Type</p>
            <p>{pinHistory.type}</p>
            <p>Status</p>
            <p>{pinHistory.status}</p>
            <p>Photo(s)</p>
            <PinImages images={pinHistory.photoIds} />
        </BlockContainer>
        <a className="button" href="#/">
            Edit this history
        </a>
    </div>
);

export default PinDetails;
