import React, { Component } from 'react';

import Tooltip from '../presentational/Tooltip';

class TooltipContainer extends Component {
    state = {
        show: false
    };
    render() {
        const { show } = this.state;
        const { side } = this.props;
        return (
            <Tooltip
                {...this.props}
                show={show}
                side={side}
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
