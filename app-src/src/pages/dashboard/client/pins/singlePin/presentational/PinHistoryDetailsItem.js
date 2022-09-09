import React from 'react';

import { PIN_STATUS_TYPES } from 'constants/companyAdmin/enums';
import FieldOutput from 'components/shared/generic/fieldOutput/presentational/FieldOutput';

import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';
import PinSectionsContainer from '../containers/PinSectionsContainer';

const PinHistoryDetailsItem = ({ history, createdBy, services, drawingID, editedBy }) => (
    <div className="item">
        <FieldOutput
            title="Type"
            description={services[history.serviceID].name}
            sizeClass="size-lg-3"
        />

        <FieldOutput title="Date added" sizeClass="size-lg-3">
            <p>
                <DateTimeContainer date={history.createdOn} />
            </p>
        </FieldOutput>

        <FieldOutput
            title="Added by"
            description={`${createdBy.userFirstName} ${createdBy.userLastName}`}
            sizeClass="size-lg-3"
        />
        <FieldOutput
            title="Status"
            description={`${PIN_STATUS_TYPES[history.status]}`}
            sizeClass="size-lg-3"
        />
        <FieldOutput
            title="Last edited"
            description={
                history.lastEditedOn ? <DateTimeContainer date={history.lastEditedOn} /> : 'N/A'
            }
            sizeClass="size-lg-3"
        />
        <FieldOutput title="Last edited by" description={editedBy} sizeClass="size-lg-3" />

        <PinSectionsContainer pinHistory={history} drawingID={drawingID} />
    </div>
);

export default PinHistoryDetailsItem;
