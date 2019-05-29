import React from 'react';

import HeadingSection from 'components/frontEnd/shared/headings/presentational/HeadingSection';
import ContentSection from 'components/frontEnd/shared/contentSection/presentational/ContentSection';
import HowItWorks from 'components/frontEnd/shared/HowItWorks/presentational/HowItWorks';
import FrontEndPageHeading from 'components/frontEnd/shared/headings/presentational/FrontEndPageHeading';
import HowItWorksBanner from '_content/images/frontend/banners/how-it-works-bg.png';

import ListArrowRed from '_content/images/frontend/list-arrow-red.png';
import inspectPhones from '_content/images/frontend/example-images/two-phones-gold.png';
import locateScreens from '_content/images/frontend/example-images/app-shots.jpg';
import macFloorPlan from '_content/images/frontend/example-images/mac-floorplan.png';
import loginScreens from '_content/images/frontend/example-images/login-upload-large.jpg';

const HowPage = () => (
    <div className="size-lg-12" id="how-it-works">
        <FrontEndPageHeading
            title="Inspect, Locate, Tag, Upload. It's that easy."
            subTitle="Reducing time and cost of surveying and installation of fire safety systems."
            backgroundImage={HowItWorksBanner}
        />

        <HowItWorks />

        <ContentSection>
            <div className="text">
                <HeadingSection title="Inspect" />
                <p>
                    Bolster Systems offer an electronic management application
                    designed to integrate the installation, documenting and
                    management of fire barrier penetrations and fire-stopping
                    within a building. Clients can view the progress of works in
                    real time from any device capable of connecting to the
                    internet.
                    <br />
                    <br />
                    Bolster Systems not only provides evidence of fire-stop
                    compliance when a building is completed, it also provides
                    building owners with a system they can use to maintain an
                    inventory of the impact of maintenance works on
                    post-occupancy fire-barrier integrity.
                </p>
            </div>
            <div className="image">
                <img alt="Phone app examples" src={inspectPhones} />
            </div>
        </ContentSection>
        <ContentSection classes="inverted">
            <div className="text">
                <HeadingSection title="Locate, capture & tag" />

                <p>
                    There is currently no standard for the surveying of passive
                    fire protection, Bolster Systems provides the standard and
                    uniformity of reporting, allowing multiple surveyors and
                    installers to work on the same system. Progress can be
                    monitored by back office staff and clients.
                    <br />
                    <br />
                    Surveying times are greatly reduced and reports available
                    instantly, with survey photographs uploaded and scheduled
                    along with a location drawing in a matter of minutes.
                    <br /> <br />
                    The detailed reports can be used for tendering remedial
                    works by the building managers, whilst maintaining a robust
                    record of the completed works in compliance with the
                    Regulatory Reform (Fire Safety) Order 2005.
                    <br />
                    <br />
                    Layout drawings are easily uploaded and drop pins used to
                    identify the location of works required and completed
                    remedial works. The drop pin has its own unique reference
                    with a photographic historical record (before and after).
                    Clients have real time access to survey works and remedial
                    works, giving all parties peace of mind that budgets are
                    being utilised correctly.
                </p>
            </div>

            <div className="image four-icons">
                <img alt="Locate and capture app shots" src={locateScreens} />
            </div>
        </ContentSection>
        <ContentSection classes="inverted" id="locate">
            <div className="text">
                <HeadingSection title="Locate, capture & tag" />

                <p>
                    There is currently no standard for the surveying of passive
                    fire protection, Bolster Systems provides the standard and
                    uniformity of reporting, allowing multiple surveyors and
                    installers to work on the same system. Progress can be
                    monitored by back office staff and clients.
                    <br />
                    <br />
                    Surveying times are greatly reduced and reports available
                    instantly, with survey photographs uploaded and scheduled
                    along with a location drawing in a matter of minutes.
                    <br /> <br />
                    The detailed reports can be used for tendering remedial
                    works by the building managers, whilst maintaining a robust
                    record of the completed works in compliance with the
                    Regulatory Reform (Fire Safety) Order 2005.
                    <br />
                    <br />
                    Layout drawings are easily uploaded and drop pins used to
                    identify the location of works required and completed
                    remedial works. The drop pin has its own unique reference
                    with a photographic historical record (before and after).
                    Clients have real time access to survey works and remedial
                    works, giving all parties peace of mind that budgets are
                    being utilised correctly.
                </p>
            </div>

            <div className="image">
                <img alt="Locate and capture app shots" src={locateScreens} />
            </div>
        </ContentSection>

        <ContentSection classes="no-border">
            <div className="text">
                <HeadingSection title="Document & Survey" />

                <p>
                    Pictures taken using the iPhone’s built-in camera document
                    the process and are attached to the cloud database.
                    Accessible from any location with an internet connection via
                    log in to our secure dedicated servers, allowing access to
                    your fire-stopping related data in an easily viewable and
                    updatable format that is simple to navigate.
                    <br />
                    <br />
                    Bolster allows trained surveyors to conduct assessments and
                    record data for future correction using the iOS device.
                    Installation data for penetration and joint fire-stop
                    systems is easily logged to meet project documentation
                    requirements or satisfy quality management system procedures
                    and building control. Location labels are printed using
                    specially coded mobile Bluetooth printers.
                </p>
            </div>
            <div className="image mac-screen">
                <img
                    alt="Document and survey example on a Mac"
                    src={macFloorPlan}
                />
            </div>
        </ContentSection>
        <ContentSection classes="inverted">
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
            <div className="image">
                <img alt="Phone app examples" src={loginScreens} />
            </div>
        </ContentSection>
    </div>
);

const listArrowBackground = {
    backgroundImage: `url(${ListArrowRed})`
};

export default HowPage;
