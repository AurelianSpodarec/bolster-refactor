import React from 'react';

import { PIN_STATUS_IDS, PIN_STATUS_TYPES } from 'constants/companyAdmin/enums';

import { isEmpty } from 'helpers/generic';
import ActionButton from 'components_DEPRECATED/shared/generic/button/presentational/ActionButton';
import FlexModalOuter from 'components_DEPRECATED/shared/generic/modals/presentational/FlexModalOuter';
import ButtonWrapper from 'components_DEPRECATED/shared/generic/button/presentational/ButtonWrapper';

const ZoneDetailsModal = ({ zone, services, getStatusIcon, handleHideDetails }) => (
    <FlexModalOuter title={`Zone - ${zone.name}`}>
        <div className="flex-content-wrapper">
            <div className="flex-content">
                <div className="size-lg-12">
                    {!isEmpty(services) ? (
                        services.map(({ id, name, pins }) => (
                            <div key={id} className="service-area size-lg-12">
                                <h4 className="heading size-lg-12">{name}</h4>

                                <div className="status-container size-lg-12">
                                    {Object.values(PIN_STATUS_IDS).map(status => (
                                        <div key={status} className="status">
                                            <div className="icon">
                                                <img alt="Pin" src={getStatusIcon(status)} />
                                                <p>
                                                    {
                                                        pins.filter(
                                                            ({ latestStatus }) =>
                                                                latestStatus === status,
                                                        ).length
                                                    }
                                                </p>
                                            </div>
                                            <p className="name">{PIN_STATUS_TYPES[status]}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="generic-text no-data size-lg-12">
                            There are no pins in this zone.
                        </p>
                    )}
                </div>
            </div>
        </div>

        <ButtonWrapper alignment="right" extraClasses="flex-modal-footer">
            <ActionButton text="Back to zones" onClick={handleHideDetails} />
        </ButtonWrapper>
    </FlexModalOuter>
);

export default ZoneDetailsModal;
