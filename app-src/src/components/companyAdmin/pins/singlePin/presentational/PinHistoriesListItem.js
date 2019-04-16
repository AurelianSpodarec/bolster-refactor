import React from 'react';
import moment from 'moment';

import image from '_content/images/examples/pipe.jpg';
import FieldOutput from 'components/shared/generic/fieldOutput/presentational/FieldOutput';

import { PIN_STATUS_TYPES as STATUS } from 'constants/companyAdmin/enums';

const PinHistoriesListItem = ({
    history,
    historyCount,
    version,
    selectHistory,
    createdBy,
    services
}) => (
    <div className="item">
        {/* <div
            className="image-holder"
            style={{ backgroundImage: `url(${image})` }}
        /> */}
        <div className="outputs">
            <FieldOutput
                title="History"
                description={`${version} of ${historyCount}`}
                sizeClass="size-lg-4"
            />
            <FieldOutput
                title="Type"
                description={services[history.serviceID].name}
                sizeClass="size-lg-4"
            />

            <FieldOutput
                title="Status"
                description={STATUS[history.status]}
                sizeClass="size-lg-4"
            />

            <FieldOutput
                title="Date added"
                description={moment(history.createdOn).format(
                    'DD-MM-YYYY, HH:mm a'
                )}
                sizeClass="size-lg-4"
            />

            <FieldOutput
                title="Added by"
                description={`${createdBy.userFirstName} ${
                    createdBy.userLastName
                }`}
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
