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
                    <h3>Company Name: {company.name}</h3>
                    <p>Address Line 1: {company.addressLine1}</p>
                    <p>Address Line 2: {company.addressLine2}</p>
                    <p>Town: {company.town}</p>
                    <p>County: {company.county}</p>
                    <p>Postcode: {company.postcode}</p>
                </div>{' '}
                {/* company logo */}
                <div>
                    <h3>Logo</h3>
                    <img
                        alt={`company logo for ${company.name}`}
                        src={`${FILE_STORAGE_URL}/${company.logoFile}`}
                    />
                </div>
                {/* contact numbers */}
                <div>
                    <h3>Contact Numbers:</h3>
                    <p>Telephone: {company.telephone}</p>
                    <p>Fax: {company.fax}</p>
                </div>
                {/* company code */}
                <div>
                    <p>Company Code: {company.companyRegistrationNumber}</p>
                </div>
                {/* dark mode */}
                <div>
                    <h3>Colour Settings:</h3>
                    <p>Colour Code: {company.colourCode}</p>
                    <p>Dark Mode: {company.isBolsterLogoDark ? 'On' : 'Off'}</p>
                </div>
                <div>
                    <p>
                        Default Template Usage Rule:{' '}
                        {TEMPLATE_USAGE_RULES[company.defaultTemplateUsageRule]}
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
