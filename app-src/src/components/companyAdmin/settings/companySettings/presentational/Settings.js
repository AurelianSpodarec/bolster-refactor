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
    const { timeZone = {}, dateFormat = {} } = company;
    return (
        <>
            <PageHeading title="Company Settings" />

            <BlockContainer
                isFetching={isFetching}
                error={error}
                isEmpty={!company.name}
            >
                {/* address  */}
                <div className="field-group size-lg-12">
                    <div className=" size-lg-4">
                        <FieldOutput
                            title="Company Name"
                            description={company.name}
                            fieldClass="no-h-padding"
                        />
                        <FieldOutput
                            title="Address"
                            description={company.addressLine1}
                            fieldClass="address no-h-padding"
                        >
                            <p>{company.addressLine2}</p>
                            <p>{company.town}</p>
                            <p>{company.county}</p>
                            <p>{company.postcode}</p>
                        </FieldOutput>
                    </div>

                    <div className="size-lg-4">
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
                    <BlockHeading classes="sub-heading" title="Company Code" />

                    <FieldOutput
                        title="Code"
                        description={company.code}
                        fieldClass="no-h-padding"
                        sizeClass="size-lg-4"
                    />
                    <FieldOutput
                        title="Short Code"
                        description={company.shortCode}
                        fieldClass="no-h-padding"
                        sizeClass="size-lg-4"
                    />
                </div>

                <BlockHeading classes="sub-heading" title="Display Settings" />

                <FieldOutput
                    title="Company Logo"
                    fieldClass="no-h-padding"
                    sizeClass="size-lg-4"
                >
                    {company.logoFile ? (
                        <img
                            alt={`company logo for ${company.name}`}
                            src={`${FILE_STORAGE_URL}/${company.logoFile}`}
                        />
                    ) : (
                        <p className="no-data size-lg-12">No logo</p>
                    )}
                </FieldOutput>
                <FieldOutput
                    title="Colour Code"
                    description={company.colourCode}
                    fieldClass="no-h-padding"
                    sizeClass="size-lg-4"
                />
                <FieldOutput
                    title="Dark Mode"
                    description={company.isBolsterLogoDark ? 'On' : 'Off'}
                    fieldClass="no-h-padding"
                    sizeClass="size-lg-4"
                />

                <FieldOutput
                    title="Timezone"
                    description={`${timeZone.name} - ${timeZone.offset}`}
                />

                <FieldOutput
                    title="Date Format"
                    description={dateFormat.momentDateTimeFormat}
                />

                <BlockHeading classes="sub-heading" title="Template Settings" />
                <FieldOutput
                    title="Default Template Usage Rule"
                    description={
                        TEMPLATE_USAGE_RULES[company.defaultTemplateUsageRule]
                    }
                    fieldClass="no-h-padding"
                    sizeClass="size-lg-4"
                />
                <div className="size-lg-12">
                    <BlockHeading title="Label Settings" />
                    <FieldOutput
                        title="Telephone Number"
                        description={company.labelTelNumber}
                        fieldClass="no-h-padding"
                        sizeClass="size-lg-4"
                    />
                    <FieldOutput
                        title="Company Name"
                        description={company.labelCompanyName}
                        fieldClass="no-h-padding"
                        sizeClass="size-lg-4"
                    />

                    <BlockHeading
                        classes="sub-heading"
                        title="Bolster Client List"
                    />
                    <FieldOutput
                        title="Hidden on client list?"
                        description={company.hideOnClientList ? 'Yes' : 'No'}
                        fieldClass="no-h-padding"
                        sizeClass="size-lg-4"
                    />
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
