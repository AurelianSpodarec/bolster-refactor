import React from 'react';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import Field from 'components/shared/generic/form/presentational/Field';
import DropdownContainer from 'components/shared/generic/form/containers/DropdownContainer';
import CheckboxContainer from 'components/shared/generic/form/containers/CheckboxContainer';

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
    showHidden
}) => (
    <div className="size-lg-12">
        <BlockContainer>
            <div className="size-lg-12">
                <BlockHeading title="Output Settings" />
                <p className="generic-text small">
                    Below you can choose formatting options for your report.
                </p>
                <div className="generic-form">
                    <div className="size-lg-6">
                        <Field name="Report formats">
                            <div className="checkbox-list size-lg-12">
                                <CheckboxContainer
                                    checked={isPDFGeneration}
                                    handleChange={handleFilterChange}
                                    name="isPDFGeneration"
                                    text="PDF"
                                />
                                <CheckboxContainer
                                    checked={isCSVGeneration}
                                    handleChange={handleFilterChange}
                                    name="isCSVGeneration"
                                    text="CSV"
                                />
                                <CheckboxContainer
                                    checked={isFloorplanGeneration}
                                    handleChange={handleFilterChange}
                                    name="isFloorplanGeneration"
                                    text="Floor plan"
                                />
                            </div>
                        </Field>
                        {isPDFGeneration && (
                            <>
                                <div className="size-lg-12 ">
                                    <div className="size-lg-10 options-container">
                                        <BlockHeading title="Additional PDF Settings" />
                                        <Field
                                            sizeClasses="size-lg-6"
                                            name="Include Pin Location?"
                                        >
                                            <CheckboxContainer
                                                classes="with-subtext"
                                                checked={
                                                    isPDFGeneration
                                                        ? includePinLocation
                                                        : isPDFGeneration
                                                }
                                                handleChange={
                                                    handleFilterChange
                                                }
                                                name="includePinLocation"
                                            />
                                            <p className="sub-text" />
                                        </Field>
                                        <Field
                                            sizeClasses="size-lg-6"
                                            name="Include Floorplan?"
                                        >
                                            <CheckboxContainer
                                                classes="with-subtext"
                                                checked={
                                                    isPDFGeneration
                                                        ? includePinLocation
                                                        : isPDFGeneration
                                                }
                                                handleChange={
                                                    handleFilterChange
                                                }
                                                name="includeFloorplan"
                                            />
                                            <p className="sub-text" />
                                        </Field>
                                    </div>
                                </div>
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
                                - Check to include questions that are hidden on
                                the templates?
                            </p>
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
