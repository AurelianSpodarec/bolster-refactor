import ImageVisualContainer from 'components/companyAdmin/reports/createReport/components/containers/ImageVisualContainer';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import CheckboxContainer from 'components/shared/generic/form/containers/CheckboxContainer';
import Field from 'components/shared/generic/form/presentational/Field';
import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import React from 'react';
import useGenerateTimesheetReport from '../hooks/useGenerateTimesheetReport';

const GenerateTimesheetReportModal = ({
    fromDateInclusive,
    toDateInclusive,
    serviceID,
    hierarchyID,
    pinIDs,
}) => {
    const { formData, handleChange, handleSubmit } = useGenerateTimesheetReport(
        fromDateInclusive,
        toDateInclusive,
        serviceID,
        hierarchyID,
        pinIDs,
    );

    const { isPDFGeneration, isCSVGeneration, isFloorplanGeneration, isOAndMManualGeneration } =
        formData;

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
                                        <CheckboxContainer
                                            checked={isOAndMManualGeneration}
                                            handleChange={handleChange}
                                            name="isOAndMManualGeneration"
                                            text="Include O&M Manuals?"
                                        />
                                    </div>
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

export default GenerateTimesheetReportModal;
