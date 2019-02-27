import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import Navbar from '../presentational/Navbar';

class SideNavContainer extends Component {
    state = {
        navItems: [
            {
                text: 'Account',
                link: '/account'
            },
            {
                text: 'Components',
                link: '/components'
            },
            {
                text: 'Javascript',
                link: '/javascript'
            }
        ]
    };

    render() {
        return <Navbar navItems={this._getNavItems()} />;
    }

    _getNavItems = () => {
        const url = this.props.location.pathname.toLowerCase();
        return this.state.navItems.map(item => ({
            ...item,
            isActive: item.link.toLowerCase() === url
        }));
    };
}

export default withRouter(SideNavContainer);
