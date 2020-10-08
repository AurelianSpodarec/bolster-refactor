import React from 'react';

import { PIN_STATUS_IDS, PIN_STATUS_TYPES } from 'constants/companyAdmin/enums';

import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import { isEmpty } from 'helpers/generic';

const ZoneDetailsModal = ({
    zone,
    services,
    getStatusIcon,
    handleHideDetails
}) => (
        <ModalOuterContainer>
            <BlockHeading title={`Zone - ${zone.name}`}></BlockHeading>

            <div className="size-lg-12">
                {!isEmpty(services) ? services.map(({ id, name, pins }) => <div key={id} className="service-area size-lg-12">
                    <h4 className="heading size-lg-12">{name}</h4>

                    <div className="status-container size-lg-12">
                        {Object.values(PIN_STATUS_IDS).map(status => <div key={status} className="status">
                            <div className="icon">
                                <img alt='Pin' src={getStatusIcon(status)} />
                                <p>{pins.filter(({ latestStatus }) => latestStatus === status).length}</p>
                            </div>
                            <p className='name'>{PIN_STATUS_TYPES[status]}</p>
                        </div>)}
                    </div>
                </div>) : <p className="generic-text no-data size-lg-12">There are no pins in this zone.</p>}
            </div>

            <BlockButtonWrapper>
                <button className="button grey" onClick={handleHideDetails}>
                    Back to zones
            </button>
            </BlockButtonWrapper>
        </ModalOuterContainer>
    );

export default ZoneDetailsModal;
