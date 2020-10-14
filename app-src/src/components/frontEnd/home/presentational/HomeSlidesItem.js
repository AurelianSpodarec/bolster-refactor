/* eslint-disable react/display-name */
import React, { useEffect, useState, forwardRef } from 'react';
import HomeCarouselControls from './HomeCarouselControls';
import FrontEndFooterContainer from 'components/frontEnd/layout/footer/containers/FrontEndFooterContainer';
import TrustedByContainer from 'components/frontEnd/trustedBy/containers/TrustedByContainer';
import BackToTopContainer from 'components/frontEnd/shared/backToTop/containers/BackToTopContainer';
import FrontEndButton from 'components/frontEnd/shared/buttons/presentational/FrontEndButton';
import { useVideoShouldPlay } from 'helpers/frontEndHooks';
import PlayButton from '_content/images/frontend-new/banners/play-button.png';
import { usePrevious } from 'helpers/hooks';

const HomeSlidesItem = forwardRef(
    (
        {
            background,
            fullVideo,
            className,
            isLast,
            active,
            handleClick,
            item,
            isMobile,
            loop,
            index,
        },
        ref,
    ) => {
        const [initVideoFinished, setInitVideoFinished] = useState(false);
        const [playingFullVideo, setPlayingFullVideo] = useState(false);
        const [fullVideoMuted, setFullVideoMuted] = useState(true);
        const [videoRef, isSlideIntersecting] = useVideoShouldPlay();

        const prevProps = usePrevious({ isSlideIntersecting });

        useEffect(() => {
            if (prevProps.isSlideIntersecting !== isSlideIntersecting && !isSlideIntersecting) {
                if (initVideoFinished) setInitVideoFinished(false);
                if (playingFullVideo) setPlayingFullVideo(false);
            }
        }, [isSlideIntersecting, prevProps.isSlideIntersecting]);

        if (!isLast) {
            return (
                <section className={`slide ${className}`}>
                    <div className="slide-container">
                        <video
                            ref={videoRef}
                            id={`video-${index}`}
                            className={`video-bg ${index}`}
                            muted
                            loop={loop}
                            onEnded={() => setInitVideoFinished(true)}
                        >
                            <source src={background} type="video/mp4" />
                        </video>
                        {fullVideo && (
                            <div className="full-video-container">
                                {playingFullVideo && (
                                    <>
                                        <video
                                            autoPlay
                                            className={`video-bg ${index}`}
                                            muted={fullVideoMuted}
                                            onEnded={() => setPlayingFullVideo(false)}
                                        >
                                            <source src={fullVideo} type="video/mp4" />
                                        </video>

                                        <i className={`mute-button fa fa-fw ${fullVideoMuted ? 'fa-volume-slash' : 'fa-volume-up'}`} onClick={() => setFullVideoMuted(!fullVideoMuted)} />
                                    </>
                                )}

                                {initVideoFinished && !playingFullVideo && (
                                    <img
                                        className="play-button"
                                        alt="Play full video"
                                        src={PlayButton}
                                        onClick={() => setPlayingFullVideo(true)}
                                    />
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
        }

        return (
            <section ref={ref} className={`slide ${className} last-slide`}>
                <div className="slide-container">
                    <video
                        ref={videoRef}
                        id={`video-${index}`}
                        className={`video-bg ${index}`}
                        muted
                        loop={loop}
                        onEnded={() => setInitVideoFinished(true)}
                    >
                        <source src={background} type="video/mp4" />
                    </video>
                    {fullVideo && (
                        <div className="full-video-container">
                            {playingFullVideo && (
                                <>
                                    <video
                                        autoPlay
                                        className={`video-bg ${index}`}
                                        muted={fullVideoMuted}
                                        onEnded={() => setPlayingFullVideo(false)}
                                    >
                                        <source src={fullVideo} type="video/mp4" />
                                    </video>

                                    <i className={`mute-button fa fa-fw ${fullVideoMuted ? 'fa-volume-slash' : 'fa-volume-up'}`} onClick={() => setFullVideoMuted(!fullVideoMuted)} />
                                </>
                            )}

                            {initVideoFinished && !playingFullVideo && (
                                <img
                                    className="play-button"
                                    alt="Play full video"
                                    src={PlayButton}
                                    onClick={() => setPlayingFullVideo(true)}
                                />
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
                <HomeCarouselControls
                    isMobile={isMobile}
                    active={active}
                    last
                    handleClick={handleClick}
                />
                <TrustedByContainer />
                <BackToTopContainer handleClick={handleClick ? () => handleClick(0) : null} />
                <FrontEndFooterContainer />
            </section>
        );
    },
);

export default HomeSlidesItem;
