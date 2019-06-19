import React from 'react';
import { connect } from 'react-redux';

import AddDrawingsFormContainer from '../containers/AddDrawingsFormContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';

const AddDrawingsModal = ({ floorID, isUsingBolsterLabels }) => (
    <ModalOuterContainer
        extraClasses={`${isUsingBolsterLabels ? 'w-label-example' : ''}`}
    >
        <BlockHeading title={'Create Drawing(s)'} />

        <AddDrawingsFormContainer
            floorID={floorID}
            isUsingBolsterLabels={isUsingBolsterLabels}
        />
    </ModalOuterContainer>
);

const mapStateToProps = ({ companyAdmin: { companySettingsReducer } }) => ({
    // !alter when it's been determined that company is using bolster labels
    isUsingBolsterLabels: companySettingsReducer.isUsingBolsterLabels
});

export default connect(mapStateToProps)(AddDrawingsModal);
