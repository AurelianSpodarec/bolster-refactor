import React from 'react';

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
            description={`${version} of ${historyCount} ${
                version === historyCount
                    ? '(Latest)'
                    : +version === 1
                    ? '(Earliest)'
                    : ''
            }`}
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
        <BlockButtonWrapper
            additionalClasses="item-button-container"
            sizeClasses="size-lg-6"
        >
            {active ? (
                <button
                    className={'button blue disabled'}
                    onClick={selectHistory}
                >
                    <i className="fa fa-eye" /> View
                </button>
            ) : (
                <button className={'button blue'} onClick={selectHistory}>
                    <i className="fa fa-eye" /> View
                </button>
            )}
        </BlockButtonWrapper>
    </div>
);

export default PinHistoriesListItem;
