import React, { Component } from 'react'; // eslint-disable-line

import SitesListItem from '../presentational/SiltesListItem';

class SitesListItemContainer extends Component {
    state = {
        isOpen: false
    };
    render() {
        return (
            <SitesListItem
                {...this.state}
                {...this.props}
                toggleExpand={this.toggleExpand}
            />
        );
    }

    toggleExpand = () => {
        this.setState({
            ...this.state,
            isOpen: !this.state.isOpen
        });
    };
}

export default SitesListItemContainer;
