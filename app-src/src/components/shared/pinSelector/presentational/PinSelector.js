import React from 'react';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import Field from 'components/shared/generic/form/presentational/Field';
import ExcludedBox from './ExcludedBox';
import IncludedBox from './IncludedBox';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';

const PinSelector = ({
    excludedPins,
    includedPins,
    handlePinClick,
    handleSubmit,
    selectedPinOptions,
    handleAddIncluded,
    handleAddExcluded
}) => (
    <>
        <BlockHeading title="Pin Selector" />

        <p className="generic-text intro-text size-lg-12">
            Using either of the boxes below or the pin map, select which pins
            you would like to be included in your report.
        </p>
        <div className="pin-selector size-lg-12">
            <div className="size-lg-4">
                <Field name="Excluded">
                    <ExcludedBox
                        selectedPinOptions={selectedPinOptions}
                        excludedPins={excludedPins}
                        handlePinClick={handlePinClick}
                    />
                </Field>
            </div>
            {/* ##needs css## */}
            <div className="size-lg-1">
                <ButtonContainer
                    className="icon-only"
                    handleClick={handleAddExcluded}
                >
                    <i className="fa fa-arrow-left" />
                </ButtonContainer>
                <ButtonContainer
                    className="icon-only"
                    handleClick={handleAddIncluded}
                >
                    <i className="fa fa-arrow-right" />
                </ButtonContainer>
            </div>
            <div className="size-lg-4">
                <Field name="Included">
                    <IncludedBox
                        selectedPinOptions={selectedPinOptions}
                        includedPins={includedPins}
                        handlePinClick={handlePinClick}
                    />
                </Field>
            </div>

            <button className="button" type="button" onClick={handleSubmit}>
                Submit
            </button>
        </div>
    </>
);

export default PinSelector;
