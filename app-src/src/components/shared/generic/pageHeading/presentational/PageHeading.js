import React from 'react';
import BackButtonContainer from '../../backButton/containers/BackButtonContainer';
import BackButtonWithURL from '../../backButton/presentational/BackButtonWithURL';

const PageHeading = ({
    children,
    title,
    leftChildren = false,
    withBackButton = false,
    backURL = ''
}) => (
    <div
        className={`page-heading ${
            leftChildren ? 'left-controls' : ''
        } size-lg-12`}
    >
        <div className="content-container size-lg-12">
            {withBackButton &&
                (backURL.length <= 0 ? (
                    <div className="back-button">
                        <BackButtonContainer />
                    </div>
                ) : (
                    <div className="back-button">
                        <BackButtonWithURL backURL={backURL} />
                    </div>
                ))}
            {leftChildren && children}
            <h1 className="heading heading-1">{title}</h1>
            {!leftChildren && children}
        </div>
    </div>
);

export default PageHeading;
