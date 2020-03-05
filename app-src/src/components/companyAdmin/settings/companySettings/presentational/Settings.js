import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { FILE_STORAGE_URL } from 'config';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import Block from 'components/shared/generic/block/presentational/Block';
import {
    TEMPLATE_USAGE_RULES,
    VAT_TYPE_NAME,
    VAT_TYPES,
    DEFAULT_SITES_SORT_NAMES
} from 'constants/companyAdmin/enums';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import FieldOutput from 'components/shared/generic/fieldOutput/presentational/FieldOutput';

const Settings = ({
    isFetching,
    error,
    companySettings: company,
    onMobile
}) => {
    const { timeZone = {}, dateFormat = {} } = company;
    const notProvided = 'Not Provided';
    return (
        <>
            <PageHeading title="Company Settings" withBackButton>
                <Link
                    className="button yellow"
                    to="/company/settings/edit-settings"
                >
                    <i className="far fa-pencil" />
                    Edit Settings
                </Link>
            </PageHeading>

            <BlockContainer
                isFetching={isFetching}
                error={error}
                isEmpty={!company.name}
                noWhiteBackground
            >
                <div className="size-lg-8 size-md-12">
                    <Block>
                        {/* address, need block heading  */}

                        <BlockHeading title="Company Details" />
                        {onMobile ? (
                            <>
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
                                <FieldOutput
                                    title="Telephone"
                                    description={
                                        company.telephone || notProvided
                                    }
                                    fieldClass="no-h-padding"
                                />
                                <FieldOutput
                                    title="Fax"
                                    description={company.fax || notProvided}
                                    fieldClass="no-h-padding"
                                />
                                <FieldOutput
                                    title="Code"
                                    description={company.code}
                                    fieldClass="no-h-padding"
                                    sizeClass="size-lg-12"
                                />
                                <FieldOutput
                                    title="Short Code"
                                    description={company.shortCode}
                                    fieldClass="no-h-padding"
                                    sizeClass="size-lg-12"
                                />
                                <FieldOutput
                                    title="VAT Type"
                                    description={company.vatType}
                                    fieldClass="no-h-padding"
                                    sizeClass="size-lg-12"
                                />
                                {company.vatType &&
                                    company.vatType !== VAT_TYPES.OUTSIDEEU && (
                                        <FieldOutput
                                            title="VAT Code"
                                            description={company.vatCode}
                                            fieldClass="no-h-padding"
                                            sizeClass="size-lg-12"
                                        />
                                    )}
                            </>
                        ) : (
                                <div className="field-group size-lg-12">
                                    <div className="size-lg-4 size-md-12">
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

                                    <div className="size-lg-4 size-md-12">
                                        <FieldOutput
                                            title="Telephone"
                                            description={
                                                company.telephone || notProvided
                                            }
                                            fieldClass="no-h-padding"
                                        />
                                        <FieldOutput
                                            title="Fax"
                                            description={company.fax || notProvided}
                                            fieldClass="no-h-padding"
                                        />
                                        <FieldOutput
                                            title="VAT Type"
                                            description={
                                                VAT_TYPE_NAME[company.vatType]
                                            }
                                            fieldClass="no-h-padding"
                                        />
                                    </div>

                                    <div className="size-lg-4 size-md-12">
                                        <FieldOutput
                                            title="Code"
                                            description={company.code}
                                            fieldClass="no-h-padding"
                                            sizeClass="size-lg-12"
                                        />
                                        <FieldOutput
                                            title="Short Code"
                                            description={company.shortCode}
                                            fieldClass="no-h-padding"
                                            sizeClass="size-lg-12"
                                        />
                                        {company.vatType &&
                                            company.vatType !==
                                            VAT_TYPES.OUTSIDEEU && (
                                                <FieldOutput
                                                    title="VAT Code"
                                                    description={company.vatCode}
                                                    fieldClass="no-h-padding"
                                                    sizeClass="size-lg-12"
                                                />
                                            )}
                                    </div>
                                </div>
                            )}
                    </Block>

                    <Block>
                        <BlockHeading title="Display Settings" />
                        <FieldOutput
                            title="Company Logo"
                            fieldClass="no-h-padding"
                            sizeClass="size-lg-4 size-md-12"
                        >
                            {company.logoFile ? (
                                <img
                                    className="settings-logo"
                                    alt={`company logo for ${company.name}`}
                                    src={`${FILE_STORAGE_URL}/${company.logoFile}`}
                                />
                            ) : (
                                    <p className="no-data size-lg-12">No logo</p>
                                )}
                        </FieldOutput>
                        <FieldOutput
                            title="Colour Code"
                            description={company.colourCode || 'Not yet set'}
                            fieldClass="w-colour-box"
                            sizeClass="size-lg-4 size-md-12"
                        >
                            {company.colourCode && (
                                <div
                                    className="colour-box"
                                    style={{
                                        backgroundColor: company.colourCode
                                    }}
                                />
                            )}
                        </FieldOutput>
                        <FieldOutput
                            title="Dark Mode"
                            description={
                                company.isBolsterLogoDark ? 'On' : 'Off'
                            }
                            fieldClass="no-h-padding"
                            sizeClass="size-lg-4 size-md-12"
                        />
                        <FieldOutput
                            title="Timezone"
                            description={`${timeZone.name} - ${timeZone.offset}`}
                        />
                        <FieldOutput
                            title="Date Format"
                            description={dateFormat.momentDateTimeFormat}
                        />
                    </Block>
                </div>

                <div className="size-lg-4 size-md-12">
                    <Block>
                        <BlockHeading title="Access Controls" />
                        <FieldOutput
                            title="Companies allowed to edit?"
                            description={
                                company.isEditButtonEnabled ? 'Yes' : 'No'
                            }
                            fieldClass="no-h-padding"
                            sizeClass="size-lg-12"
                        />
                        <FieldOutput
                            title="QR Codes Enabled?"
                            description={company.enableQRCodes ? 'Yes' : 'No'}
                            fieldClass="no-h-padding"
                            sizeClass="size-lg-12"
                        />
                        <FieldOutput
                            title="QR Code Count"
                            description={company.qrCodeCount + ''}
                            fieldClass="no-h-padding"
                            sizeClass="size-lg-12"
                        />
                    </Block>

                    <Block>
                        <BlockHeading title="Label Settings" />
                        <FieldOutput
                            title="Is Using Bolster Labels?"
                            description={
                                company.isUsingBolsterLabels ? 'Yes' : 'No'
                            }
                            fieldClass="no-h-padding"
                            sizeClass="size-lg-12"
                        />
                        <FieldOutput
                            title="Telephone Number"
                            description={company.labelTelNumber || notProvided}
                            fieldClass="no-h-padding"
                            sizeClass="size-lg-12"
                        />
                        <FieldOutput
                            title="Company Name"
                            description={
                                company.labelCompanyName || notProvided
                            }
                            fieldClass="no-h-padding"
                            sizeClass="size-lg-12"
                        />
                    </Block>

                    <Block>
                        <BlockHeading title="Bolster Client List" />
                        <FieldOutput
                            title="Hidden on client list?"
                            description={
                                company.hideOnClientList ? 'Yes' : 'No'
                            }
                            fieldClass="no-h-padding"
                            sizeClass="size-lg-12"
                        />
                    </Block>

                    <Block>
                        <BlockHeading title="Template Settings" />
                        <FieldOutput
                            title="Default Template Usage Rule"
                            description={
                                TEMPLATE_USAGE_RULES[
                                company.defaultTemplateUsageRule
                                ]
                            }
                            fieldClass="no-h-padding"
                            sizeClass="size-lg-12"
                        />
                        <FieldOutput
                            title="Default Sites list sort"
                            description={
                                DEFAULT_SITES_SORT_NAMES[
                                company.defaultSitesSort
                                ]
                            }
                            fieldClass="no-h-padding"
                            sizeClass="size-lg-12"
                        />
                    </Block>
                </div>
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
