import React from 'react';

import { useWindowDimensions } from 'helpers/hooks';
import { useBannerScroll } from 'helpers/frontEndHooks';

import InspectVideo from '_content/videos/frontend/08_Inspect_Locate_Document.mp4';

import AboutUsInfoContainer from '../container/AboutUsInfoContainer';
import FrontEndBanner from 'components/frontEnd/shared/banners/presentational/FrontEndBanner';
import Accreditations from 'components/frontEnd/accreditations/presentational/Accreditations';
import BackToTopContainer from 'components/frontEnd/shared/backToTop/containers/BackToTopContainer';
import Helmet from 'components/frontEnd/shared/meta/presentational/Helmet';

const AboutPage = () => {
    const { width } = useWindowDimensions();
    useBannerScroll(width);

    return (
        <>
            <Helmet title="About Us" />
            <div id="about">
                <FrontEndBanner
                    heading="About us"
                    description="Neque porro quisquam est qui dolorem ipsum quia dolor sit amet?"
                    video={InspectVideo}
                />
                <AboutUsInfoContainer />
                <Accreditations />
            </div>
            <BackToTopContainer />
        </>
    );
};

export default AboutPage;
