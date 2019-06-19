import React from 'react';
import { connect } from 'react-redux';

import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import CreateFloorsFormContainer from '../containers/CreateFloorsFormContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';

const CreateFloorsModal = ({ buildingID, isUsingBolsterLabels }) => (
    <ModalOuterContainer
        extraClasses={`${isUsingBolsterLabels ? 'w-label-example' : ''}`}
    >
        <BlockHeading title="Create Floors" />
        <CreateFloorsFormContainer
            buildingID={buildingID}
            isUsingBolsterLabels={isUsingBolsterLabels}
        />
    </ModalOuterContainer>
);

const mapStateToProps = ({ companyAdmin: { companySettingsReducer } }) => ({
    // !alter when it's been determined that company is using bolster labels
    isUsingBolsterLabels: companySettingsReducer.isUsingBolsterLabels
});

export default connect(mapStateToProps)(CreateFloorsModal);
