import React from 'react';

import Slider from 'react-slick';
import FrontEndButton from 'components/frontEnd/shared/buttons/presentational/FrontEndButton';

import MacFloorPlan from '_content/images/frontend/mac-floorplan.png';
import desktopIphoneHand from '_content/images/frontend/home-iphone-hand.png';

import appSlide1 from '_content/images/frontend/app-slider/login-sl1-large.png';
import appSlide2 from '_content/images/frontend/app-slider/menu-sl2-large.png';
import appSlide3 from '_content/images/frontend/app-slider/floorplan-sl3-large.png';
import appSlide4 from '_content/images/frontend/app-slider/pinlist-large.jpg';

import slideOneMobileVer from '_content/images/frontend/app-slider/slide-one-mobile-large.png';

import blackTick from '_content/images/frontend//black-tick.png';
import redTick from '_content/images/frontend/red-tick.png';

const HomeSlider = ({ sliderSettings }) => (
    <Slider {...sliderSettings}>
        <div className="slide-1 ">
            <div className="left">
                <h3>
                    The innovative new inspection system{' '}
                    <span>
                        changing the face of the building surveying industry
                    </span>
                </h3>
                <p>
                    Reducing time and cost of surveying and installation of fire
                    safety systems
                </p>
                <FrontEndButton classes="red " to="/request">
                    Request demo
                </FrontEndButton>
            </div>
            <div className="right">
                <div className="app-slider js-app-slider">
                    <div className="holder">
                        <img
                            className="slide1"
                            alt="Phone slide 1"
                            src={appSlide1}
                        />
                        <img
                            className="slide2"
                            alt="Phone slide 2"
                            src={appSlide2}
                        />
                        <img
                            className="slide3"
                            alt="Phone slide 3"
                            src={appSlide3}
                        />
                        <img
                            className="slide4"
                            alt="Phone slide 4"
                            src={appSlide4}
                        />
                    </div>
                </div>
                <img
                    alt="Iphone with app examples"
                    src={desktopIphoneHand}
                    className="desktop-ver"
                />
                <img
                    src={slideOneMobileVer}
                    alt="Iphone app example"
                    className="mobile-ver"
                />
            </div>
        </div>
        <div className="slide-2">
            <div className="left">
                <h3>
                    <span>
                        The complete building inspection & surveying system:
                    </span>
                </h3>
                <ul>
                    <li style={listTickStyle}>
                        <h3>Inspect</h3>
                    </li>
                    <li style={listTickStyle}>
                        <h3>Locate, capture, tag</h3>
                    </li>
                    <li style={listTickStyle}>
                        <h3>Document</h3>
                    </li>
                    <li style={listTickStyle}>
                        <h3>Manage</h3>
                    </li>
                    <li style={listRedTickStyle}>
                        <h3>
                            <span>Job done</span>
                        </h3>
                    </li>
                </ul>
            </div>
            <div className="right">
                <img
                    alt="Mac floor plan"
                    src={MacFloorPlan}
                    className="desktop-ver"
                />
            </div>
        </div>
        <div className="slide-3">
            <div className="left">
                <h3>
                    <span>
                        The complete building inspection & surveying system:
                    </span>
                </h3>
                <ul>
                    <li style={listTickStyle}>
                        <h3>Inspect</h3>
                    </li>
                    <li style={listTickStyle}>
                        <h3>Locate, capture, tag</h3>
                    </li>
                    <li style={listTickStyle}>
                        <h3>Document</h3>
                    </li>
                    <li style={listTickStyle}>
                        <h3>Manage</h3>
                    </li>
                    <li style={listRedTickStyle}>
                        <h3>
                            <span>Job done</span>
                        </h3>
                    </li>
                </ul>
            </div>
            <div className="right">
                <iframe
                    title="Bolster Promotional Video"
                    src="https://player.vimeo.com/video/342716227"
                    width="560"
                    height="400"
                    frameBorder="0"
                    allow="autoplay; fullscreen"
                    allowFullScreen
                />
            </div>
        </div>
        <div className="slide-3">
            <div className="left">
                <h3>
                    <span>
                        The complete building inspection & surveying system:
                    </span>
                </h3>
                <ul>
                    <li style={listTickStyle}>
                        <h3>Inspect</h3>
                    </li>
                    <li style={listTickStyle}>
                        <h3>Locate, capture, tag</h3>
                    </li>
                    <li style={listTickStyle}>
                        <h3>Document</h3>
                    </li>
                    <li style={listTickStyle}>
                        <h3>Manage</h3>
                    </li>
                    <li style={listRedTickStyle}>
                        <h3>
                            <span>Job done</span>
                        </h3>
                    </li>
                </ul>
            </div>
            <div className="right">
                <iframe
                    width="560"
                    height="400"
                    src="https://www.youtube.com/embed/p1mH03uKa08?rel=0"
                    frameBorder="0"
                    allowFullScreen
                    title="Bolster Systems Video"
                />
            </div>
        </div>
    </Slider>
);
const listTickStyle = {
    backgroundImage: `url(${blackTick})`
};
const listRedTickStyle = {
    backgroundImage: `url(${redTick})`
};
export default HomeSlider;
