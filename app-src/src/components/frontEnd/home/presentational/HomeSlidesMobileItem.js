/* eslint-disable react/display-name */
import React from 'react';
import FrontEndButton from 'components/frontEnd/shared/buttons/presentational/FrontEndButton';

const HomeSlidesMobileItem = ({ background, className, item }) => {
    return (
        <section className={`slide ${className} last-slide`}>
            <div className="slide-container">
                <video className="video-bg" autoPlay muted loop>
                    <source src={background} type="video/mp4" />
                    Your browser does not support HTML5 video.
                </video>
                <div className="slide-content">
                    <h1 className="slide-title">{item.title}</h1>
                    <p className="slide-description">{item.description}</p>
                    <FrontEndButton to={item.link}>{item.buttonText}</FrontEndButton>
                </div>
                <div className="icon">
                    <i className="fas fa-chevron-down"></i>
                </div>
            </div>
        </section>
    );
};
export default HomeSlidesMobileItem;
