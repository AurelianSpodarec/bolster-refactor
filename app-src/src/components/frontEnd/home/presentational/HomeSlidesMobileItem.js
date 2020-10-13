/* eslint-disable react/display-name */
import React from 'react';

import PlayButton from '_content/images/frontend-new/banners/play-button.png';

import FrontEndButton from 'components/frontEnd/shared/buttons/presentational/FrontEndButton';

const HomeSlidesMobileItem = ({ background, fullVideo, className, item }) => {
    return (
        <section className={`slide ${className} last-slide`}>
            <div className="slide-container">
                <video className="video-bg" autoPlay muted loop playsInline>
                    <source src={background} type="video/mp4" />
                </video>

                {fullVideo && (
                    <div className="full-video-container">
                        <a href={fullVideo} target="_blank" rel='noopener noreferrer'>
                            <img
                                className="play-button"
                                alt="Play full video"
                                src={PlayButton}
                            />
                        </a>
                    </div>
                )}

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
