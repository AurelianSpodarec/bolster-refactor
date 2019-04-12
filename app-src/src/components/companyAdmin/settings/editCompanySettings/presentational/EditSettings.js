import React from 'react';
import { connect } from 'react-redux';

import Breadcrumb from 'components/shared/generic/breadcrumb/presentational/Breadcrumb';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import EditSettingsFormContainer from '../containers/EditSettingsFormContainer';

const EditSettings = ({ isFetching, error, companySettings: company }) => {
    return (
        <>
            <Breadcrumb breadcrumbs={[{ text: '##Edit Company Settings##' }]} />
            <BlockContainer
                heading={company.name && `Edit ${company.name} Settings`}
                isFetching={isFetching}
                error={error}
                isEmpty={!company.name}
                className=""
            >
                <EditSettingsFormContainer />
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

export default connect(mapStateToProps)(EditSettings);
