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

        {company.vatType !== VAT_TYPES.OUTSIDEEU && (
            <FieldOutput
                title="VAT Code"
                description={company.vatCode || 'Not provided'}
                fieldClass="no-h-padding"
            />
        )}

        <FieldOutput
            title="Shows on client list?"
            description={!company.hideOnClientList ? 'Yes' : 'No'}
            fieldClass="no-h-padding"
        />

        <div className="button-container left size-lg-12">
            {company.hideOnClientList ? (
                <button className="button yellow">Show on client list</button>
            ) : (
                <button className="button yellow">Hide on client list</button>
            )}
        </div>
    </div>
);

export default CompanyInfo;
