import React from 'react';

import HomeSliderContainer from '../containers/HomeSliderContainer';
import sliderBackground from '_content/images/frontend/gradient-slider.png';
import HeadingSection from 'components/frontEnd/shared/headings/presentational/HeadingSection';
import ContentSection from 'components/frontEnd/shared/contentSection/presentational/ContentSection';
import ListArrowRed from '_content/images/frontend/list-arrow-red.png';
import functionalityPhones from '_content/images/frontend/example-images/app-two-phones.png';
import workingWithBolster from '_content/images/frontend/example-images/four-ilustrations.jpg';
import HowItWorks from 'components/frontEnd/shared/HowItWorks/presentational/HowItWorks';

export default function Home() {
    const sliderStyle = {
        backgroundImage: `url(${sliderBackground})`
    };

    return (
        <div className="size-lg-12">
            <div className="slider-container" style={sliderStyle}>
                <div className="container">
                    <HomeSliderContainer />
                </div>
            </div>

            <HowItWorks />

            <ContentSection classes="top-sec">
                <div className="text">
                    <HeadingSection title="Features & functionality" />

                    <div className="half size-lg-6 size-md-12">
                        <p>
                            Bolster Systems allows contractors, building
                            managers, construction teams and FM departments to
                            track the functions related to fire-stopping
                            projects.
                            <br />
                            <br />
                            Consisting of the online Bolster database, and an
                            iOS App to facilitate data collection, the Bolster
                            System was designed with both contractors and
                            building managers in mind.
                        </p>
                    </div>
                    <div className="half size-lg-6 size-md-12">
                        <ul>
                            <li style={listArrowBackground}>
                                Trained surveyors to conduct assessments using
                                the iOS device.
                            </li>
                            <li style={listArrowBackground}>
                                Accessible for anyone with an internet
                                connection.
                            </li>
                            <li style={listArrowBackground}>
                                Re-inspection schedules can be tailored to your
                                specific requirements.
                            </li>
                            <li style={listArrowBackground}>
                                User-generated surveys.
                            </li>
                            <li style={listArrowBackground}>
                                Cloud-based database, allows users to download
                                data.
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="image">
                    <img alt="Phone app examples" src={functionalityPhones} />
                </div>
            </ContentSection>
            <ContentSection>
                <div className="text">
                    <HeadingSection title="Working with Bolster" />

                    <p>
                        The Bolster System is designed to manage the process of
                        documenting all fire barrier penetrations and passive
                        fire protection within a building.
                        <br />
                        <br />
                        Bolster Systems offers the only fully integrated fire
                        stopping app that records the whole survey and fire
                        stopping installation process, even down to printing
                        labels with a specially coded mobile printer.
                        <br /> <br />
                        Bolster Systems maps the location of all walls and
                        floors, schedules each fire-stopped area (along with a
                        picture of the installation), records when it was
                        installed, what materials were used and its reference
                        number and printed label provide a permanent record of
                        fire-stopped locations for contractors carrying out
                        renovation work.
                        <br />
                        <br />
                        The system not only provides evidence of fire-stop
                        compliance when a building is completed, it also
                        provides building owners with a system they can use to
                        maintain and manage an inventory of the impact of
                        maintenance works on post-occupancy fire-barrier
                        integrity.
                        <br />
                        <br />
                        Drop pins have their own unique reference with a
                        photographic record (before and after). Clients have
                        real time access to survey works and remedial works,
                        giving all parties peace of mind that budgets are being
                        utilised correctly.
                    </p>
                </div>

                <div className="image four-icons">
                    <img
                        alt="Working with bolster ilustrations"
                        src={workingWithBolster}
                    />
                </div>
            </ContentSection>
        </div>
    );
}

const listArrowBackground = {
    backgroundImage: `url(${ListArrowRed})`
};
