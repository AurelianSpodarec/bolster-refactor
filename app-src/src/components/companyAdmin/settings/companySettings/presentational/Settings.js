import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { FILE_STORAGE_URL } from 'config';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import { TEMPLATE_USAGE_RULES } from 'constants/companyAdmin/enums';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import FieldOutput from 'components/shared/generic/fieldOutput/presentational/FieldOutput';

const Settings = ({ isFetching, error, companySettings: company }) => {
    return (
        <>
            <PageHeading title="Company Settings" />

            <BlockContainer
                isFetching={isFetching}
                error={error}
                isEmpty={!company.name}
            >
                {/* address  */}
                <div className="size-lg-12">
                    <BlockHeading
                        classes="sub-heading"
                        title="Company Details"
                    />
                    <div className="size-lg-4">
                        <FieldOutput
                            title="Company Name"
                            description={company.name}
                            fieldClass="no-h-padding"
                        />
                        <FieldOutput
                            title="Address"
                            description={company.addressLine1}
                            fieldClass="no-h-padding"
                        >
                            <p>{company.addressLine2}</p>
                            <p>{company.town}</p>
                            <p>{company.county}</p>
                            <p>{company.postcode}</p>
                        </FieldOutput>
                    </div>
                    <div className="size-lg-4">
                        <FieldOutput
                            title="Telephone"
                            description={company.telephone}
                            fieldClass="no-h-padding"
                        />
                        <FieldOutput
                            title="Fax"
                            description={company.fax}
                            fieldClass="no-h-padding"
                        />
                        <FieldOutput
                            title="Company Reg. Number"
                            description={company.companyRegistrationNumber}
                            fieldClass="no-h-padding"
                        />
                    </div>
                </div>
                <div className="size-lg-12">
                    <BlockHeading title="Company Code" />
                    {/* <h3 className="heading">Company Codes</h3> */}
                    <p>Code: {company.code}</p>
                    <p>Short Code: {company.shortCode}</p>
                </div>
                <div>
                    <h3 className="heading">Display Settings</h3>
                    <p>Company Logo:</p>
                    {company.logoFile ? (
                        <img
                            alt={`company logo for ${company.name}`}
                            src={`${FILE_STORAGE_URL}/${company.logoFile}`}
                        />
                    ) : (
                        <p>##No logo##</p>
                    )}

                    <p>Colour Code: {company.colourCode}</p>
                    <p>Dark Mode: {company.isBolsterLogoDark ? 'On' : 'Off'}</p>
                </div>
                <div>
                    <h3 className="heading">Template Settings</h3>
                    <p>
                        Default Template Usage Rule:{' '}
                        {TEMPLATE_USAGE_RULES[company.defaultTemplateUsageRule]}
                    </p>
                </div>
                <div>
                    <h3 className="heading">Label Settings</h3>
                    <p>
                        Telephone Number:
                        {company.labelTelNumber}
                    </p>
                    <p>
                        Company Name:
                        {company.labelCompanyName}
                    </p>
                </div>
                <div>
                    <h3 className="heading">Bolster Client List</h3>
                    <p>
                        Hidden on client list?{' '}
                        {company.hideOnClientList ? 'Yes' : 'No'}
                    </p>
                </div>
                <BlockButtonWrapper>
                    <Link
                        className="button yellow"
                        to="/company/settings/edit-settings"
                    >
                        <i className="far fa-pencil" />
                        Edit Settings
                    </Link>
                </BlockButtonWrapper>
            </BlockContainer>
        </>
    );
};

const mapStateToProps = ({
    companyAdmin: {
        companySettingsReducer: { isFetching, error, companySettings }
    }
}) => ({
    isFetching,
    error,
    companySettings
});

export default connect(mapStateToProps)(Settings);
