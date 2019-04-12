import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { FILE_STORAGE_URL } from 'config';

import Breadcrumb from 'components/shared/generic/breadcrumb/presentational/Breadcrumb';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import { TEMPLATE_USAGE_RULES } from 'constants/companyAdmin/enums';

const Settings = ({ isFetching, error, companySettings: company }) => {
    return (
        <>
            <Breadcrumb breadcrumbs={[{ text: '##company settings##' }]} />
            <BlockButtonWrapper>
                <Link
                    className="button yellow"
                    to="/company/settings/edit-settings"
                >
                    <i className="far fa-pencil" />
                    Edit Settings
                </Link>
            </BlockButtonWrapper>
            <BlockContainer
                heading={company.name && `${company.name} Settings`}
                isFetching={isFetching}
                error={error}
                isEmpty={!company.name}
                className=""
            >
                {/* address  */}
                <div>
                    <h3 className="heading">Company Details</h3>
                    <p>Company Name: {company.name}</p>
                    <p>Address Line 1: {company.addressLine1}</p>
                    <p>Address Line 2: {company.addressLine2}</p>
                    <p>Town: {company.town}</p>
                    <p>County: {company.county}</p>
                    <p>Postcode: {company.postcode}</p>
                    <p>Telephone: {company.telephone}</p>
                    <p>Fax: {company.fax}</p>
                    <p>
                        Company Reg. Number: {company.companyRegistrationNumber}
                    </p>
                </div>
                <div>
                    <h3 className="heading">Company Codes</h3>
                    <p>Code: {company.code}</p>
                    <p>Short Code: {company.shortCode}</p>
                </div>
                <div>
                    <h3 className="heading">Display Settings</h3>
                    <p>Company Logo:</p>
                    <img
                        alt={`company logo for ${company.name}`}
                        src={`${FILE_STORAGE_URL}/${company.logoFile}`}
                    />
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
