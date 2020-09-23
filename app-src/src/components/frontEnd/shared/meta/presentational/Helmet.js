import React from 'react';
import { Helmet as HelmetComponent } from 'react-helmet';

const Helmet = ({ title = '' }) => (
    <HelmetComponent>
        <title>{`${title} | Bolster Systems`}</title>
    </HelmetComponent>
);

export default Helmet;
