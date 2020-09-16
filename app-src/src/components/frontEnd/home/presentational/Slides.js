import React, { useEffect } from 'react';
import useIsInViewport from 'use-is-in-viewport';

const Slides = ({ background, children, last, unlock, lock }) => {
    const [isInViewport, targetRef] = useIsInViewport({ threshold: 100 });

    useEffect(() => {
        if (isInViewport) unlock();
        else lock();
    }, [isInViewport]);

    if (last)
        return (
            <div
                ref={targetRef}
                style={{ backgroundImage: `url(${background})` }}
                className={`home-slides ${last ? 'last' : 'not-last'}`}
            >
                <div className="overlay" />
                {children}
            </div>
        );

    return (
        <div
            style={{ backgroundImage: `url(${background})` }}
            className={`home-slides ${last ? 'last' : 'not-last'}`}
        >
            <div className="overlay" />
            {children}
        </div>
    );
};

export default Slides;
