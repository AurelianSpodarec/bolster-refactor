import React from 'react';

import FieldOutput from 'components/shared/generic/fieldOutput/presentational/FieldOutput';
import { VAT_TYPES, VAT_TYPE_NAME } from 'constants/companyAdmin/enums';

const CompanyInfo = ({ company, isPosting, handleToggleClientList }) => (
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
            title="Credits"
            description={company.creditValue || 0}
            fieldClass="no-h-padding"
        />

        <FieldOutput
            title="Shows on client list?"
            description={!company.hideOnClientList ? 'Yes' : 'No'}
            fieldClass="no-h-padding"
        />

        <div className="button-container left size-lg-12">
            <button
                className={`button yellow ${isPosting ? 'disabled' : ''}`}
                onClick={handleToggleClientList}
                disabled={isPosting}
            >
                {isPosting && <i className="fa fa-spinner fa-spin" />}
                {`${company.hideOnClientList ? 'Show' : 'Hide'} on client list`}
            </button>
        </div>
    </div>
);

export default CompanyInfo;
