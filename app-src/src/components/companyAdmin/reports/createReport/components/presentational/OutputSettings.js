import React from 'react';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import Field from 'components/shared/generic/form/presentational/Field';
import DropdownContainer from 'components/shared/generic/form/containers/DropdownContainer';
import Checkbox from 'components/shared/generic/form/presentational/Checkbox';

const OutputSettings = ({
    handleSubmit,
    handleFilterChange,
    handleOptionChange,
    includePinLocation,
    sortByOptions,
    selectSortBy,
    layoutOptions,
    selectedLayout,
    isPDFGeneration,
    isCSVGeneration,
    isFloorplanGeneration,
    showHidden
}) => (
    <div className="size-lg-12">
        <BlockContainer>
            <div className="size-lg-12">
                <BlockHeading title="Output Settings" />
                <div className="generic-form">
                    <div className="size-lg-6">
                        <Field name="Report formats">
                            <div className="checkbox-list size-lg-12">
                                <Checkbox
                                    checked={isPDFGeneration}
                                    handleChange={handleFilterChange}
                                    name="isPDFGeneration"
                                    text="PDF"
                                />
                                <Checkbox
                                    checked={isCSVGeneration}
                                    handleChange={handleFilterChange}
                                    name="isCSVGeneration"
                                    text="CSV"
                                />
                                <Checkbox
                                    checked={isFloorplanGeneration}
                                    handleChange={handleFilterChange}
                                    name="isFloorplanGeneration"
                                    text="Floor plan"
                                />
                            </div>
                        </Field>
                        {isPDFGeneration && (
                            <>
                                <Field name="Include location drawing">
                                    <Checkbox
                                        checked={
                                            isPDFGeneration
                                                ? includePinLocation
                                                : isPDFGeneration
                                        }
                                        handleChange={handleFilterChange}
                                        name="includePinLocation"
                                    />
                                </Field>
                                <Field name="Layout">
                                    <DropdownContainer
                                        name="layout"
                                        options={layoutOptions}
                                        singleSelect={true}
                                        handleChange={handleOptionChange}
                                        selectedOption={selectedLayout}
                                        withoutPlaceholder
                                    />
                                </Field>
                            </>
                        )}
                    </div>
                    <div className="size-lg-6">
                        <Field name="Sort by">
                            <DropdownContainer
                                name="sortBy"
                                options={sortByOptions}
                                singleSelect={true}
                                handleChange={handleOptionChange}
                                selectedOption={selectSortBy}
                                withoutPlaceholder
                            />
                        </Field>

                        <Field name="Show hidden?">
                            <Checkbox
                                checked={showHidden}
                                handleChange={handleOptionChange}
                                name="showHidden"
                            />
                        </Field>
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

export default OutputSettings;
