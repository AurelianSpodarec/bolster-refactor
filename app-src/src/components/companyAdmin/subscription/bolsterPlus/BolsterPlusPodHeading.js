import React from 'react';

import { ReactComponent as BolsterPlusLogo } from '../../../../_content/images/logos/bolser-plus-logo.svg';

import FlexWrapper from 'components/shared/generic/flexWrapper/FlexWrapper';

const BolsterPlusPodHeading = ({ bolsterPlusActivated }) => (
    <FlexWrapper extraClasses="bolster-plus-heading" align="center">
        <BolsterPlusLogo className="logo" title="Bolster Plus logo" />
        <h3 className="title">Bolster Plus</h3>
        {bolsterPlusActivated && (
            <div className="status-icon check">
                <i className="fa fa-check fa-fw"></i>
            </div>
        )}
    </FlexWrapper>
);

export default BolsterPlusPodHeading;
