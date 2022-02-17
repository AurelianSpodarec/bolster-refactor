import React from 'react';

import SinglePinMapContainer from '../containers/SinglePinMapContainer';
import PinDetailsContainer from '../containers/PinDetailsContainer';
import SinglePinHeaderContainer from '../containers/SinglePinHeaderContainer';
import PinQRCode from './PinQRCode';
import { isEmpty } from 'helpers/generic';
import SinglePinsTaskContainer from '../containers/SinglePinsTaskContainer';

const SinglePin = ({ isLoading, pin }) => (
    <>
        <SinglePinHeaderContainer />
        <div className="size-lg-12">
            <SinglePinMapContainer />

            {!isEmpty(pin) && <PinQRCode pin={pin} />}

            <SinglePinsTaskContainer />

            <PinDetailsContainer isLoading={isLoading} />
        </div>
    </>
);

export default SinglePin;
