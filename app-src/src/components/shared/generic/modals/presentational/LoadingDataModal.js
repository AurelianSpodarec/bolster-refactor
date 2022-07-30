import React from 'react';

import ActionButton from '../../button/presentational/ActionButton';
import ButtonWrapper from '../../button/presentational/ButtonWrapper';
import Loading from '../../misc/presentational/Loading';
import FlexModalOuter from './FlexModalOuter';

const LoadingDataModal = ({ message = 'Loading', hideModal }) => (
    <FlexModalOuter title="" className="loading-text size-lg-12">
        <div className="flex-content-wrapper">
            <div className="flex-content">
                <Loading message={message} />
            </div>

            <ButtonWrapper alignment="right" extraClasses="flex-modal-footer">
                <ActionButton text="Close" onClick={hideModal} />
            </ButtonWrapper>
        </div>
    </FlexModalOuter>
);

export default LoadingDataModal;
