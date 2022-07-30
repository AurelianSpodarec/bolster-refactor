import React, { Component } from 'react';

import Tooltip from '../presentational/Tooltip';

class TooltipContainer extends Component {
    state = {
        show: false,
    };
    render() {
        const { show } = this.state;
        const {
            side,
            containerSide,
            children,
            shouldOutput = true,
            extraContainerClasses,
        } = this.props;
        if (!shouldOutput) {
            return children;
        }
        return (
            <Tooltip
                {...this.props}
                show={show}
                side={side}
                handleMouseOver={this.handleMouseOver}
                handleMouseOut={this.handleMouseOut}
                containerSide={containerSide}
                extraContainerClasses={extraContainerClasses}
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
