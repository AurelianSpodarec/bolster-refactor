import React from 'react';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import Field from 'components/shared/generic/form/presentational/Field';
import DropdownContainer from 'components/shared/generic/form/containers/DropdownContainer';
import CheckboxContainer from 'components/shared/generic/form/containers/CheckboxContainer';
import ImageVisualContainer from '../containers/ImageVisualContainer';
import useColourTheme from 'hooks/useColourTheme';
import OptionPod from '../../../../../shared/generic/form/presentational/OptionPod';

import { ReactComponent as PdfIcon } from '_content/images/icons/PDF-Outline.svg';
import { ReactComponent as FloorplanIcon } from '_content/images/icons/pin-floorplan.svg';
import { ReactComponent as CsvIcon } from '_content/images/icons/CSV-Outline.svg';
import { ReactComponent as DocIcon } from '_content/images/icons/doc-Outline.svg';
import FlexWrapper from '../../../../../shared/generic/flexWrapper/FlexWrapper';

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
    const colourTheme = useColourTheme();
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
                                    <OptionPod
                                        checked={isPDFGeneration}
                                        onChange={handleFilterChange}
                                        name="isPDFGeneration"
                                        svgIconComponent={PdfIcon}
                                    />

                                    <OptionPod
                                        checked={isCSVGeneration}
                                        onChange={handleFilterChange}
                                        name="isCSVGeneration"
                                        svgIconComponent={CsvIcon}
                                    />

                                    <OptionPod
                                        checked={isFloorplanGeneration}
                                        onChange={handleFilterChange}
                                        name="isFloorplanGeneration"
                                        svgIconComponent={FloorplanIcon}
                                        pathStroke
                                    />

                                    <OptionPod
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
                            {isPDFGeneration && (
                                <>
                                    <div className="size-lg-12 " style={{ marginBottom: '10px' }}>
                                        <div
                                            className="size-lg-10 size-md-12 options-container"
                                            style={
                                                colourTheme === 'dark'
                                                    ? {
                                                          backgroundColor: 'transparent',
                                                      }
                                                    : {}
                                            }
                                        >
                                            <BlockHeading title="Additional PDF Settings" />
                                            <Field
                                                sizeClasses="size-lg-6 size-md-12"
                                                name="Include Pin Location?"
                                            >
                                                <CheckboxContainer
                                                    classes="with-subtext"
                                                    checked={
                                                        isPDFGeneration
                                                            ? includePinLocation
                                                            : isPDFGeneration
                                                    }
                                                    handleChange={handleFilterChange}
                                                    name="includePinLocation"
                                                />
                                                <p className="sub-text" />
                                            </Field>
                                            <Field
                                                sizeClasses="size-lg-6 size-md-12"
                                                name="Include Floorplan?"
                                            >
                                                <CheckboxContainer
                                                    classes="with-subtext"
                                                    checked={
                                                        isPDFGeneration
                                                            ? includeFloorplan
                                                            : isPDFGeneration
                                                    }
                                                    handleChange={handleFilterChange}
                                                    name="includeFloorplan"
                                                />
                                                <p className="sub-text" />
                                            </Field>
                                            <Field
                                                sizeClasses="size-lg-6 size-md-12"
                                                name="Cost Per Pin?"
                                            >
                                                <CheckboxContainer
                                                    classes="with-subtext"
                                                    checked={includeCostingData}
                                                    handleChange={handleFilterChange}
                                                    name="includeCostingData"
                                                />
                                                <p className="sub-text" />
                                            </Field>
                                        </div>
                                    </div>
                                </>
                            )}
                            {hasZones &&
                                ((isPDFGeneration && includeFloorplan) ||
                                    isFloorplanGeneration) && (
                                    <>
                                        <div
                                            className="size-lg-12 "
                                            style={{ marginBottom: '10px' }}
                                        >
                                            <div
                                                className="size-lg-10 size-md-12 options-container"
                                                style={
                                                    colourTheme === 'dark'
                                                        ? {
                                                              backgroundColor: 'transparent',
                                                              border: '1px solid var(--positive-stroke)',
                                                          }
                                                        : {}
                                                }
                                            >
                                                <BlockHeading title="Additional floor plan Settings" />
                                                <Field
                                                    sizeClasses="size-lg-6 size-md-12"
                                                    name="Include zones?"
                                                >
                                                    <CheckboxContainer
                                                        classes="with-subtext"
                                                        checked={includeFloorplanZones}
                                                        handleChange={handleFilterChange}
                                                        name="includeFloorplanZones"
                                                    />
                                                    <p className="sub-text" />
                                                </Field>
                                            </div>
                                        </div>
                                    </>
                                )}

                            <Field name="Sort by">
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

                            <Field name="Show hidden?">
                                <CheckboxContainer
                                    classes="with-subtext"
                                    checked={showHidden}
                                    handleChange={handleOptionChange}
                                    name="showHidden"
                                />
                                <p className="sub-text">
                                    - Check to include questions that are hidden on the templates?
                                </p>
                            </Field>
                        </div>
                        <div className="size-lg-6 size-md-12">
                            <ImageVisualContainer />
                        </div>
                        <BlockButtonWrapper>
                            <button className="button green" onClick={handleSubmit}>
                                <i className="fa fa-file" />
                                Generate report
                            </button>
                        </BlockButtonWrapper>
                    </div>
                </div>
            </BlockContainer>
        </div>
    );
};

export default OutputSettings;
