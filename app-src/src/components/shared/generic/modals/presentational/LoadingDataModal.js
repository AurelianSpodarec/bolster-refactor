import React from 'react';

import ModalOuterContainer from '../containers/ModalOuterContainer';
import Loading from '../../misc/presentational/Loading';

const LoadingDataModal = ({ message = 'Loading' }) => (
    <ModalOuterContainer className="loading-text size-lg-12">
        <Loading message={message} />
    </ModalOuterContainer>
);

export default LoadingDataModal;
