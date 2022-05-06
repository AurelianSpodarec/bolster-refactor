import React from 'react';

import BackButtonContainer from '../../backButton/containers/BackButtonContainer';
import FlexWrapper from '../../flexWrapper/FlexWrapper';

const FlexHeading = ({ children, title, withBackButton = false }) => (
    <div className="page-heading flex-heading size-lg-12">
        <FlexWrapper justify="between" align="center" extraClasses="content-container size-lg-12">
            {withBackButton && <BackButtonContainer />}

            <h1 className="heading heading-1 flex">{title}</h1>

            {children}
        </FlexWrapper>
    </div>
);

export default FlexHeading;
