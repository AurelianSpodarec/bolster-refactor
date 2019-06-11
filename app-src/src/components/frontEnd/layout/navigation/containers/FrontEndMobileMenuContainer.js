import React, { Component } from 'react';
import FrontEndMobileMenu from '../presentational/FrontEndMobileMenu';

class FrontEndMobileMenuContainer extends Component {
    state = {
        menuOpen: false
    };

    render() {
        return (
            <FrontEndMobileMenu
                {...this.state}
                handleClick={this._handelClick}
            />
        );
    }

    _handelClick = e => {
        e.preventDefault();
        const { menuOpen } = this.state;

        this.setState({
            menuOpen: !menuOpen
        });
    };
}

export default FrontEndMobileMenuContainer;
