import React from 'react';

import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import BackButtonContainer from 'components/shared/generic/backButton/containers/BackButtonContainer';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import pdf from '_content/pdf/CompleteUserGuide-June2020.pdf';
import pdfImage from '_content/images/user-guide.jpg';

const UserGuidesPresentational = ({ userGuideLink }) => (
    <>
        <PageHeading leftChildren={true} title="User Guides">
            <BackButtonContainer />
        </PageHeading>
        <BlockContainer containerClass="user-guides">
            <div className="text-section size-lg-6 size-md-12">
                <BlockHeading
                    classes="heading heading-2 underline-full half-margin"
                    title="Bolster Video User Guides"
                />
                <p className="generic-text">
                    Click <a href="https://vimeo.com/bolstersystems">here</a>, to visit our Vimeo
                    channel where you will find all our video user guides.
                </p>
                <p>
                    Each video provides a visual guide to the system's functionality and will
                    instruct you how to use our mobile app and website.
                    <br />
                    <br />
                </p>
                <p>
                    If you require any further help, please feel free to contact our customer
                    service by:
                    <br />
                    <br />
                </p>
                <p>
                    Email: <a href="mailto:info@bolstersystems.com">info@bolstersystems.com</a>
                    <br />
                    <br />
                </p>
                <p>
                    Tel: <a href="tel:0161 873 7679">0161 873 7679</a>
                    <br />
                    <br />
                </p>
                <p>Or click the "Support" button in the left navigation and send us a message.</p>
            </div>
            <div className=" size-lg-6 size-md-12">
                <iframe
                    src="https://player.vimeo.com/video/220653194"
                    height="360"
                    frameBorder="0"
                    allow="autoplay; fullscreen"
                    allowFullScreen
                    className="size-lg-12"
                ></iframe>
            </div>
        </BlockContainer>
        <BlockContainer containerClass="user-guides">
            <div className="size-lg-6 size-md-12">
                <img className="size-lg-12" src={pdfImage} />
            </div>
            <div className="text-section size-lg-6 size-md-12">
                <BlockHeading
                    classes="heading heading-2 underline-full half-margin"
                    title="Bolster User Guide Document"
                ></BlockHeading>
                <p className="generic-text">
                    Alternatively, download and read our "Complete User Guide" document{' '}
                    <a target="_blank" href={userGuideLink}>
                        here
                    </a>
                    .
                    <br />
                    <br /> This outlines the system's functionality in easy to follow step-by-step
                    processes.
                    <br />
                    <br />
                </p>
                <p className="generic-text intro-text">
                    The password for this guide is <strong>BSUserGuidev1</strong>.
                </p>
            </div>
        </BlockContainer>
    </>
);

export default UserGuidesPresentational;
