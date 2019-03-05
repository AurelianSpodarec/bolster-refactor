import React, { Component } from 'react';

import withShowLayout from 'components/layout/misc/hocs/withShowLayout';
import Menu from '../presentational/Menu';

class MenuContianer extends Component {
    render() {
        if (!this.props.showLoggedInLayout) return null;

        return <Menu openSubMenu={this.openSubMenu} />;
    }
}

export default withShowLayout(MenuContianer);
