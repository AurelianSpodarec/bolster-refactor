import React from 'react';
import { connect } from 'react-redux';

import HomeIcon from '_content/images/frontend/buttons/home-icon.png';
import FrontEndMenuItemContainer from '../containers/FrontEndMenuItemContainer';

const FrontEndMenu = ({ hideHeader }) =>
    hideHeader ? null : (
        <div className="frontend-menu">
            <div className="container">
                <ul>
                    <FrontEndMenuItemContainer link="/" classes="home">
                        <img alt="Home Icon" src={HomeIcon} />
                    </FrontEndMenuItemContainer>

                    <FrontEndMenuItemContainer link="/How">How it works</FrontEndMenuItemContainer>

                    <FrontEndMenuItemContainer link="/About">About</FrontEndMenuItemContainer>

                    <FrontEndMenuItemContainer link="/Request">
                        Request demo
                    </FrontEndMenuItemContainer>

                    <FrontEndMenuItemContainer link="/Contact">Contact</FrontEndMenuItemContainer>
                </ul>
            </div>
        </div>
    );
const mapStateToProps = ({
    frontEnd: {
        layoutReducer: {
            layout: { hideHeader }
        }
    }
}) => ({ hideHeader });
export default connect(mapStateToProps)(FrontEndMenu);
