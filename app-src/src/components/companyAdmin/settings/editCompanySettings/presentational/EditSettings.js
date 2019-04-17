import React from 'react';
import { connect } from 'react-redux';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import EditSettingsFormContainer from '../containers/EditSettingsFormContainer';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import BackButtonContainer from 'components/shared/generic/backButton/containers/BackButtonContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';

const EditSettings = ({ isFetching, error, companySettings: company }) => {
    return (
        <>
            <PageHeading leftChildren={true} title="Edit Company Settings">
                <BackButtonContainer />
            </PageHeading>
            <BlockContainer
                isFetching={isFetching}
                error={error}
                isEmpty={!company.name}
            >
                <BlockHeading title="Company Details" />
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
