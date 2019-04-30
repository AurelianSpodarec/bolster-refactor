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
    fileTypeOptions,
    selectedFiletype,
    includePinLocation,
    sortByOptions,
    selectSortBy,
    layoutOptions,
    selectedLayout,
    showHidden
}) => (
    <div className="size-lg-12">
        <BlockContainer>
            <div className="size-lg-12">
                <BlockHeading title="Output Settings" />
                <div className="generic-form">
                    <div className="size-lg-6">
                        <Field name="Report formats">
                            <DropdownContainer
                                placeholder="Please select"
                                name="fileType"
                                options={fileTypeOptions}
                                selectedOption={selectedFiletype}
                                handleChange={handleFilterChange}
                                withoutPlaceholder
                            />
                        </Field>
                        <Field name="Include location drawing">
                            <Checkbox
                                checked={includePinLocation}
                                handleChange={handleFilterChange}
                                name="includePinLocation"
                            />
                        </Field>
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
