import React from 'react';
import BackButtonContainer from '../../backButton/containers/BackButtonContainer';

const PageHeading = ({
    children,
    title,
    leftChildren = false,
    withBackButton = false
}) => (
    <div
        className={`page-heading ${
            leftChildren ? 'left-controls' : ''
        } size-lg-12`}
    >
        <div className="content-container size-lg-12">
            {withBackButton && (
                <div className="back-button">
                    <BackButtonContainer />
                </div>
            )}
            {leftChildren && children}
            <h1 className="heading heading-1">{title}</h1>
            {!leftChildren && children}
        </div>
    </div>
);

export default PageHeading;
