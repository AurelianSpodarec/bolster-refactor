import React from 'react';
import { Link } from 'react-router-dom';

import inspect from '_content/images/frontend/how-icons/inpect.png';
import document from '_content/images/frontend/how-icons/document.png';
import locate from '_content/images/frontend/how-icons/locate.png';
import manage from '_content/images/frontend/how-icons/manage.png';

import arrow from '_content/images/frontend/how-icons/arrow-outline.png';
import HeadingSecondary from 'components/frontEnd/shared/headings/presentational/HeadingSecondary';

const HowItWorks = () => (
    <div className="how-it-works">
        <div className="container">
            <HeadingSecondary>How it works</HeadingSecondary>
            <div className="item-container">
                <Link to="/How#inspect" className="item">
                    <sub className="lower-ver">1</sub>
                    <img alt="Inspect" src={inspect} />
                </Link>

                <div className="arrow">
                    <img alt="arrow" src={arrow} />
                </div>
                <Link to="/How#locate" className="item">
                    <sub className="lower-ver">2</sub>
                    <img alt="Loacte" src={locate} />
                </Link>

                <div className="arrow">
                    <img alt="arrow" src={arrow} />
                </div>

                <Link to="/How#document" className="item">
                    <sub className="lower-ver">3</sub>
                    <img alt="Document" src={document} />
                </Link>

                <div className="arrow">
                    <img alt="arrow" src={arrow} />
                </div>

                <Link to="/How#manage" className="item">
                    <sub className="lower-ver">4</sub>
                    <img alt="" src={manage} />
                </Link>
            </div>

            <div className="clear" />
        </div>
    </div>
);

export default HowItWorks;
