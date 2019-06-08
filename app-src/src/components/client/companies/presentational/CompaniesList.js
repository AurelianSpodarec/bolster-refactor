import React from 'react';
import Block from 'components/shared/generic/block/presentational/Block';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';

import { FILE_STORAGE_URL } from 'config/index';

const CompaniesList = ({ companies, selectCompany }) => (
    <div className="flex-row size-lg-12">
        {companies.map(company => (
            <Block containerClass="flex-row-item size-lg-6" key={company.id}>
                <>
                    <BlockHeading classes="heading heading-2 underline-full half-margin">
                        {company.name}
                    </BlockHeading>

                    <div className="size-lg-6">
                        <BlockHeading classes="heading heading-3 half-margin">
                            Address
                        </BlockHeading>
                        <p className="size-lg-12">
                            {company.addressLine1} <br />
                            {company.addressLine2 && (
                                <>
                                    {company.addressLine2} <br />
                                </>
                            )}
                            {company.town} <br />
                            {company.postcode} <br />
                        </p>
                        <BlockHeading classes="heading heading-3 half-margin">
                            Telephone
                        </BlockHeading>
                        <p className="size-lg-12">{company.telephone}</p>
                    </div>

                    {company.logoFile && (
                        <div className="size-lg-6 company-logo">
                            <img
                                alt={`logo of ${company.name}`}
                                src={`${FILE_STORAGE_URL}/${company.logoFile}`}
                            />
                        </div>
                    )}

                    <div className="button-block-container size-lg-12">
                        <button
                            className="button green"
                            onClick={() => selectCompany(company.id)}
                        >
                            Select company
                        </button>
                    </div>
                </>
            </Block>
        ))}
    </div>
);

export default CompaniesList;
