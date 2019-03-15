import React from 'react';
import moment from 'moment';

import image from '_content/images/examples/pipe.jpg';

const PinHistoriesListItem = ({
    history,
    historyCount,
    version,
    selectHistory
}) => (
    <div
        className="item"
        onMouseOver={() => {
            console.log('hi');
        }}
    >
        <div
            className="image-holder"
            style={{ backgroundImage: `url(${image})` }}
        />
        <div className="outputs">
            <div className="field-output size-lg-4">
                <label className="title">History</label>
                <p>
                    {version} of {historyCount}
                </p>
            </div>
            <div className="field-output size-lg-4">
                <label className="title">Type</label>
                <p>{history.type}</p>
            </div>
            <div className="field-output size-lg-4">
                <label className="title">Status</label>

                <p>{history.status}</p>
            </div>

            <div className="field-output size-lg-4">
                <label className="title">Date added</label>
                <p>{moment(history.createdAt).format('DD-MM-YYYY')}</p>
            </div>
            <div className="field-output size-lg-4">
                <label className="title">Added by</label>

                <p>{history.addedBy}</p>
            </div>
            <div className="item-button-container">
                <button className="button" onClick={selectHistory}>
                    View
                </button>
                <button className="button yellow">Edit</button>
            </div>
        </div>
    </div>
);

export default PinHistoriesListItem;
