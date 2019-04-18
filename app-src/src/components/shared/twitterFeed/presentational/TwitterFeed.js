import React, { Component } from 'react';

class TwitterFeed extends Component {
    render() {
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
    }

    componentDidMount = () => {
        window.twttr.widgets.load();
    };
}

export default TwitterFeed;
