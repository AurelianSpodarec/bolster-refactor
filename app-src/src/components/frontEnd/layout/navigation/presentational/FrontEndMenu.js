import React from 'react';

import HomeIcon from '_content/images/frontend/buttons/home-icon.png';
import FrontEndMenuItemContainer from '../containers/FrontEndMenuItemContainer';

const FrontEndMenu = () => (
    <div className="frontend-menu">
        <div className="container">
            <ul>
                <FrontEndMenuItemContainer link="/" classes="home">
                    <img alt="Home Icon" src={HomeIcon} />
                </FrontEndMenuItemContainer>

                <FrontEndMenuItemContainer link="/How">
                    How it works
                </FrontEndMenuItemContainer>

                <FrontEndMenuItemContainer link="/About">
                    About
                </FrontEndMenuItemContainer>

                <FrontEndMenuItemContainer link="/Request">
                    Request demo
                </FrontEndMenuItemContainer>

                <FrontEndMenuItemContainer link="/Contact">
                    Contact
                </FrontEndMenuItemContainer>
            </ul>
        </div>
    </div>
);

export default FrontEndMenu;
