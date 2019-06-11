import React from 'react';

import ContentSection from 'components/frontEnd/shared/contentSection/presentational/ContentSection';

import ListArrowRed from '_content/images/frontend/list-arrow-red.png';
import deviceCollage from '_content/images/frontend/example-images/device-collage.png';
import HeadingSecondary from 'components/frontEnd/shared/headings/presentational/HeadingSecondary';

const AboutPage = () => (
    <div className="size-lg-12" id="about">
        <ContentSection classes="top-sec">
            <HeadingSecondary title="About us" />
            <div className="text">
                <p>
                    Bolster Systems mission is to create simple applications
                    that allow trade professionals to be more productive by
                    automating common everyday tasks. Driving all information to
                    an online database.
                    <br />
                    <br />
                    Bolster Systems allows contractors, building managers,
                    construction teams and FM departments to track the functions
                    related to fire-stopping projects. Consisting of the online
                    Bolster database, and an app to facilitate data collection,
                    the Bolster System was designed with both contractors and
                    building managers in mind.
                    <br />
                    <br />
                    As part of a controlled regular passive fire-stopping
                    management program, Bolster surveyors can re-inspect any
                    previously surveyed property to update the information held
                    on the servers. Re-inspection schedules can be tailored to
                    your specific requirements ensuring on-going compliance.
                    Re-inspection data can be updated on the system within
                    seconds of the data being sent from supported devices on
                    site or by online submission to the secure system. The
                    cloud-based Bolster database allows users to log in and
                    download data to create user-generated surveys.
                </p>
            </div>
            <div className="image ">
                <img
                    alt="Phone, Mac examples of Bolster Systems"
                    src={deviceCollage}
                />
            </div>
        </ContentSection>

        <ContentSection classes="full-list">
            <div className="text">
                <ul>
                    <li style={listArrowBackground}>
                        Bolster provides a method to simplify fire-stopping
                        documentation.
                    </li>
                    <li style={listArrowBackground}>
                        Streamlined data entry using an iPhone, collates all
                        data under one easy to access system.
                    </li>
                    <li style={listArrowBackground}>
                        Location labels to identify areas where fire-stop
                        systems that are, or will be installed.
                    </li>
                </ul>
                <ul>
                    <li style={listArrowBackground}>
                        Enhances productivity while eliminating burdensome paper
                        surveying.
                    </li>
                    <li style={listArrowBackground}>
                        Real time surveying of works undertaken.
                    </li>
                    <li style={listArrowBackground}>
                        Clear understanding of on-site conditions requiring
                        remediation.
                    </li>
                    <li style={listArrowBackground}>
                        Cloud-based data storage.
                    </li>
                </ul>
            </div>
        </ContentSection>
    </div>
);

const listArrowBackground = {
    backgroundImage: `url(${ListArrowRed})`
};

export default AboutPage;
