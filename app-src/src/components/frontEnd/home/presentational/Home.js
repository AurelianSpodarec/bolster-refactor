import React from 'react';

import { pageMeta } from 'constants/frontEnd/meta';

import HomeSlidesCarouselContainer from '../containers/HomeSlidesCarouselContainer';
import { useIsMobile } from 'helpers/hooks';
import PageMeta from 'components/frontEnd/shared/meta/presentational/PageMeta';

const Home = () => {
    const isMobile = useIsMobile(1101);
    return (
        <>
            <PageMeta meta={pageMeta.home} />
            <div
                className={`${isMobile ? 'frontend-home-mobile-wrapper' : 'frontend-home-wrapper'}`}
            >
                <HomeSlidesCarouselContainer isMobile={isMobile} />
            </div>
        </>
    );
};

export default Home;
