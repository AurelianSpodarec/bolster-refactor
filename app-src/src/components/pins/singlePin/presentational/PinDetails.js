import React from 'react';

import Block from 'components/shared/generic/block/presentational/Block';
import PinImages from './PinImages';

const PinDetails = ({ pinHistory, historyCount, historyVersion }) => (
    <div>
        <Block>
            <h3 className="heading heading-3">Details</h3>
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
            <PinImages images={pinHistory.photoIds || []} />
        </Block>
        <a className="button" href="#/">
            Edit this history
        </a>
    </div>
);

export default PinDetails;
