import React from 'react';

import { ReactComponent as BolsterPlusLogo } from '../../../../_content/images/logos/bolster-plus-logo.svg';

import FlexWrapper from 'components/shared/generic/flexWrapper/FlexWrapper';

const BolsterPlusHeading = ({ bolsterPlusActivated, extraClasses = '' }) => (
    <FlexWrapper extraClasses={`bolster-plus-heading ${extraClasses}`} align="center">
        <BolsterPlusLogo className="logo" title="Bolster Plus logo" />
        <h3 className="title">Bolster Plus</h3>
        {bolsterPlusActivated && (
            <div className="status-icon check">
                <i className="fa fa-check fa-fw"></i>
            </div>
        )}
    </FlexWrapper>
);

export default BolsterPlusHeading;
