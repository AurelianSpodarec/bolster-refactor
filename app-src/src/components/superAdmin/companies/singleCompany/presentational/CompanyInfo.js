import React from 'react';

import FieldOutput from 'components/shared/generic/fieldOutput/presentational/FieldOutput';
import { VAT_TYPES, VAT_TYPE_NAME } from 'constants/companyAdmin/enums';

const CompanyInfo = ({ company }) => (
    <div className="size-lg-12">
        <FieldOutput title="Company Code" description={company.code} fieldClass="no-h-padding" />
        <FieldOutput
            title="VAT Type"
            description={VAT_TYPE_NAME[company.vatType] || 'Not provided'}
            fieldClass="no-h-padding"
        />

        {company.vatCode !== VAT_TYPES.OUTSIDEEU && (
            <FieldOutput
                title="VAT Code"
                description={company.vatCode || 'Not provided'}
                fieldClass="no-h-padding"
            />
        )}
    </div>
);

export default CompanyInfo;
