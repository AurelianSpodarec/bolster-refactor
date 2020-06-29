import React from 'react';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import MapPinSelectorBox from './MapPinSelectorBox';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';

const MapPinSelector = ({ pins, handleClick, isClient }) => (
    <>
        {isClient ? (
            <>
                <BlockHeading title="Pin Selector" />
                <div className="not-available size-lg-12">
                    <p className="size-lg-12">This is only available through accounts with a full subscription.</p>
                </div>
            </>
        ) : (
                <>
                    <BlockHeading title="Pin Selector">
                        <ButtonContainer handleClick={handleClick}>Scroll to map</ButtonContainer>
                    </BlockHeading>
                    <p className="generic-text intro-text size-lg-12">
                        Using the map above, draw rectangles to select the boundaries for pins to
                        include. Included pins will be display in this box.
                </p>
                    <div className="pin-selector size-lg-12 form-field">
                        <div className="pin-selection-box">
                            <p>Included: </p>
                            <MapPinSelectorBox pins={pins} />
                        </div>
                    </div>
                </>
            )}
    </>
);

export default MapPinSelector;
