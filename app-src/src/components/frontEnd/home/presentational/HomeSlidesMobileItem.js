/* eslint-disable react/display-name */
import React, { useRef, useState } from 'react';

import PlayButton from '_content/images/frontend-new/banners/play-button.png';

import FrontEndButton from 'components/frontEnd/shared/buttons/presentational/FrontEndButton';

const HomeSlidesMobileItem = ({ background, poster, fullVideo, className, item, loop }) => {
    const [playingFullVideo, setPlayingFullVideo] = useState(false);
    const [fullVideoMuted, setFullVideoMuted] = useState(true);
    const [fullVideoPaused, setFullVideoPaused] = useState(false);

    const fullVideoRef = useRef(null);

    return (
        <section className={`slide ${className} last-slide`}>
            <div className="slide-container">
                <video className="video-bg" autoPlay muted loop={loop} playsInline poster={poster}>
                    <source src={background} type="video/mp4" />
                </video>

                {fullVideo && (
                    <div className="full-video-container">
                        <img
                            className="play-button"
                            alt="Play full video"
                            src={PlayButton}
                            onClick={() => setPlayingFullVideo(true)}
                        />
                        {playingFullVideo && (
                            <>
                                <video
                                    ref={fullVideoRef}
                                    autoPlay
                                    className="video-bg"
                                    muted={fullVideoMuted}
                                    playsInline
                                    onEnded={() => setPlayingFullVideo(false)}
                                >
                                    <source src={fullVideo} type="video/mp4" />
                                </video>

                                <i
                                    className={`pause-button fa fa-fw ${
                                        fullVideoPaused ? 'fa-play' : 'fa-pause'
                                    }`}
                                    onClick={playPauseVideo}
                                />
                                <i
                                    className={`mute-button fa fa-fw ${
                                        fullVideoMuted ? 'fa-volume-slash' : 'fa-volume-up'
                                    }`}
                                    onClick={() => setFullVideoMuted(!fullVideoMuted)}
                                />
                            </>
                        )}
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

    function playPauseVideo() {
        if (fullVideoPaused) {
            fullVideoRef.current.play();
        } else {
            fullVideoRef.current.pause();
        }

        setFullVideoPaused(!fullVideoPaused);
    }
};
export default HomeSlidesMobileItem;
