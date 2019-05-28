import React from 'react';

import HomeSliderContainer from '../containers/HomeSliderContainer';
import sliderBackground from '_content/images/frontend/gradient-slider.png';
import HowItWorks from '../presentational/HowItWorks';
import HeadingSection from 'components/frontEnd/shared/headings/presentational/HeadingSection';
import ContentSection from 'components/frontEnd/shared/contentSection/presentational/ContentSection';
import ListArrowRed from '_content/images/frontend/list-arrow-red.png';

export default function Home() {
    const sliderStyle = {
        backgroundImage: `url(${sliderBackground})`
    };

    return (
        <>
            <div className="slider-container" style={sliderStyle}>
                <div className="container">
                    <HomeSliderContainer />
                </div>
            </div>
            <HowItWorks />
            <ContentSection>
                <div className="container">
                    <div className="text">
                        <HeadingSection title="Features & functionality" />

                        <div className="half size-lg-6 size-md-12">
                            <p>
                                Bolster Systems allows contractors, building
                                managers, construction teams and FM departments
                                to track the functions related to fire-stopping
                                projects.
                            </p>
                            <p>
                                Consisting of the online Bolster database, and
                                an iOS App to facilitate data collection, the
                                Bolster System was designed with both
                                contractors and building managers in mind.
                            </p>
                        </div>
                        <div className="half size-lg-6 size-md-12">
                            <ul>
                                <li style={listArrowBackground}>
                                    Trained surveyors to conduct assessments
                                    using the iOS device.
                                </li>
                                <li style={listArrowBackground}>
                                    Accessible for anyone with an internet
                                    connection.
                                </li>
                                <li style={listArrowBackground}>
                                    Re-inspection schedules can be tailored to
                                    your specific requirements.
                                </li>
                                <li style={listArrowBackground}>
                                    User-generated surveys.
                                </li>
                                <li style={listArrowBackground}>
                                    Cloud-based database, allows users to
                                    download data.
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </ContentSection>
        </>
    );
}

const listArrowBackground = {
    backgroundImage: `url(${ListArrowRed})`
};
