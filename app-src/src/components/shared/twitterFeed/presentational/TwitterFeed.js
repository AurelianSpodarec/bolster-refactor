import React from 'react';

const TwitterFeed = () => (
    <div className="size-lg-12">
        <a
            className="twitter-timeline"
            data-lang="en"
            data-height="800"
            data-theme="light"
            href="https://twitter.com/bolstersystems?ref_src=twsrc%5Etfw"
        >
            Tweets by bolstersystems
        </a>
        <script
            async
            src="https://platform.twitter.com/widgets.js"
            charset="utf-8"
        />
    </div>
);

export default TwitterFeed;
