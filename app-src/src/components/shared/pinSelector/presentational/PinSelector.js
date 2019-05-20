import React from 'react';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import Field from 'components/shared/generic/form/presentational/Field';
import ExcludedBox from './ExcludedBox';
import IncludedBox from './IncludedBox';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';

const PinSelector = ({
    excludedPins,
    includedPins,
    handlePinClick,
    handleSubmit,
    selectedPinOptions,
    handleAddIncluded,
    handleAddExcluded,
    handleMouseDown,
    handleMouseUp,
    handleMouseOut,
    clicking
}) => (
    <>
        <BlockHeading title="Pin Selector" />

        <p className="generic-text intro-text size-lg-12">
            Using either of the boxes below or the pin map, select which pins
            you would like to be included in your report.
        </p>
        <div className="pin-selector size-lg-12">
            <div className="pin-selection-box">
                <h3>Excluded</h3>
                <ExcludedBox
                    selectedPinOptions={selectedPinOptions}
                    excludedPins={excludedPins}
                    handlePinClick={handlePinClick}
                    handleMouseDown={handleMouseDown}
                    handleMouseUp={handleMouseUp}
                    handleMouseOut={handleMouseOut}
                    clicking={clicking}
                />
            </div>
            {/* ##needs css## */}
            <div className="pin-selection-buttons">
                <ButtonContainer
                    className="exclude icon-only"
                    handleClick={handleAddExcluded}
                >
                    <i className="far fa-long-arrow-left" />
                </ButtonContainer>
                <ButtonContainer
                    className="include icon-only"
                    handleClick={handleAddIncluded}
                >
                    <i className="far fa-long-arrow-right" />
                </ButtonContainer>
            </div>
            <div className="pin-selection-box">
                <h3>Included</h3>
                <IncludedBox
                    selectedPinOptions={selectedPinOptions}
                    includedPins={includedPins}
                    handlePinClick={handlePinClick}
                    handleMouseDown={handleMouseDown}
                    handleMouseUp={handleMouseUp}
                    handleMouseOut={handleMouseOut}
                    clicking={clicking}
                />
            </div>
            <BlockButtonWrapper>
                <ButtonContainer
                    className="button"
                    type="button"
                    handleClick={handleSubmit}
                >
                    Submit
                </ButtonContainer>
            </BlockButtonWrapper>
        </div>
    </>
);

export default PinSelector;
