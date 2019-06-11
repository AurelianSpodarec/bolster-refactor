import React from 'react';

import FrontEndPageHeading from 'components/frontEnd/shared/headings/presentational/FrontEndPageHeading';
import RequestDemoFormContainer from '../containers/RequestDemoFormContainer';

import bannerBackground from '_content/images/frontend/banners/request-demo.png';
// import ListArrowRed from '_content/images/frontend/list-arrow-red.png';
import appShots from '_content/images/frontend/example-images/app-two-phones-3.png';
import HeadingSection from 'components/frontEnd/shared/headings/presentational/HeadingSection';

const RequestPage = () => (
    <div className="size-lg-12" id="request-page">
        <FrontEndPageHeading
            title="Request demo"
            subTitle="If you would like to find out more about Bolster Systems, our new application and how it can help your business, please get in touch."
            backgroundImage={bannerBackground}
        />
        <div className="request-container">
            <div className="container">
                <RequestDemoFormContainer />
                <div className="try-area">
                    <HeadingSection title="Try Bolster for yourself" />
                    <p>
                        The best way to experience bolster is to try it for
                        yourself. We have a demo available for you to roadtest.
                        See how it can benefit your business workflow today
                    </p>
                    <img
                        alt="Phone app screenshots"
                        style={{ left: 10 }}
                        src={appShots}
                    />
                </div>
            </div>
        </div>
    </div>
);

// const listArrowBackground = {
//     backgroundImage: `url(${ListArrowRed})`
// };

export default RequestPage;
