import React from 'react';

import DropdownContainer from 'components/shared/generic/form/containers/DropdownContainer';
import Field from 'components/shared/generic/form/presentational/Field';
import Checkbox from 'components/shared/generic/form/presentational/Checkbox';

const ReportFormats = ({
    reportFormatOptions,
    selectedReportFormat,
    includeLocationDrawing,
    handleChange
}) => (
    <>
        <Field name="Report formats">
            <DropdownContainer
                placeholder="Please select'"
                name="reportFormatsID"
                options={reportFormatOptions}
                selectedOption={selectedReportFormat}
                handleChange={handleChange}
            />
        </Field>
        <Field name="Include location drawing">
            <Checkbox
                checked={includeLocationDrawing}
                handleChange={handleChange}
                name="includeLocationDrawing"
            />
        </Field>
    </>
);

export default ReportFormats;
