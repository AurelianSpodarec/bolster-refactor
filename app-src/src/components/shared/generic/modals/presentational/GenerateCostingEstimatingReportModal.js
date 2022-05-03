import React from 'react';
import ModalOuterContainer from '../containers/ModalOuterContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import Loading from '../../misc/presentational/Loading';

const GenerateCostingEstimatingReportModal = () => (
    <ModalOuterContainer>
        <BlockHeading title={'Generating Report'} />
        <p className="generic-text intro-text size-lg-12">Please wait...</p>
        <Loading />
    </ModalOuterContainer>
);

export default GenerateCostingEstimatingReportModal;
