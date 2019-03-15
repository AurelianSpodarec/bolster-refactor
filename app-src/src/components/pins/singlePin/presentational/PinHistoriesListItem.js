import React from 'react';
import moment from 'moment';

import image from '_content/images/examples/pipe.jpg';

const PinHistoriesListItem = ({
    history,
    historyCount,
    version,
    selectHistory
}) => (
    <div className="item">
        <img alt="pipe" src={image} />
        <p>History</p>
        {version} of {historyCount}
        <p>Date added</p>
        {moment(history.createdAt).format('DD-MM-YYYY')}
        <p>Type</p>
        {history.type}
        <p>Added by</p>
        {history.addedBy}
        <p>Status</p>
        {history.status}
        <button className="button" onClick={selectHistory}>
            View
        </button>
        <button className="button">Edit</button>
    </div>
);

export default PinHistoriesListItem;
