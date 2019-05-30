import React, { useEffect } from 'react';

const TwitterFeed = () => {
    // Browsers with content blocking will crash when trying to access window.twttr.widgets
    // as they have blocked window.twttr, added this conditional check to prevent a crash
    // will also allow for loading the tweets again without refresh if the twttr window prop becomes available
    useEffect(() => {
        if (window.twttr) window.twttr.widgets.load();
    }, [window.twttr]);

    return (
        <div className="twitter size-lg-12">
            <a
                className="twitter-timeline"
                data-height="421"
                href="https://twitter.com/bolstersystems?ref_src=twsrc%5Etfw"
            >
                Tweets by bolstersystems
            </a>
        </div>
    );
};

export default TwitterFeed;
