import React from 'react';

import greenPin from '_content/images/map-markers/green-pin2x.png';
import redPin from '_content/images/map-markers/red-pin2x.png';
import bluePin from '_content/images/map-markers/blue-pin2x.png';
import yellowPin from '_content/images/map-markers/yellow-pin2x.png';
import purplePin from '_content/images/map-markers/purple-pin2x.png';

import { PIN_STATUS_IDS, PIN_STATUS_TYPES } from 'constants/companyAdmin/enums';

import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';

const ZoneDetailsModal = ({
    zone,
    services,
    getStatusIcon,
    handleHideDetails
}) => {


    return <ModalOuterContainer>
        <BlockHeading title={`Zone - ${zone.name}`}></BlockHeading>

        {services.map(({ id, name, pins }) => <div key={id} className="service-area size-lg-12">
            <h4 className="size-lg-12">{name}</h4>

            <div className="status-container size-lg-12">
                {Object.values(PIN_STATUS_IDS).map(status => <div key={status} className="status">
                    <div className="icon">
                        <img alt='Pin' src={getStatusIcon(status)} />
                        <p>{pins.filter(({ latestStatus }) => latestStatus === status).length}</p>
                    </div>
                    <p>{PIN_STATUS_TYPES[status]}</p>
                </div>)}
            </div>
        </div>)}

        <BlockButtonWrapper>
            <button className="button grey" onClick={handleHideDetails}>
                Back to zones
            </button>
        </BlockButtonWrapper>
    </ModalOuterContainer>;
};

export default ZoneDetailsModal;
