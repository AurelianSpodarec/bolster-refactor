import React from 'react';
import { connect } from 'react-redux';

import AddDrawingsFormContainer from '../containers/AddDrawingsFormContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';

const AddDrawingsModal = ({ floorID, isUsingBolsterLabels }) => (
    <ModalOuterContainer
        extraClasses={`${isUsingBolsterLabels ? 'w-label-example' : ''}`}
    >
        <BlockHeading title={'Create Drawings'} />

        <AddDrawingsFormContainer
            floorID={floorID}
            isUsingBolsterLabels={isUsingBolsterLabels}
        />
    </ModalOuterContainer>
);

const mapStateToProps = ({
    companyAdmin: {
        companySettingsReducer: {
            companySettings: { isUsingBolsterLabels }
        }
    }
}) => ({
    isUsingBolsterLabels
});

export default connect(mapStateToProps)(AddDrawingsModal);
