import React from 'react';
import { Link } from 'react-router-dom';

import FieldOutput from 'components/shared/generic/fieldOutput/presentational/FieldOutput';

import { PIN_STATUS_TYPES as STATUS } from 'constants/companyAdmin/enums';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';

const PinHistoriesListItem = ({
    history,
    historyCount,
    version,
    selectHistory,
    createdBy,
    services,
    active
}) => (
    <div className={`item ${active ? 'active' : ''}`}>
        {/* <div
            className="image-holder"
            style={{ backgroundImage: `url(${image})` }}
        /> */}

        <FieldOutput
            title="History"
            description={`${version} of ${historyCount}`}
            sizeClass="size-lg-6"
        />
        <FieldOutput
            title="Type"
            description={services[history.serviceID].name}
            sizeClass="size-lg-6"
        />

        <FieldOutput
            title="Status"
            description={STATUS[history.status]}
            sizeClass="size-lg-6"
        />

        <FieldOutput title="Date added" sizeClass="size-lg-6">
            <p>
                <DateTimeContainer date={history.createdOn} />
            </p>
        </FieldOutput>

        <FieldOutput
            title="Added by"
            description={`${createdBy.userFirstName} ${createdBy.userLastName}`}
            sizeClass="size-lg-6"
        />
        <BlockButtonWrapper sizeClasses="size-lg-6">
            <button className="button" onClick={selectHistory}>
                View
            </button>
            <Link
                className="button yellow"
                to={`/company/pins/${history.pinID}/edit-history/${history.id}`}
            >
                <i className="far fa-pencil" /> Edit history
            </Link>
        </BlockButtonWrapper>
    </div>
);

export default PinHistoriesListItem;
