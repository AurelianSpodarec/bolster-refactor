import React from 'react';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import ActionButton from 'components/shared/generic/button/presentational/ActionButton';
import FlexWrapper from 'components/shared/generic/flexWrapper/FlexWrapper';
import { DateRangePicker } from 'react-date-range';
import { createStaticRanges, defaultStaticRanges } from 'react-date-range/src/defaultRanges';
import Field from 'components/shared/generic/form/presentational/Field';
import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import useGenerateTimesheetReport from '../hooks/useGenerateTimesheetReport';
import moment from 'moment';
import Tickbox from 'components/shared/generic/form/presentational/Tickbox';
import Form from 'components/shared/generic/form/containers/Form';

const GenerateTimesheetReportModal = ({ fromDateInclusive, toDateInclusive }) => {
    const { formData, handleChange, handleSubmit, isPosting, postError } =
        useGenerateTimesheetReport(fromDateInclusive, toDateInclusive);

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
        <ModalOuterContainer extraClasses="medium">
            <div className="size-lg-12">
                <BlockContainer>
                    <div className="size-lg-12">
                        <BlockHeading title="Timesheet Output Settings" />
                        <Form error={postError}>
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
                            <FlexWrapper align="stretch" justify="end">
                                <ActionButton
                                    onClick={handleSubmit}
                                    text="Generate Report"
                                    size="medium"
                                    icon={isPosting ? 'spinner' : 'file-csv'}
                                    iconSpin={isPosting}
                                    minWidth="100%"
                                    extraClasses="justify-center"
                                />
                            </FlexWrapper>
                        </Form>
                    </div>
                </BlockContainer>
            </div>
        </ModalOuterContainer>
    );
};

export default GenerateTimesheetReportModal;
