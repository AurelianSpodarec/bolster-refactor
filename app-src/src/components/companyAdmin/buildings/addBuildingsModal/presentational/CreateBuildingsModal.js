import React from 'react';
import { connect } from 'react-redux';

import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import CreateBuildingsFormContainer from '../containers/CreateBuildingsFormContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';

const CreateBuildingsModal = ({ siteID, isUsingBolsterLabels }) => (
    <ModalOuterContainer
        extraClasses={`${isUsingBolsterLabels ? 'w-label-example' : ''}`}
    >
        <BlockHeading title={'Create Multiple Buildings'} />
        <CreateBuildingsFormContainer
            siteID={siteID}
            isUsingBolsterLabels={isUsingBolsterLabels}
        />
    </ModalOuterContainer>
);

const mapStateToProps = ({ companyAdmin: { companySettingsReducer } }) => ({
    // !alter when it's been determined that company is using bolster labels
    isUsingBolsterLabels: companySettingsReducer.isUsingBolsterLabels
});

export default connect(mapStateToProps)(CreateBuildingsModal);
