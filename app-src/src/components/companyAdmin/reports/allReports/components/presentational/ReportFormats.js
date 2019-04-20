import React from 'react';

import DropdownContainer from 'components/shared/generic/form/containers/DropdownContainer';
import Field from 'components/shared/generic/form/presentational/Field';

const ReportFormats = ({
    reportFormatOptions,
    selectedReportFormat,
    handleChange
}) => (
    <Field name="Report formats">
        <DropdownContainer
            placeholder="Please select'"
            name="reportFormatsID"
            options={reportFormatOptions}
            selectedOption={selectedReportFormat}
            handleChange={handleChange}
        />
    </Field>
);

export default ReportFormats;
