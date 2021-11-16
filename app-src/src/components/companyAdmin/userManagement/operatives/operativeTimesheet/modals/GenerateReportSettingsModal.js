import ImageVisualContainer from 'components/companyAdmin/reports/createReport/components/containers/ImageVisualContainer';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import CheckboxContainer from 'components/shared/generic/form/containers/CheckboxContainer';
import DropdownContainer from 'components/shared/generic/form/containers/DropdownContainer';
import Field from 'components/shared/generic/form/presentational/Field';
import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import { SORT_BY_OPTIONS_TEXT } from 'constants/companyAdmin/enums';
import { convertEnumToDropdownOptions } from 'helpers/generic';
import React from 'react';

const GenerateReportSettingsModal = ({
    handleChange,
    formData: {
        isPDFGeneration,
        isCSVGeneration,
        isFloorplanGeneration,
        isOAndMManualGeneration,
        selectSortBy,
        showHidden,
    },
    handleSubmit,
}) => {
    const sortByOptions = Object.values(convertEnumToDropdownOptions(SORT_BY_OPTIONS_TEXT));

    return (
        <ModalOuterContainer>
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
                                    <div className="checkbox-list size-lg-12">
                                        <CheckboxContainer
                                            checked={isPDFGeneration}
                                            handleChange={handleChange}
                                            name="isPDFGeneration"
                                            text="PDF"
                                        />
                                        <CheckboxContainer
                                            checked={isCSVGeneration}
                                            handleChange={handleChange}
                                            name="isCSVGeneration"
                                            text="CSV"
                                        />
                                        <CheckboxContainer
                                            checked={isFloorplanGeneration}
                                            handleChange={handleChange}
                                            name="isFloorplanGeneration"
                                            text="Floor plan"
                                        />
                                        {/* <CheckboxContainer
                                        checked={isOAndMManualGeneration}
                                        handleChange={(name, value) => {
                                            handleChange(name, value);
                                            if (value) {
                                                handleShowOandMModal();
                                            }
                                        }}
                                        name="isOAndMManualGeneration"
                                        text="Include O&M Manuals?"
                                    /> */}
                                    </div>
                                </Field>

                                <Field name="Sort by">
                                    <DropdownContainer
                                        name="sortBy"
                                        options={sortByOptions}
                                        singleSelect={true}
                                        handleChange={handleChange}
                                        value={selectSortBy}
                                        selectedOption={selectSortBy}
                                        withoutPlaceholder
                                    />
                                </Field>

                                <Field name="Show hidden?">
                                    <CheckboxContainer
                                        classes="with-subtext"
                                        checked={showHidden}
                                        handleChange={handleChange}
                                        name="showHidden"
                                    />
                                    <p className="sub-text">
                                        - Check to include questions that are hidden on the
                                        templates?
                                    </p>
                                </Field>
                            </div>
                            <div className="size-lg-6 size-md-12">
                                <ImageVisualContainer
                                    customFilters={{
                                        isCSVGeneration,
                                        isPDFGeneration,
                                        isOAndMManualGeneration,
                                        isFloorplanGeneration,
                                    }}
                                />
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
        </ModalOuterContainer>
    );
};

export default GenerateReportSettingsModal;
