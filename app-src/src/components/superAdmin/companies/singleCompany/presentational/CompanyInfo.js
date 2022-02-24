import React from 'react';

import FieldOutput from 'components/shared/generic/fieldOutput/presentational/FieldOutput';
import { VAT_TYPE_NAME } from 'constants/companyAdmin/enums';
import { needsVatCode } from 'constants/shared/vatTypes';

const CompanyInfo = ({
    company,
    isPosting,
    handleToggleClientList,
    handleShowEditAddressModal,
    handleShowEditFreeCreditModal,
    handleShowEditJobRefDropdownModal,
}) => (
    <div className="size-lg-12">
        <FieldOutput title="Company Code" description={company.code} fieldClass="no-h-padding" />
        <FieldOutput
            title="VAT Type"
            description={VAT_TYPE_NAME[company.vatType] || 'Not provided'}
            fieldClass="no-h-padding"
        />

        {needsVatCode(company.vatType) && (
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
            title="Receives 1 free credit per 10 purchased"
            description={company.shouldReceiveFreeCredit ? 'Yes' : 'No'}
            fieldClass="no-h-padding"
        />

        <FieldOutput
            title="Shows on client list?"
            description={!company.hideOnClientList ? 'Yes' : 'No'}
            fieldClass="no-h-padding"
        />

        <FieldOutput title="Address" fieldClass="no-h-padding">
            <p>
                {company.addressLine1} <br />
                {company.addressLine2} <br />
                {company.town} <br />
                {company.county} <br />
                {company.postcode} <br />
                {company.country}
            </p>
        </FieldOutput>

        <div className="button-container vertical-spacing left size-lg-12">
            <button
                className={`button blue ${isPosting ? 'disabled' : ''}`}
                onClick={handleToggleClientList}
                disabled={isPosting}
            >
                {isPosting && <i className="fa fa-spinner fa-spin" />}
                {`${company.hideOnClientList ? 'Show' : 'Hide'} on client list`}
            </button>
            <button className="button yellow" onClick={() => handleShowEditAddressModal()}>
                Edit Address
            </button>
            <button className="button yellow" onClick={() => handleShowEditFreeCreditModal()}>
                Edit Free Credit
            </button>
            <button className="button yellow" onClick={() => handleShowEditJobRefDropdownModal()}>
                Edit Job Reference Dropdown
            </button>
        </div>
    </div>
);

export default CompanyInfo;
