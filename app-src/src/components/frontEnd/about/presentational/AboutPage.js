import React from 'react';

import { useWindowDimensions } from 'helpers/hooks';
import { useBannerScroll } from 'helpers/frontEndHooks';

import InspectVideo from '_content/videos/frontend/08_Inspect_Locate_Document.mp4';

import AboutUsInfoContainer from '../container/AboutUsInfoContainer';
import FrontEndBanner from 'components/frontEnd/shared/banners/presentational/FrontEndBanner';
import TrustedBy from 'components/frontEnd/trustedBy/presentational/TrustedBy';

const AboutPage = () => {
    const { width } = useWindowDimensions();
    useBannerScroll(width);

    return (
        <div id="about">
            <FrontEndBanner
                heading="About us"
                description="Neque porro quisquam est qui dolorem ipsum quia dolor sit amet?"
                video={InspectVideo}
            />
            <AboutUsInfoContainer />
            <TrustedBy />
        </div>
    );
};

export default AboutPage;
