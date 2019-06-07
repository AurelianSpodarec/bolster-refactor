import React from 'react';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';

import { FILE_STORAGE_URL } from 'config';
const ApprovedCompaniesListItem = ({
    company: {
        name,
        addressLine1,
        addressLine2,
        town,
        postcode,
        code,
        telephone,
        colourCode,
        logoFile
    }
}) => {
    return (
        <div>
            <BlockHeading classes="heading heading-2 underline-full half-margin">
                {name}
            </BlockHeading>
            <div className="size-lg-6">
                <BlockHeading classes="heading heading-3 half-margin">
                    Address
                </BlockHeading>
                <p className="size-lg-12">
                    {addressLine1} <br />
                    {!!addressLine2 && (
                        <>
                            <span>{addressLine2}</span> <br />
                        </>
                    )}
                    {town} <br />
                    {postcode} <br />
                </p>
                <BlockHeading classes="heading heading-3 half-margin">
                    Telephone
                </BlockHeading>
                <p>{!telephone ? 'Not provided' : `${telephone}`}</p>
                <BlockHeading classes="heading heading-3 half-margin">
                    Code
                </BlockHeading>
                <p>{code}</p>
            </div>

            <div className={`size-lg-6 ${logoFile ? 'company-logo' : ''}`}>
                {logoFile && (
                    <img
                        alt={`logo of ${name}`}
                        src={`${FILE_STORAGE_URL}/${logoFile}`}
                    />
                )}
            </div>
        </div>
    );
};

export default ApprovedCompaniesListItem;
