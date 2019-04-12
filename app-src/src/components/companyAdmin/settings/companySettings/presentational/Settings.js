import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Breadcrumb from 'components/shared/generic/breadcrumb/presentational/Breadcrumb';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';

const Settings = ({ isFetching, error, companySettings: company }) => (
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
            isFetching={isFetching}
            error={error}
            isEmpty={!company.name}
            heading="Company Settings"
        />
    </>
);

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
