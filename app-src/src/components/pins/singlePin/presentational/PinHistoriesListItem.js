import React from 'react';
import moment from 'moment';

import image from '_content/images/examples/pipe.jpg';
import FieldOutput from 'components/shared/generic/fieldOutput/presentational/FieldOutput';

const PinHistoriesListItem = ({
    history,
    historyCount,
    version,
    selectHistory
}) => (
    <div className="item">
        <div
            className="image-holder"
            style={{ backgroundImage: `url(${image})` }}
        />
        <div className="outputs">
            <FieldOutput
                title="History"
                description={`${version} of ${historyCount}`}
                sizeClass="size-lg-4"
            />
            <FieldOutput
                title="Type"
                description={history.type}
                sizeClass="size-lg-4"
            />

            <FieldOutput
                title="Status"
                description={history.status}
                sizeClass="size-lg-4"
            />

            <FieldOutput
                title="Date added"
                description={moment(history.createdAt).format('DD-MM-YYYY')}
                sizeClass="size-lg-4"
            />

            <FieldOutput
                title="Added by"
                description={history.addedBy}
                sizeClass="size-lg-4"
            />

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
