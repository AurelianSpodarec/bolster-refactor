import React from 'react';
import {connect} from 'react-redux';

import { useBannerScroll } from 'helpers/frontEndHooks';
import { useWindowDimensions } from 'helpers/hooks';

import InspectVideo from '_content/videos/frontend/08_Inspect_Locate_Document.mp4';

import setIsBannerScrolling from 'actions/frontEnd/banners/sync/setIsBannerScrolling';

import HowItWorksSections from './HowItWorksSections';
import FrontEndBanner from 'components/frontEnd/shared/banners/presentational/FrontEndBanner';
import BackToTopContainer from 'components/frontEnd/shared/backToTop/containers/BackToTopContainer';
import Helmet from 'components/frontEnd/shared/meta/presentational/Helmet';

const HowItWorks = ({ setIsBannerScrolling }) => {
    const { width } = useWindowDimensions();
    useBannerScroll(width, setIsBannerScrolling);

    return (
        <>
            <Helmet title="How It Works" />
            <div id="how-it-works">
                <FrontEndBanner
                    heading="How it works"
                    description="Neque porro quisquam est qui dolorem ipsum quia dolor sit amet?"
                    video={InspectVideo}
                />
                <HowItWorksSections />
            </div>
            <BackToTopContainer />
        </>
    );
};

const mapDispatchToProps = {
    setIsBannerScrolling,
};

export default connect(null, mapDispatchToProps)(HowItWorks);
