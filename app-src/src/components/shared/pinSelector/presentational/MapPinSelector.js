import React from 'react';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import MapPinSelectorBox from './MapPinSelectorBox';

const MapPinSelector = ({ pins }) => (
    <>
        <BlockHeading title="Pin Selector" />
        <p className="generic-text intro-text size-lg-12">
            ##Using the map above, draw rectangles to select the boundaries for
            pins to include. Included pins will be display in this box.##
        </p>
        <div className="pin-selector size-lg-12 form-field">
            <MapPinSelectorBox pins={pins} />
        </div>
    </>
);

export default MapPinSelector;
