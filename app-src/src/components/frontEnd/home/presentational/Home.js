import React from 'react';

import HomeSlidesCarouselContainer from '../containers/HomeSlidesCarouselContainer';
import Helmet from 'components/frontEnd/shared/meta/presentational/Helmet';

const Home = () => (
    <>
        <Helmet title="Home" />
        <div className="frontend-home-wrapper">
            <HomeSlidesCarouselContainer />
        </div>
    </>
);

export default Home;
