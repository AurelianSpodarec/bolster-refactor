import React from 'react';

import SinglePinMapContainer from '../containers/SinglePinMapContainer';
import PinDetailsContainer from '../containers/PinDetailsContainer';
import SinglePinHeaderContainer from '../containers/SinglePinHeaderContainer';
import PinQRCode from './PinQRCode';
import { isEmpty } from 'helpers/generic';

const SinglePin = ({ isLoading, pin }) => (
    <>
        <SinglePinHeaderContainer />
        <div className="size-lg-12">
            <SinglePinMapContainer />
            {/* <PinHistoriesContainer /> */}

            {!isEmpty(pin) && <PinQRCode pin={pin} />}

            <PinDetailsContainer isLoading={isLoading} />
        </div>
    </>
);

export default SinglePin;
