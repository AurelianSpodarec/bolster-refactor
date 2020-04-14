import React from 'react';

import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import BackButtonContainer from 'components/shared/generic/backButton/containers/BackButtonContainer';
import PrivacyPolicy from './PrivacyPolicy';
import EULA from './EULA';
import TsAndCs from './TsAndCs';

const Terms = () => (
    <>
        <PageHeading leftChildren={true} title="Terms & Conditions">
            <BackButtonContainer />
        </PageHeading>
        <TsAndCs />
        <EULA />
        <PrivacyPolicy />
    </>
);

export default Terms;
