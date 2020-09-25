import React from 'react';

import PrivacyPolicy from './PrivacyPolicy';
import EULA from './EULA';
import TsAndCs from './TsAndCs';
import Helmet from 'components/frontEnd/shared/meta/presentational/Helmet';

const Terms = () => (
    <>
        <Helmet title="Terms &amp; Conditions" />
        <TsAndCs />
        <EULA />
        <PrivacyPolicy />
    </>
);

export default Terms;
