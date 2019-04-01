import React, { Component } from 'react';

import Tooltip from '../presentational/Tooltip';

class TooltipContainer extends Component {
    state = {
        show: false
    };
    render() {
        const { show } = this.state;
        return (
            <Tooltip
                {...this.props}
                show={show}
                handleMouseOver={this.handleMouseOver}
                handleMouseOut={this.handleMouseOut}
            />
        );
    }

    handleMouseOver = () => {
        this.setState({ show: true });
    };

    handleMouseOut = () => {
        this.setState({ show: false });
    };
}

export default TooltipContainer;
