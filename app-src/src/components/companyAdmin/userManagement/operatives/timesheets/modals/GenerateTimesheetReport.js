import React from 'react';
import { DateRangePicker } from 'react-date-range';
import { createStaticRanges, defaultStaticRanges } from 'react-date-range/src/defaultRanges';
import moment from 'moment';

import useGenerateTimesheetReport from '../hooks/useGenerateTimesheetReport';

import ActionButton from 'components/shared/generic/button/presentational/ActionButton';
import FlexWrapper from 'components/shared/generic/flexWrapper/FlexWrapper';
import Field from 'components/shared/generic/form/presentational/Field';
import Tickbox from 'components/shared/generic/form/presentational/Tickbox';
import Form from 'components/shared/generic/form/containers/Form';
import FlexModalOuter from 'components/shared/generic/modals/presentational/FlexModalOuter';
import ButtonWrapper from 'components/shared/generic/button/presentational/ButtonWrapper';
import useBolsterPlus from 'components/companyAdmin/subscription/addOns/hooks/useBolsterPlus';
import TooltipContainer from 'components/shared/generic/tooltip/containers/TooltipContainer';

const GenerateTimesheetReportModal = ({ fromDateInclusive, toDateInclusive }) => {
    const { formData, handleChange, handleSubmit, isPosting, postError } =
        useGenerateTimesheetReport(fromDateInclusive, toDateInclusive);
    const { isBolsterPlusActivated } = useBolsterPlus();

    const { startDate, endDate, includeBreaks, includeJobReferences, includeWages } = formData;

    const valueObj = {
        startDate,
        endDate,
        key: 'selection',
    };

    const staticRanges = [
        ...defaultStaticRanges.slice(0, 2),
        ...createStaticRanges([
            {
                label: 'Last 7 Days',
                range: () => ({
                    startDate: moment().subtract(7, 'days').toDate(),
                    endDate: moment().toDate(),
                }),
            },
            {
                label: 'Last 14 Days',
                range: () => ({
                    startDate: moment().subtract(14, 'days').toDate(),
                    endDate: moment().toDate(),
                }),
            },
            {
                label: 'Last 30 Days',
                range: () => ({
                    startDate: moment().subtract(30, 'days').toDate(),
                    endDate: moment().toDate(),
                }),
            },
            {
                label: 'Last 90 Days',
                range: () => ({
                    startDate: moment().subtract(90, 'days').toDate(),
                    endDate: moment().toDate(),
                }),
            },
        ]),
    ];

    return (
        <FlexModalOuter title="Timesheet Output Settings">
            <Form
                error={postError}
                className="generic-form flex-content-wrapper size-lg-12"
                onSubmit={handleSubmit}
            >
                <div className="flex-content">
                    <div className="form-fields-container">
                        <Field name="Date Range">
                            <DateRangePicker
                                // locale={locale}
                                ranges={[valueObj]}
                                onChange={ranges => {
                                    const { key, ...selection } = ranges.selection;
                                    handleChange('startDate', selection.startDate);
                                    handleChange('endDate', selection.endDate);
                                }}
                                staticRanges={staticRanges}
                                inputRanges={[]}
                            />
                        </Field>
                        <Field name="Include">
                            <FlexWrapper align="center" justify="start">
                                <Tickbox
                                    label="Job References"
                                    name="includeJobReferences"
                                    checked={includeJobReferences}
                                    handleChange={handleChange}
                                />
                                <Tickbox
                                    label="Breaks"
                                    name="includeBreaks"
                                    checked={includeBreaks}
                                    handleChange={handleChange}
                                />
                                <Tickbox
                                    label="Wages"
                                    name="includeWages"
                                    checked={includeWages}
                                    handleChange={handleChange}
                                />
                            </FlexWrapper>
                        </Field>
                    </div>
                </div>
                {isBolsterPlusActivated ? (
                    <ButtonWrapper alignment="right" extraClasses="flex-modal-footer">
                        <ActionButton
                            text="Generate Report"
                            size="medium"
                            icon={isPosting ? 'spinner' : 'file-csv'}
                            iconSpin={isPosting}
                            type="submit"
                        />
                    </ButtonWrapper>
                ) : (
                    <ButtonWrapper alignment="right" extraClasses="flex-modal-footer">
                        <TooltipContainer
                            text="Generate Timesheets Report is available for Bolster Plus users only."
                            side="top"
                        >
                            <ActionButton
                                text="Generate Report"
                                size="medium"
                                icon={isPosting ? 'spinner' : 'file-csv'}
                                iconSpin={isPosting}
                                type="submit"
                                disabled={true}
                            />
                        </TooltipContainer>
                    </ButtonWrapper>
                )}
            </Form>
        </FlexModalOuter>
    );
};

export default GenerateTimesheetReportModal;
