import React from 'react';
import { connect } from 'react-redux';

import { useWindowDimensions } from 'helpers/hooks';
import { useBannerScroll } from 'helpers/frontEndHooks';

import InspectVideo from '_content/videos/frontend/08_Inspect_Locate_Document.mp4';

import setIsBannerScrolling from 'actions/frontEnd/banners/sync/setIsBannerScrolling';

import AboutUsInfoContainer from '../container/AboutUsInfoContainer';
import FrontEndBanner from 'components/frontEnd/shared/banners/presentational/FrontEndBanner';
import Accreditations from 'components/frontEnd/accreditations/presentational/Accreditations';
import BackToTopContainer from 'components/frontEnd/shared/backToTop/containers/BackToTopContainer';
import Helmet from 'components/frontEnd/shared/meta/presentational/Helmet';

const AboutPage = ({ setIsBannerScrolling }) => {
    const { width } = useWindowDimensions();
    useBannerScroll(width, setIsBannerScrolling);

    return (
        <>
            <Helmet title="About Us" />
            <div id="about">
                <FrontEndBanner heading="About us" video={InspectVideo} />
                <AboutUsInfoContainer />
                <Accreditations />
            </div>
            <BackToTopContainer />
        </>
    );
};

const mapDispatchToProps = {
    setIsBannerScrolling,
};

export default connect(null, mapDispatchToProps)(AboutPage);
