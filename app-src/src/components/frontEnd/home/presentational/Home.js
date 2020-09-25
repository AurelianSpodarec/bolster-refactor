import React from 'react';

import HomeSlidesCarouselContainer from '../containers/HomeSlidesCarouselContainer';
import { useIsMobile } from 'helpers/hooks';
import Helmet from 'components/frontEnd/shared/meta/presentational/Helmet';

const Home = () => {
    const isMobile = useIsMobile(1023);
    return (
        <>
            <Helmet title="Home" />
            <div
                className={`${isMobile ? 'frontend-home-mobile-wrapper' : 'frontend-home-wrapper'}`}
            >
                <HomeSlidesCarouselContainer isMobile={isMobile} />
            </div>
        </>
    );
};

export default Home;
