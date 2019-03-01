import React, { Component } from 'react';

import withShowLayout from 'components/app/hocs/withShowLayout';
import Menu from '../presentational/Menu';

class MenuContianer extends Component {
    render() {
        if (!this.props.showLoggedInLayout) return null;

        return <Menu openSubMenu={this.openSubMenu} />;
    }

    openSubMenu = e => {
        e.target.classList.toggle('open');
    };
}

export default withShowLayout(MenuContianer);
