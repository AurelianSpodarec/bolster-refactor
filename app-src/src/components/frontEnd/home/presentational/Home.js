import React from 'react';
import HomeSlidesContainer from '../containers/HomeSlidesContainer';
import TrustedBy from 'components/frontEnd/trustedBy/presentational/TrustedBy';

const Home = () => (
    <div className="home-container">
        <HomeSlidesContainer />
        <TrustedBy />
        <TrustedBy />
    </div>
);

export default Home;
