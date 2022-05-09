import React from 'react';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import Field from 'components/shared/generic/form/presentational/Field';
import DropdownContainer from 'components/shared/generic/form/containers/DropdownContainer';
import ImageVisualContainer from '../containers/ImageVisualContainer';
import OptionPodContainer from '../../../../../shared/generic/form/containers/OptionPodContainer';

import { ReactComponent as PdfIcon } from '_content/images/icons/PDF-Outline.svg';
import { ReactComponent as FloorplanIcon } from '_content/images/icons/pin-floorplan.svg';
import { ReactComponent as CsvIcon } from '_content/images/icons/CSV-Outline.svg';
import { ReactComponent as DocIcon } from '_content/images/icons/doc-Outline.svg';
import FlexWrapper from '../../../../../shared/generic/flexWrapper/FlexWrapper';
import Tickbox from '../../../../../shared/generic/form/presentational/Tickbox';
import ButtonWrapper from 'components/shared/generic/button/presentational/ButtonWrapper';
import ActionButton from 'components/shared/generic/button/presentational/ActionButton';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';

const OutputSettings = ({
    handleSubmit,
    handleFilterChange,
    handleOptionChange,
    includePinLocation,
    sortByOptions,
    selectSortBy,
    isPDFGeneration,
    isCSVGeneration,
    isFloorplanGeneration,
    includeFloorplan,
    isOAndMManualGeneration,
    showHidden,
    handleShowOandMModal,
    includeFloorplanZones,
    hasZones = false,
    includeCostingData,
}) => {
    return (
        <div className="size-lg-12">
            <BlockContainer>
                <div className="size-lg-12">
                    <BlockHeading title="Output Settings" />
                    <p className="generic-text small">
                        Below you can choose formatting options for your report.
                    </p>
                    <div className="generic-form">
                        <div className="size-lg-6 size-md-12">
                            <Field name="Report formats">
                                <FlexWrapper gap={15} wrap="wrap" extraClasses="option-wrapper">
                                    <OptionPodContainer
                                        checked={isPDFGeneration}
                                        onChange={handleFilterChange}
                                        name="isPDFGeneration"
                                        svgIconComponent={PdfIcon}
                                    />

                                    <OptionPodContainer
                                        checked={isCSVGeneration}
                                        onChange={handleFilterChange}
                                        name="isCSVGeneration"
                                        svgIconComponent={CsvIcon}
                                    />

                                    <OptionPodContainer
                                        checked={isFloorplanGeneration}
                                        onChange={handleFilterChange}
                                        name="isFloorplanGeneration"
                                        svgIconComponent={FloorplanIcon}
                                        pathStroke
                                    />

                                    <OptionPodContainer
                                        checked={isOAndMManualGeneration}
                                        onChange={(name, value) => {
                                            handleFilterChange(name, value);
                                            if (value) {
                                                handleShowOandMModal();
                                            }
                                        }}
                                        name="isOAndMManualGeneration"
                                        svgIconComponent={DocIcon}
                                    />
                                </FlexWrapper>
                            </Field>
                            <>
                                <div className="size-lg-12 ">
                                    <BlockHeading title="Include:" />
                                    {isPDFGeneration && (
                                        <>
                                            <Field sizeClasses="size-lg-3 size-md-12">
                                                <Tickbox
                                                    classes="large-text"
                                                    checked={
                                                        isPDFGeneration
                                                            ? includePinLocation
                                                            : isPDFGeneration
                                                    }
                                                    name="includePinLocation"
                                                    handleChange={handleFilterChange}
                                                    label="Pin Locations"
                                                />
                                            </Field>
                                            <Field sizeClasses="size-lg-3 size-md-12">
                                                <Tickbox
                                                    classes="large-text"
                                                    checked={
                                                        isPDFGeneration
                                                            ? includeFloorplan
                                                            : isPDFGeneration
                                                    }
                                                    name="includeFloorplan"
                                                    handleChange={handleFilterChange}
                                                    label="Floorplan"
                                                />
                                            </Field>

                                            <Field sizeClasses="size-lg-3 size-md-12">
                                                <Tickbox
                                                    classes="large-text"
                                                    checked={includeCostingData}
                                                    name="includeCostingData"
                                                    handleChange={handleFilterChange}
                                                    label="Cost Per Pin"
                                                />
                                            </Field>
                                        </>
                                    )}
                                    <Field sizeClasses="size-lg-3 size-md-12">
                                        <Tickbox
                                            classes="large-text"
                                            checked={showHidden}
                                            name="showHidden"
                                            handleChange={handleOptionChange}
                                            label="Hidden"
                                        />
                                    </Field>
                                </div>
                            </>
                            {hasZones &&
                                ((isPDFGeneration && includeFloorplan) ||
                                    isFloorplanGeneration) && (
                                    <>
                                        <div className="size-lg-12">
                                            <BlockHeading title="Additional floor plan Settings" />
                                            <Field sizeClasses="size-lg-3 size-md-12">
                                                <Tickbox
                                                    classes="large-text"
                                                    checked={includeFloorplanZones}
                                                    name="includeFloorplanZones"
                                                    handleChange={handleFilterChange}
                                                    label="Include Zones:"
                                                />
                                            </Field>
                                        </div>
                                    </>
                                )}
                            <Field name="Sort">
                                <DropdownContainer
                                    name="sortBy"
                                    options={sortByOptions}
                                    singleSelect={true}
                                    handleChange={handleOptionChange}
                                    value={selectSortBy}
                                    selectedOption={selectSortBy}
                                    withoutPlaceholder
                                />
                            </Field>
                        </div>
                        <div className="size-lg-6 size-md-12">
                            <ImageVisualContainer />
                        </div>
                        <FlexWrapper align="end" justify="end">
                            <ActionButton
                                onClick={handleSubmit}
                                text="Generate Report"
                                size="small"
                            />
                        </FlexWrapper>
                    </div>
                </div>
            </BlockContainer>
        </div>
    );
};

export default OutputSettings;
